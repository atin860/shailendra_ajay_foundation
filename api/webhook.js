import crypto from 'crypto';

// Disable Vercel's default body parser to access raw body for signature verification
export const config = {
    api: {
        bodyParser: false,
    },
};

const getRawBody = async (req) => {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        // 1. Secret Validation
        if (!secret) {
            console.error('❌ Webhook secret is missing in environment variables');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        // 2. Read Raw Body
        const rawBody = await getRawBody(req);
        const signature = req.headers['x-razorpay-signature'];

        if (!signature) {
            console.warn('⚠️ Webhook request missing signature');
            return res.status(400).json({ message: 'Missing signature header' });
        }

        // 3. Verify Signature (Timing-Safe)
        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(rawBody)
            .digest('hex');

        try {
            const signatureBuffer = Buffer.from(signature);
            const generatedBuffer = Buffer.from(generatedSignature);

            if (signatureBuffer.length !== generatedBuffer.length ||
                !crypto.timingSafeEqual(signatureBuffer, generatedBuffer)) {
                console.warn('❌ Invalid Webhook Signature');
                return res.status(400).json({ message: 'Invalid signature' });
            }
        } catch (e) {
            console.warn('❌ Invalid Webhook Signature Format');
            return res.status(400).json({ message: 'Invalid signature' });
        }

        // 4. Parse Body
        const event = JSON.parse(rawBody.toString());

        // 5. Idempotency Check (Placeholder)
        // In production, verify if event.id was already processed.
        console.log(`✅ Webhook Verified: ${event.event} [${event.id}]`);

        // 6. Handle Events
        // Only return 200 OK after successful processing or queuing
        if (event.event === 'payment.captured') {
            const payment = event.payload.payment.entity;
            const orderId = payment.order_id;
            console.log(`💰 Payment Captured for Order: ${orderId}, Amount: ${payment.amount}`);
        } else if (event.event === 'payment.failed') {
            const payment = event.payload.payment.entity;
            console.log(`❌ Payment Failed: ${payment.id}`);
        }

        // 7. Acknowledge Razorpay (Strictly 200)
        return res.status(200).json({ status: 'ok' });

    } catch (error) {
        console.error('Webhook Error:', error);
        // Return 500 to trigger Razorpay retry mechanism if processing failed
        return res.status(500).json({ message: 'Webhook processing failed' });
    }
}
