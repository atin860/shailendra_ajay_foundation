import crypto from 'crypto';
import { handleRequest } from './_utils/handler.js';

const verifyPaymentHandler = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const { RAZORPAY_KEY_SECRET } = process.env;

    // 1. Validate Input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw { statusCode: 400, message: 'Invalid payment verification data' };
    }

    if (!RAZORPAY_KEY_SECRET) {
        throw { statusCode: 500, message: 'Server configuration error: Missing Secret' };
    }

    // 2. Generate Expected Signature
    // Format: order_id + "|" + payment_id
    const generatedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    // 3. Compare Signatures Securely (Timing Safe)
    const expectedBuffer = Buffer.from(generatedSignature);
    const receivedBuffer = Buffer.from(razorpay_signature);

    // Prevent timing attacks by using constant-time comparison
    // Note: Use try-catch because timingSafeEqual throws if lengths differ
    let isAuthentic = false;
    try {
        if (expectedBuffer.length === receivedBuffer.length) {
            isAuthentic = crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
        }
    } catch (e) {
        // Length mismatch or other buffer error -> effectively false
    }

    if (isAuthentic) {
        // Payment Verified
        // In a real app, you would update database status here based on order_id
        console.log(`✅ Payment Verified: ${razorpay_payment_id}`);

        return res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id
        });
    } else {
        // Invalid Signature
        console.warn(`❌ Invalid Signature for Payment: ${razorpay_payment_id}`);
        throw { statusCode: 400, message: 'Invalid payment signature' };
    }
};

export default handleRequest(verifyPaymentHandler);
