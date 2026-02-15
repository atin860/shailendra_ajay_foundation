import React, { useState } from 'react';
import { Loader, CheckCircle, XCircle } from 'lucide-react';
import { processRazorpayPayment } from '../utils/razorpay';

const DonationForm = ({ onScrollToQr }) => {
    const [donationType, setDonationType] = useState('onetime');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentDetails, setPaymentDetails] = useState(null);
    
    // Donor Details State
    const [donorDetails, setDonorDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isDedicated: false,
        dedicationMessage: ''
    });

    const presetAmounts = [500, 1000, 2000, 5000, 10000];

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCustomAmount(value);
        setSelectedAmount(null);
    };

    const getFinalAmount = () => {
        return selectedAmount || parseInt(customAmount) || 0;
    };

    const validateForm = () => {
        const amount = getFinalAmount();
        
        if (amount < 100) {
            setErrorMessage('Minimum donation amount is ₹100');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return false;
        }

        if (!donorDetails.name.trim()) {
            setErrorMessage('Please enter your name');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return false;
        }

        if (!donorDetails.email.trim() || !donorDetails.email.includes('@')) {
            setErrorMessage('Please enter a valid email address');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return false;
        }

        if (!donorDetails.phone.trim() || donorDetails.phone.length < 10) {
            setErrorMessage('Please enter a valid phone number');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return false;
        }

        return true;
    };

    const handleDonation = async () => {
        // Reset states
        setShowError(false);
        setShowSuccess(false);

        // Validate form
        if (!validateForm()) {
            return;
        }

        const amount = getFinalAmount();
        setIsProcessing(true);

        try {
            await processRazorpayPayment({
                amount,
                donorDetails: {
                    ...donorDetails,
                    donationType
                },
                onSuccess: (result) => {
                    console.log('✅ Payment successful:', result);
                    setIsProcessing(false);
                    setPaymentDetails(result);
                    setShowSuccess(true);
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        resetForm();
                    }, 5000);
                },
                onFailure: (error) => {
                    console.error('❌ Payment failed:', error);
                    setIsProcessing(false);
                    setErrorMessage(error.message || 'Payment failed. Please try again.');
                    setShowError(true);
                    setTimeout(() => setShowError(false), 5000);
                }
            });

        } catch (error) {
            console.error('❌ Payment error:', error);
            setIsProcessing(false);
            setErrorMessage(error.message || 'An error occurred. Please try again.');
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
        }
    };

    const resetForm = () => {
        setSelectedAmount(null);
        setCustomAmount('');
        setDonorDetails({
            name: '',
            email: '',
            phone: '',
            isDedicated: false,
            dedicationMessage: ''
        });
        setShowSuccess(false);
        setPaymentDetails(null);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Make a Donation</h2>

            {/* Success Modal */}
            {showSuccess && (
                <div className="absolute inset-0 bg-white rounded-2xl z-50 flex items-center justify-center p-6">
                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
                        <p className="text-gray-600 mb-4">
                            Your donation of <strong>₹{getFinalAmount()}</strong> was successful!
                        </p>
                        {paymentDetails && (
                            <p className="text-sm text-gray-500 mb-4">
                                Payment ID: {paymentDetails.payment_id}
                            </p>
                        )}
                        <p className="text-sm text-gray-600">
                            You will receive a confirmation email shortly.
                        </p>
                        <button
                            onClick={resetForm}
                            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Make Another Donation
                        </button>
                    </div>
                </div>
            )}

            {/* Error Alert */}
            {showError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-shake">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-red-800">Error</p>
                        <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                    <button
                        onClick={() => setShowError(false)}
                        className="text-red-400 hover:text-red-600"
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Donation Type Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        donationType === 'onetime' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setDonationType('onetime')}
                    disabled={isProcessing}
                >
                    One-time
                </button>
                <button
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                        donationType === 'monthly' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setDonationType('monthly')}
                    disabled={isProcessing}
                >
                    Monthly
                </button>
            </div>

            {/* Amount Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                    <button
                        key={amount}
                        className={`py-2 px-1 text-sm font-semibold border rounded-lg transition-all ${
                            selectedAmount === amount
                                ? 'border-green-600 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-green-400 text-gray-700'
                        }`}
                        onClick={() => handleAmountSelect(amount)}
                        disabled={isProcessing}
                    >
                        ₹{amount.toLocaleString()}
                    </button>
                ))}
            </div>

            {/* Custom Amount Input */}
            <div className="relative mb-6">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                <input
                    type="tel"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    disabled={isProcessing}
                    className={`w-full pl-8 pr-4 py-3 border rounded-lg outline-none transition-all font-semibold ${
                        customAmount ? 'border-green-600 bg-green-50 text-green-900' : 'border-gray-200 focus:border-green-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                />
            </div>

            {/* Helper Text for QR - Only visible on Desktop where QR is on the side */}
            <div 
                className="hidden lg:flex items-center justify-between bg-blue-50 text-blue-700 px-3 py-2 rounded-lg mb-6 text-xs font-medium cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={onScrollToQr}
            >
                <span>Prefer instant payment?</span>
                <span className="flex items-center">Scan QR code <span className="ml-1">→</span></span>
            </div>

            {/* Donor Details Form */}
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Full Name *"
                        value={donorDetails.name}
                        onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="email"
                        placeholder="Email Address *"
                        value={donorDetails.email}
                        onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={donorDetails.phone}
                        onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                        disabled={isProcessing}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Dedication Checkbox */}
                <div className="flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        id="dedicate"
                        checked={donorDetails.isDedicated}
                        onChange={(e) => setDonorDetails({ ...donorDetails, isDedicated: e.target.checked })}
                        disabled={isProcessing}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 disabled:opacity-50"
                    />
                    <label htmlFor="dedicate" className="text-sm text-gray-600 select-none cursor-pointer">Dedicate this donation</label>
                </div>

                {donorDetails.isDedicated && (
                    <textarea
                        placeholder="Message (Optional)"
                        value={donorDetails.dedicationMessage}
                        onChange={(e) => setDonorDetails({ ...donorDetails, dedicationMessage: e.target.value })}
                        disabled={isProcessing}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-green-500 text-sm h-20 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                )}
            </div>

            {/* Donate Button */}
            <button
                className={`w-full mt-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all flex justify-center items-center gap-2 ${
                    isProcessing || getFinalAmount() < 100 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 active:scale-95'
                }`}
                onClick={handleDonation}
                disabled={isProcessing || getFinalAmount() < 100}
            >
                {isProcessing ? (
                    <>
                        <Loader className="animate-spin" size={20} />
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <span>Donate Now</span>
                        {getFinalAmount() > 0 && <span>(₹{getFinalAmount().toLocaleString()})</span>}
                    </>
                )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
                🔒 Secure SSL encrypted payment via Razorpay
            </p>
        </div>
    );
};

export default DonationForm;
