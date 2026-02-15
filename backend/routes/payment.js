// Production-Ready Payment Routes - Razorpay Integration
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance with environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * POST /api/payment/create-order
 * Creates a Razorpay order for donation
 * Body: { amount: number (in rupees), donorDetails: object }
 */
router.post('/create-order', async (req, res) => {
    try {
        const { amount, donorDetails } = req.body;

        // Validation
        if (!amount || amount < 1) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount. Amount must be at least ₹1.'
            });
        }

        // Validate donor details
        if (!donorDetails || !donorDetails.name || !donorDetails.email || !donorDetails.phone) {
            return res.status(400).json({
                success: false,
                message: 'Donor details are required (name, email, phone).'
            });
        }

        // Create order options
        const options = {
            amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
            currency: 'INR',
            receipt: `receipt_${Date.now()}_${donorDetails.phone}`,
            payment_capture: 1, // Auto capture payment
            notes: {
                donor_name: donorDetails.name,
                donor_email: donorDetails.email,
                donor_phone: donorDetails.phone,
                donation_type: donorDetails.donationType || 'onetime',
                is_dedicated: donorDetails.isDedicated || false,
                dedication_message: donorDetails.dedicationMessage || ''
            }
        };

        // Create order using Razorpay SDK
        const order = await razorpay.orders.create(options);

        // Production: Only log order ID, not full details
        if (process.env.NODE_ENV === 'development') {
            console.log('✅ Order created:', order.id, 'Amount:', amount);
        }

        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID // Send public key to frontend
        });

    } catch (error) {
        // Production: Don't expose internal errors
        console.error('❌ Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create order. Please try again.',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
});

/**
 * POST /api/payment/verify
 * Verifies Razorpay payment signature
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, donorDetails }
 */
router.post('/verify', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            donorDetails
        } = req.body;

        // Validation
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing required payment parameters'
            });
        }

        // Create signature verification string
        const sign = razorpay_order_id + '|' + razorpay_payment_id;

        // Generate expected signature using HMAC SHA256
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');

        // Compare signatures (constant-time comparison for security)
        const isAuthentic = crypto.timingSafeEqual(
            Buffer.from(expectedSign),
            Buffer.from(razorpay_signature)
        );

        if (isAuthentic) {
            // Payment verified successfully
            console.log('✅ Payment verified:', razorpay_payment_id);

            // TODO: Save payment details to database
            // Example:
            // await saveDonationToDatabase({
            //     order_id: razorpay_order_id,
            //     payment_id: razorpay_payment_id,
            //     donor_name: donorDetails.name,
            //     donor_email: donorDetails.email,
            //     donor_phone: donorDetails.phone,
            //     amount: donorDetails.amount,
            //     donation_type: donorDetails.donationType,
            //     status: 'success',
            //     created_at: new Date()
            // });

            // TODO: Send confirmation email to donor
            // await sendDonationReceipt(donorDetails.email, {
            //     payment_id: razorpay_payment_id,
            //     amount: donorDetails.amount,
            //     name: donorDetails.name
            // });

            res.json({
                success: true,
                message: 'Payment verified successfully',
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id
            });
        } else {
            // Invalid signature - potential fraud
            console.error('❌ Invalid signature for payment:', razorpay_payment_id);

            res.status(400).json({
                success: false,
                message: 'Payment verification failed. Invalid signature.'
            });
        }

    } catch (error) {
        console.error('❌ Payment verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Payment verification failed. Please contact support.',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
});

/**
 * GET /api/payment/status/:payment_id
 * Fetch payment details from Razorpay (for admin/verification)
 */
router.get('/status/:payment_id', async (req, res) => {
    try {
        const { payment_id } = req.params;

        const payment = await razorpay.payments.fetch(payment_id);

        res.json({
            success: true,
            payment: {
                id: payment.id,
                amount: payment.amount / 100, // Convert paise to rupees
                currency: payment.currency,
                status: payment.status,
                method: payment.method,
                email: payment.email,
                contact: payment.contact,
                created_at: payment.created_at
            }
        });

    } catch (error) {
        console.error('❌ Payment status fetch error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payment status',
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
});

/**
 * POST /api/payment/webhook
 * Razorpay webhook endpoint for payment status updates
 * IMPORTANT: Verify webhook signature before processing
 */
router.post('/webhook', async (req, res) => {
    try {
        const webhookSignature = req.headers['x-razorpay-signature'];
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error('❌ Webhook secret not configured');
            return res.status(500).json({ success: false });
        }

        // Verify webhook signature
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(req.body))
            .digest('hex');

        const isAuthentic = crypto.timingSafeEqual(
            Buffer.from(expectedSignature),
            Buffer.from(webhookSignature)
        );

        if (!isAuthentic) {
            console.error('❌ Invalid webhook signature');
            return res.status(400).json({ success: false });
        }

        // Process webhook event
        const event = req.body.event;
        const payload = req.body.payload.payment.entity;

        console.log('📥 Webhook received:', event);

        switch (event) {
            case 'payment.captured':
                // Payment successful
                console.log('✅ Payment captured:', payload.id);
                // TODO: Update database status
                break;

            case 'payment.failed':
                // Payment failed
                console.log('❌ Payment failed:', payload.id);
                // TODO: Update database status
                break;

            default:
                console.log('ℹ️ Unhandled event:', event);
        }

        res.json({ success: true });

    } catch (error) {
        console.error('❌ Webhook processing error:', error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
