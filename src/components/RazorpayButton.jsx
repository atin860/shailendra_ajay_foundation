// RazorpayButton Component
// Reusable button component for Razorpay payments

import React, { useState } from 'react';
import { useRazorpay } from '../hooks/useRazorpay';

/**
 * Razorpay Payment Button Component
 * @param {Object} props
 * @param {number} props.amount - Amount in rupees
 * @param {string} props.name - Business/Product name
 * @param {string} props.description - Payment description
 * @param {Object} props.prefill - Prefill customer data
 * @param {Function} props.onSuccess - Success callback
 * @param {Function} props.onFailure - Failure callback
 * @param {string} props.buttonText - Button text
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Disable button
 */
const RazorpayButton = ({
    amount,
    name = 'Payment',
    description = 'Payment for services',
    prefill = {},
    onSuccess,
    onFailure,
    buttonText = 'Pay Now',
    className = '',
    disabled = false
}) => {
    const { processPayment, loading, error, setError } = useRazorpay();
    const [showSuccess, setShowSuccess] = useState(false);

    const handlePayment = () => {
        processPayment({
            amount,
            name,
            description,
            prefill,
            onSuccess: (result) => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
                if (onSuccess) onSuccess(result);
            },
            onFailure: (err) => {
                if (onFailure) onFailure(err);
            }
        });
    };

    return (
        <div className="razorpay-button-container">
            <button
                onClick={handlePayment}
                disabled={disabled || loading}
                className={`razorpay-button ${className} ${loading ? 'loading' : ''}`}
            >
                {loading ? (
                    <span className="loading-content">
                        <svg className="spinner" viewBox="0 0 24 24">
                            <circle
                                className="spinner-circle"
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                strokeWidth="3"
                            />
                        </svg>
                        Processing...
                    </span>
                ) : (
                    <>
                        <svg
                            className="payment-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                        </svg>
                        {buttonText}
                    </>
                )}
            </button>

            {/* Error Message */}
            {error && (
                <div className="payment-error">
                    <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="error-close">×</button>
                </div>
            )}

            {/* Success Message */}
            {showSuccess && (
                <div className="payment-success">
                    <svg className="success-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Payment successful!</span>
                </div>
            )}

            <style jsx>{`
                .razorpay-button-container {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .razorpay-button {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: 600;
                    color: white;
                    background: linear-gradient(135deg, #4a7c2c 0%, #5a9c3c 100%);
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px rgba(74, 124, 44, 0.2);
                }

                .razorpay-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(74, 124, 44, 0.3);
                }

                .razorpay-button:active:not(:disabled) {
                    transform: translateY(0);
                }

                .razorpay-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .razorpay-button.loading {
                    background: linear-gradient(135deg, #6b9d4d 0%, #7bad5d 100%);
                }

                .payment-icon {
                    width: 20px;
                    height: 20px;
                }

                .loading-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .spinner {
                    width: 20px;
                    height: 20px;
                    animation: spin 1s linear infinite;
                }

                .spinner-circle {
                    stroke: white;
                    stroke-dasharray: 50;
                    stroke-dashoffset: 0;
                    animation: dash 1.5s ease-in-out infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes dash {
                    0% {
                        stroke-dashoffset: 50;
                    }
                    50% {
                        stroke-dashoffset: 12.5;
                    }
                    100% {
                        stroke-dashoffset: 50;
                    }
                }

                .payment-error,
                .payment-success {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 16px;
                    border-radius: 8px;
                    font-size: 14px;
                    animation: slideIn 0.3s ease;
                }

                .payment-error {
                    background-color: #fee;
                    color: #c33;
                    border: 1px solid #fcc;
                }

                .payment-success {
                    background-color: #efe;
                    color: #3c3;
                    border: 1px solid #cfc;
                }

                .error-icon,
                .success-icon {
                    width: 20px;
                    height: 20px;
                    flex-shrink: 0;
                }

                .error-close {
                    margin-left: auto;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                    color: inherit;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 4px;
                }

                .error-close:hover {
                    background-color: rgba(0, 0, 0, 0.1);
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default RazorpayButton;
