// Razorpay Utility Functions - Vercel Serverless Compatible
// Handles all Razorpay payment operations using Vercel API routes

// Get Razorpay Key from environment variable
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_SGJ3eStZh062Hy';

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
 * Create Razorpay order via Vercel serverless function
 * @param {number} amount - Amount in rupees
 * @returns {Promise<object>} Order details
 */
export const createRazorpayOrder = async (amount) => {
    try {
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
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

        // Step 3: Create order via Vercel serverless function
        const orderData = await createRazorpayOrder(amount);

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
                    // Payment successful
                    console.log('✅ Payment successful!');
                    console.log('Payment ID:', response.razorpay_payment_id);
                    console.log('Order ID:', response.razorpay_order_id);
                    console.log('Signature:', response.razorpay_signature);

                    // Show success alert
                    alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);

                    // Call success callback with payment details
                    if (onSuccess) {
                        onSuccess({
                            success: true,
                            payment_id: response.razorpay_payment_id,
                            order_id: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            amount: amount,
                            donorDetails: donorDetails
                        });
                    }
                } catch (err) {
                    console.error('❌ Error in payment handler:', err);
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

        // Step 5: Open Razorpay checkout
        const razorpay = new window.Razorpay(razorpayOptions);
        razorpay.open();

    } catch (error) {
        console.error('❌ Payment process error:', error);
        if (onFailure) {
            onFailure(error);
        }
    }
};

