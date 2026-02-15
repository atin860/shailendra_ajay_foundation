import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import 'dotenv/config';

// Create a new Express application
const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Razorpay
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// API Route: Create Order
app.post('/api/create-order', async (req, res) => {
    try {
        console.log('Received order request:', req.body);

        if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
            console.error('❌ Razorpay credentials missing');
            return res.status(500).json({
                success: false,
                message: 'Payment gateway configuration error'
            });
        }

        const razorpay = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET,
        });

        const { amount } = req.body;

        if (!amount || amount < 1) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount'
            });
        }

        const amountInPaisa = Math.round(amount * 100);

        const order = await razorpay.orders.create({
            amount: amountInPaisa,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                created_at: new Date().toISOString(),
            }
        });

        console.log('✅ Order created successfully:', order.id);

        return res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
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

// Start the server
app.listen(PORT, () => {
    console.log(`
🚀 Local backend server running on http://localhost:${PORT}
✅ API endpoint: http://localhost:${PORT}/api/create-order
    `);
});
