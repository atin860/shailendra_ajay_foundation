// Razorpay Utility Functions - Production Ready
// Handles all Razorpay payment operations

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

/**
 * Load Razorpay checkout script dynamically
 * @returns {Promise<boolean>} Success status
 */
export const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        // Check if script already loaded
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;

        script.onload = () => {
            console.log('✅ Razorpay script loaded');
            resolve(true);
        };

        script.onerror = () => {
            console.error('❌ Failed to load Razorpay script');
            resolve(false);
        };

        document.body.appendChild(script);
    });
};

/**
 * Create Razorpay order via backend
 * @param {number} amount - Amount in rupees
 * @param {object} donorDetails - Donor information
 * @returns {Promise<object>} Order details
 */
export const createRazorpayOrder = async (amount, donorDetails) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                donorDetails
            }),
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Failed to create order');
        }

        return data;
    } catch (error) {
        console.error('❌ Order creation error:', error);
        throw error;
    }
};

/**
 * Verify payment signature via backend
 * @param {object} paymentData - Payment response from Razorpay
 * @param {object} donorDetails - Donor information
 * @returns {Promise<object>} Verification result
 */
export const verifyPayment = async (paymentData, donorDetails) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/payment/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...paymentData,
                donorDetails
            }),
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Payment verification failed');
        }

        return data;
    } catch (error) {
        console.error('❌ Payment verification error:', error);
        throw error;
    }
};

/**
 * Process complete payment flow
 * @param {object} options - Payment options
 * @param {number} options.amount - Amount in rupees
 * @param {object} options.donorDetails - Donor information
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onFailure - Failure callback
 */
export const processRazorpayPayment = async (options) => {
    const {
        amount,
        donorDetails,
        onSuccess,
        onFailure
    } = options;

    try {
        // Step 1: Validate inputs
        if (!amount || amount < 1) {
            throw new Error('Invalid amount');
        }

        if (!donorDetails || !donorDetails.name || !donorDetails.email || !donorDetails.phone) {
            throw new Error('Please fill all required fields');
        }

        if (!RAZORPAY_KEY_ID) {
            throw new Error('Razorpay configuration missing. Please contact support.');
        }

        // Step 2: Load Razorpay script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            throw new Error('Failed to load payment gateway. Please check your internet connection.');
        }

        // Step 3: Create order via backend
        const orderData = await createRazorpayOrder(amount, donorDetails);

        // Step 4: Configure Razorpay options
        const razorpayOptions = {
            key: RAZORPAY_KEY_ID,
            amount: orderData.amount,
            currency: orderData.currency,
            name: 'SHAILENDRA KUMAR AJAY FOUNDATION',
            description: `${donorDetails.donationType === 'monthly' ? 'Monthly' : 'One-time'} Donation`,
            image: '/logo.png', // Your logo URL
            order_id: orderData.order_id,
            prefill: {
                name: donorDetails.name,
                email: donorDetails.email,
                contact: donorDetails.phone
            },
            notes: {
                donation_type: donorDetails.donationType || 'onetime',
                is_dedicated: donorDetails.isDedicated || false,
                dedication_message: donorDetails.dedicationMessage || ''
            },
            theme: {
                color: '#4a7c2c' // Your brand color
            },
            handler: async function (response) {
                try {
                    // Step 5: Verify payment signature
                    const verificationResult = await verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    }, {
                        ...donorDetails,
                        amount
                    });

                    console.log('✅ Payment successful:', verificationResult);

                    if (onSuccess) {
                        onSuccess(verificationResult);
                    }
                } catch (err) {
                    console.error('❌ Payment verification failed:', err);
                    if (onFailure) {
                        onFailure(err);
                    }
                }
            },
            modal: {
                ondismiss: function () {
                    console.log('Payment cancelled by user');
                    if (onFailure) {
                        onFailure(new Error('Payment cancelled'));
                    }
                }
            }
        };

        // Step 6: Open Razorpay checkout
        const razorpay = new window.Razorpay(razorpayOptions);
        razorpay.open();

    } catch (error) {
        console.error('❌ Payment process error:', error);
        if (onFailure) {
            onFailure(error);
        }
    }
};

/**
 * Fetch payment status (for admin/verification)
 * @param {string} paymentId - Razorpay payment ID
 * @returns {Promise<object>} Payment details
 */
export const getPaymentStatus = async (paymentId) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/payment/status/${paymentId}`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message || 'Failed to fetch payment status');
        }

        return data.payment;
    } catch (error) {
        console.error('❌ Payment status fetch error:', error);
        throw error;
    }
};
