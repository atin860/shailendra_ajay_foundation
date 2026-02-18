import crypto from 'crypto';

// CORS headers for security
const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // In production, replace with your domain
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Verify Payment API
 * Validates Razorpay signature using HMAC-SHA256 with timing-safe comparison.
 */
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
        // 1. Validate Secret
        const secret = process.env.RAZORPAY_KEY_SECRET;

        if (!secret) {
            console.error('❌ Razorpay secret missing');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // 2. Validate Inputs
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment data provided'
            });
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
            return res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }

    } catch (error) {
        console.error('❌ Error verifying payment:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Failed to verify payment',
            error: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        });
    }
}
