import crypto from 'crypto';
import { handleRequest } from './_utils/handler.js';

const verifyPaymentHandler = async (req, res) => {
    // 1. Validate Secret
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
        throw { statusCode: 500, message: 'Server configuration error: Razorpay secret missing' };
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // 2. Validate Inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw { statusCode: 400, message: 'Invalid payment data provided' };
    }

    // 3. Generate Expected Signature
    // Format: order_id + "|" + payment_id
    const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    // 4. Secure Comparison
    const receivedBuffer = Buffer.from(razorpay_signature);
    const expectedBuffer = Buffer.from(generatedSignature);

    let isAuthentic = false;
    try {
        if (receivedBuffer.length === expectedBuffer.length) {
            isAuthentic = crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
        }
    } catch (e) {
        // Prevent buffer length attack
        isAuthentic = false;
    }

    // 5. Response
    if (isAuthentic) {
        console.log(`✅ Payment Verified: ${razorpay_payment_id}`);
        // In a real app: await updatePaymentStatus(razorpay_payment_id, 'verified');
        return res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            payment_id: razorpay_payment_id,
        });
    } else {
        console.warn(`❌ Invalid Signature for Payment: ${razorpay_payment_id}`);
        throw { statusCode: 400, message: 'Invalid payment signature' };
    }
};

export default handleRequest(verifyPaymentHandler);

