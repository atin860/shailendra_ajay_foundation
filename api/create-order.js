import Razorpay from 'razorpay';
import crypto from 'crypto';

// Reusable handler wrapper for consistent error/response
// Note: In Vercel, relative imports work fine within the repo structure
import { handleRequest } from './_utils/handler.js';

const createOrderHandler = async (req, res) => {
    // 1. Validate Environment Variables
    const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
        throw { statusCode: 500, message: 'Server configuration error: Missing Razorpay keys' };
    }

    // 2. Validate Request Body
    const { amount, currency = 'INR', receipt_notes = {} } = req.body;

    if (!amount || isNaN(amount) || amount < 1) {
        throw { statusCode: 400, message: 'Invalid amount. Minimum amount is 1 INR.' };
    }

    if (currency !== 'INR') { // Add more currencies if needed
        throw { statusCode: 400, message: 'Only INR currency is supported.' };
    }

    // 3. Initialize Razorpay
    const razorpay = new Razorpay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET,
    });

    // 4. Create Order Options
    // Convert amount to paisa (smallest currency unit)
    const amountInPaisa = Math.round(Number(amount) * 100);

    // Generate unique receipt ID ensuring no collision
    const receiptId = `rcpt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;



    const options = {
        amount: amountInPaisa,
        currency,
        receipt: receiptId,
        payment_capture: 1, // Auto capture
        notes: {
            ...receipt_notes,
            source: 'web_donation',
            created_at: new Date().toISOString()
        }
    };

    // 5. Create Order via Razorpay
    try {
        const order = await razorpay.orders.create(options);

        // Return standard response
        return res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: RAZORPAY_KEY_ID, // Frontend needs this public key
            message: 'Order created successfully'
        });

    } catch (error) {
        // Pass to wrapper error handler
        console.error('Razorpay Order Creation Failed:', error);
        throw {
            statusCode: error.statusCode || 500,
            message: error.reason || 'Failed to create order with payment gateway'
        };
    }
};

// Export wrapped handler
export default handleRequest(createOrderHandler);
