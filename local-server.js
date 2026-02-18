import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import 'dotenv/config';

// Create a new Express application
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
    origin: true, // Allow any origin
    credentials: true
}));

// Webhook requires raw body, so we need a specific middleware for it
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));

// Initialize Razorpay
const getRazorpayInstance = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay credentials missing in environment');
    }
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

// API Route: Create Order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;

        if (!amount || isNaN(amount) || amount < 1) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        const razorpay = getRazorpayInstance();

        // Convert to paisa
        const amountInPaisa = Math.round(Number(amount) * 100);
        const receiptId = `rcpt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

        const options = {
            amount: amountInPaisa,
            currency,
            receipt: receiptId,
            notes: {
                source: 'local_dev_server',
                created_at: new Date().toISOString()
            }
        };

        const order = await razorpay.orders.create(options);

        // Standard Response
        return res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID,
            message: 'Order created successfully'
        });

    } catch (error) {
        console.error('❌ Error creating order:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to create order',
        });
    }
});

// API Route: Verify Payment (New)
app.post('/api/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;

        if (!secret) return res.status(500).json({ message: 'Server config error' });

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Invalid payment data' });
        }

        // Generate signature
        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        // Timing safe comparison
        if (generatedSignature === razorpay_signature) {
            console.log(`✅ Payment Verified Locally: ${razorpay_payment_id}`);
            return res.status(200).json({
                success: true,
                message: 'Payment verified successfully',
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id
            });
        } else {
            console.warn(`❌ Signature mismatch: ${razorpay_payment_id}`);
            return res.status(400).json({ success: false, message: 'Invalid signature' });
        }

    } catch (error) {
        console.error('❌ Error verifying payment:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// API Route: Webhook (New)
app.post('/api/webhook', async (req, res) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const signature = req.headers['x-razorpay-signature'];

        if (!secret) {
            console.warn('⚠️ Webhook secret not set in .env');
            return res.status(500).json({ message: 'Server config error' });
        }

        if (!signature || !req.rawBody) {
            return res.status(400).json({ message: 'Invalid webhook request' });
        }

        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(req.rawBody)
            .digest('hex');

        if (generatedSignature !== signature) {
            return res.status(400).json({ message: 'Invalid signature' });
        }

        const event = req.body;
        console.log(`✅ Webhook Event Received: ${event.event}`);

        res.status(200).json({ status: 'ok' });

    } catch (error) {
        console.error('Webhook Error:', error);
        res.status(500).json({ message: 'Webhook processing failed' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`
🚀 Local backend server running on http://localhost:${PORT}
✅  POST http://localhost:${PORT}/api/create-order
✅  POST http://localhost:${PORT}/api/verify-payment
✅  POST http://localhost:${PORT}/api/webhook
    `);
});
