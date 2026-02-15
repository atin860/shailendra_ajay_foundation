// Vercel Serverless Function - Create Razorpay Order
// This function runs on Vercel's serverless infrastructure

import Razorpay from 'razorpay';

// CORS headers for security
const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // In production, replace with your domain
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }

    try {
        // Get environment variables
        const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
        const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

        // Validate environment variables
        if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
            console.error('❌ Razorpay credentials missing');
            return res.status(500).json({
                success: false,
                message: 'Payment gateway configuration error'
            });
        }

        // Initialize Razorpay instance
        const razorpay = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET,
        });

        // Get amount from request body
        const { amount } = req.body;

        // Validate amount
        if (!amount || amount < 1) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount'
            });
        }

        // Convert amount to paisa (Razorpay expects amount in smallest currency unit)
        const amountInPaisa = Math.round(amount * 100);

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amountInPaisa,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                created_at: new Date().toISOString(),
            }
        });

        console.log('✅ Order created successfully:', order.id);

        // Return order details
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
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
}
