// Razorpay Payment Hook
// Custom React hook for handling Razorpay payments

import { useState, useCallback } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * Custom hook for Razorpay payment integration
 * @returns {Object} Payment methods and state
 */
export const useRazorpay = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Load Razorpay checkout script dynamically
     * @returns {Promise<boolean>}
     */
    const loadRazorpayScript = useCallback(() => {
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
    }, []);

    /**
     * Create Razorpay order via backend
     * @param {number} amount - Amount in rupees
     * @param {string} currency - Currency code (default: INR)
     * @returns {Promise<Object>} Order details
     */
    const createOrder = useCallback(async (amount, currency = 'INR') => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, currency }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to create order');
            }

            return data;
        } catch (err) {
            console.error('❌ Order creation error:', err);
            throw err;
        }
    }, []);

    /**
     * Verify payment signature via backend
     * @param {Object} paymentData - Payment response from Razorpay
     * @returns {Promise<Object>} Verification result
     */
    const verifyPayment = useCallback(async (paymentData) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/payment/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Payment verification failed');
            }

            return data;
        } catch (err) {
            console.error('❌ Payment verification error:', err);
            throw err;
        }
    }, []);

    /**
     * Process payment with Razorpay
     * @param {Object} options - Payment options
     * @param {number} options.amount - Amount in rupees
     * @param {string} options.name - Business/Product name
     * @param {string} options.description - Payment description
     * @param {Function} options.onSuccess - Success callback
     * @param {Function} options.onFailure - Failure callback
     */
    const processPayment = useCallback(async (options) => {
        const {
            amount,
            name = 'Payment',
            description = 'Payment for services',
            onSuccess,
            onFailure,
            prefill = {}
        } = options;

        setLoading(true);
        setError(null);

        try {
            // Step 1: Load Razorpay script
            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded) {
                throw new Error('Failed to load Razorpay. Please check your internet connection.');
            }

            // Step 2: Create order via backend
            const orderData = await createOrder(amount);

            // Step 3: Configure Razorpay options
            const razorpayOptions = {
                key: orderData.key_id,
                amount: orderData.amount,
                currency: orderData.currency,
                name: name,
                description: description,
                order_id: orderData.order_id,
                prefill: {
                    name: prefill.name || '',
                    email: prefill.email || '',
                    contact: prefill.contact || ''
                },
                theme: {
                    color: '#4a7c2c' // Customize this color
                },
                handler: async function (response) {
                    try {
                        // Step 4: Verify payment signature
                        const verificationResult = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        console.log('✅ Payment successful:', verificationResult);

                        if (onSuccess) {
                            onSuccess(verificationResult);
                        }
                    } catch (err) {
                        console.error('❌ Payment verification failed:', err);
                        setError(err.message);
                        if (onFailure) {
                            onFailure(err);
                        }
                    } finally {
                        setLoading(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        console.log('Payment cancelled by user');
                        setLoading(false);
                        if (onFailure) {
                            onFailure(new Error('Payment cancelled'));
                        }
                    }
                }
            };

            // Step 5: Open Razorpay checkout
            const razorpay = new window.Razorpay(razorpayOptions);
            razorpay.open();

        } catch (err) {
            console.error('❌ Payment process error:', err);
            setError(err.message);
            setLoading(false);
            if (onFailure) {
                onFailure(err);
            }
        }
    }, [loadRazorpayScript, createOrder, verifyPayment]);

    return {
        processPayment,
        loading,
        error,
        setError
    };
};
