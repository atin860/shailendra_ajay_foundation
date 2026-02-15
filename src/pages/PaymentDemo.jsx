// Payment Demo Page
// Example implementation of Razorpay payment integration

import React, { useState } from 'react';
import RazorpayButton from '../components/RazorpayButton';

const PaymentDemo = () => {
    const [amount, setAmount] = useState(500);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        contact: ''
    });

    const handlePaymentSuccess = (result) => {
        console.log('Payment Success:', result);
        alert(`Payment Successful!\nPayment ID: ${result.payment_id}`);
        
        // TODO: Update your database, send confirmation email, etc.
        // Example:
        // - Save payment details to your database
        // - Send receipt email to customer
        // - Update order status
        // - Redirect to success page
    };

    const handlePaymentFailure = (error) => {
        console.error('Payment Failed:', error);
        // Handle payment failure
        // - Show error message to user
        // - Log error for debugging
        // - Optionally retry payment
    };

    return (
        <div className="payment-demo-container">
            <div className="payment-demo-card">
                <h1 className="demo-title">Razorpay Payment Demo</h1>
                <p className="demo-subtitle">
                    Test the payment integration with your Razorpay account
                </p>

                <div className="demo-form">
                    {/* Amount Input */}
                    <div className="form-group">
                        <label htmlFor="amount">Amount (₹)</label>
                        <input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            min="1"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Customer Name */}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Customer Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Customer Contact */}
                    <div className="form-group">
                        <label htmlFor="contact">Contact Number</label>
                        <input
                            id="contact"
                            type="tel"
                            value={customerInfo.contact}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, contact: e.target.value })}
                            placeholder="Enter your contact number"
                        />
                    </div>

                    {/* Payment Summary */}
                    <div className="payment-summary">
                        <h3>Payment Summary</h3>
                        <div className="summary-row">
                            <span>Amount:</span>
                            <strong>₹{amount.toLocaleString()}</strong>
                        </div>
                        <div className="summary-row">
                            <span>Payment Gateway:</span>
                            <strong>Razorpay</strong>
                        </div>
                    </div>

                    {/* Razorpay Payment Button */}
                    <RazorpayButton
                        amount={amount}
                        name="Your Business Name"
                        description={`Payment of ₹${amount}`}
                        prefill={customerInfo}
                        onSuccess={handlePaymentSuccess}
                        onFailure={handlePaymentFailure}
                        buttonText={`Pay ₹${amount.toLocaleString()}`}
                    />

                    {/* Info Box */}
                    <div className="info-box">
                        <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div>
                            <strong>Test Mode</strong>
                            <p>You're using test API keys. Use test card details for payment.</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .payment-demo-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 40px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .payment-demo-card {
                    max-width: 500px;
                    width: 100%;
                    background: white;
                    border-radius: 16px;
                    padding: 40px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }

                .demo-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #1a202c;
                    margin: 0 0 8px 0;
                    text-align: center;
                }

                .demo-subtitle {
                    font-size: 14px;
                    color: #718096;
                    text-align: center;
                    margin: 0 0 32px 0;
                }

                .demo-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-group label {
                    font-size: 14px;
                    font-weight: 600;
                    color: #2d3748;
                }

                .form-group input {
                    padding: 12px 16px;
                    font-size: 16px;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    transition: all 0.2s;
                }

                .form-group input:focus {
                    outline: none;
                    border-color: #4a7c2c;
                    box-shadow: 0 0 0 3px rgba(74, 124, 44, 0.1);
                }

                .payment-summary {
                    background: #f7fafc;
                    padding: 20px;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }

                .payment-summary h3 {
                    font-size: 16px;
                    font-weight: 600;
                    color: #2d3748;
                    margin: 0 0 12px 0;
                }

                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 8px 0;
                    font-size: 14px;
                    color: #4a5568;
                }

                .summary-row strong {
                    color: #1a202c;
                    font-size: 16px;
                }

                .info-box {
                    display: flex;
                    gap: 12px;
                    padding: 16px;
                    background: #ebf8ff;
                    border: 1px solid #bee3f8;
                    border-radius: 8px;
                    font-size: 14px;
                    color: #2c5282;
                }

                .info-icon {
                    width: 24px;
                    height: 24px;
                    flex-shrink: 0;
                    color: #3182ce;
                }

                .info-box strong {
                    display: block;
                    margin-bottom: 4px;
                }

                .info-box p {
                    margin: 0;
                    font-size: 13px;
                }

                @media (max-width: 640px) {
                    .payment-demo-card {
                        padding: 24px;
                    }

                    .demo-title {
                        font-size: 24px;
                    }
                }
            `}</style>
        </div>
    );
};

export default PaymentDemo;
