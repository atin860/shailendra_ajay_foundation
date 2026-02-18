import React, { useState, useRef, useEffect } from 'react';
import { Loader, CheckCircle, Download, AlertCircle, Heart, ExternalLink } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { processRazorpayPayment } from '../utils/razorpay';

const DonationForm = ({ onScrollToQr }) => {
    // State Management
    const [donationType, setDonationType] = useState('onetime');
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    // Donor Details
    const [donorDetails, setDonorDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isDedicated: false,
        dedicationMessage: ''
    });

    const invoiceRef = useRef(null);
    const presetAmounts = [500, 1000, 2000, 5000, 10000];

    // Helpers
    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount('');
        if (validationErrors.amount) {
            setValidationErrors(prev => ({ ...prev, amount: '' }));
        }
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setCustomAmount(value);
        setSelectedAmount(null);
        if (validationErrors.amount) {
            setValidationErrors(prev => ({ ...prev, amount: '' }));
        }
    };

    const handleInputChange = (field, value) => {
        setDonorDetails(prev => ({ ...prev, [field]: value }));
        if (validationErrors[field]) {
            setValidationErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const getFinalAmount = () => {
        return selectedAmount || parseInt(customAmount) || 0;
    };

    const validateForm = () => {
        const errors = {};
        const amount = getFinalAmount();

        if (amount < 100) {
            errors.amount = 'Minimum donation allowed is ₹100';
        }

        if (!donorDetails.name.trim()) {
            errors.name = 'Full Name is required';
        }

        if (!donorDetails.email.trim()) {
            errors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorDetails.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!donorDetails.phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (donorDetails.phone.length < 10) {
            errors.phone = 'Enter a valid 10-digit number';
        }

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            setErrorMessage('Please fix the errors highlighted below.');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return false;
        }

        return true;
    };

    const handleDonation = async () => {
        setShowError(false);
        setShowSuccess(false);

        if (!validateForm()) return;

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
            setErrorMessage(error.message || 'System error. Please try again.');
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
        setValidationErrors({});
        setShowSuccess(false);
        setPaymentDetails(null);
    };

    return (
        <div className="w-full max-w-lg mx-auto md:max-w-xl bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 relative">

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 md:p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2 text-white">
                        Donation Fund <Heart className="w-6 h-6 text-red-400 fill-current animate-pulse" />
                    </h2>
                    <p className="text-green-50 text-sm md:text-base opacity-90">
                        Your contribution changes lives. Safe & Secure.
                    </p>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-yellow-400 opacity-20 rounded-full blur-2xl"></div>
            </div>

            <div className="p-6 md:p-8 space-y-6">

                {/* Donation Type Switcher */}
                <div className="bg-gray-100 p-1 rounded-xl flex shadow-inner">
                    <button
                        className={`flex-1 py-3 text-sm md:text-base font-semibold rounded-lg transition-all duration-200 ${donationType === 'onetime'
                            ? 'bg-white text-green-700 shadow-sm transform scale-[1.02]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setDonationType('onetime')}
                    >
                        One-time Give
                    </button>
                    <button
                        className={`flex-1 py-3 text-sm md:text-base font-semibold rounded-lg transition-all duration-200 ${donationType === 'monthly'
                            ? 'bg-white text-green-700 shadow-sm transform scale-[1.02]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setDonationType('monthly')}
                    >
                        Monthly Support
                    </button>
                </div>

                {/* Amount Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700 block">Select Amount</label>
                    <div className="grid grid-cols-3 gap-3">
                        {presetAmounts.map((amount) => (
                            <button
                                key={amount}
                                onClick={() => handleAmountSelect(amount)}
                                className={`py-3 px-2 text-sm md:text-base font-semibold border rounded-xl transition-all active:scale-95 ${selectedAmount === amount
                                    ? 'border-green-600 bg-green-50 text-green-700 ring-1 ring-green-600'
                                    : 'border-gray-200 text-gray-600 hover:border-green-400 hover:bg-green-50/50'
                                    }`}
                            >
                                ₹{amount.toLocaleString()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Amount */}
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">₹</span>
                    <input
                        type="tel"
                        placeholder="Enter other amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className={`w-full pl-10 pr-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all font-semibold text-lg ${validationErrors.amount
                            ? 'border-red-300 focus:border-red-500 bg-red-50'
                            : customAmount
                                ? 'border-green-500 bg-white text-green-900'
                                : 'border-transparent focus:border-green-500 focus:bg-white'
                            }`}
                    />
                    {validationErrors.amount && (
                        <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                            <AlertCircle size={12} /> {validationErrors.amount}
                        </p>
                    )}
                </div>

                {/* QR Code Shortcut (Desktop Only) */}
                {onScrollToQr && (
                    <div className="hidden lg:flex items-center justify-between bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-xs font-semibold cursor-pointer hover:bg-blue-100 transition-colors" onClick={onScrollToQr}>
                        <div className="flex items-center gap-2">
                            <div className="p-1 bg-white rounded shadow-sm"><ExternalLink size={14} /></div>
                            <span>Prefer instant payment?</span>
                        </div>
                        <span className="flex items-center gap-1">Scan QR <span className="text-lg leading-none">→</span></span>
                    </div>
                )}

                {/* Donor Details */}
                <div className="space-y-4">
                    <div className="relative">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">Your Details</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={donorDetails.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 transition-all ${validationErrors.name
                                ? 'border-red-300 focus:ring-red-200'
                                : 'border-gray-200 focus:border-green-500 focus:ring-green-100 focus:bg-white'
                                }`}
                        />
                        {validationErrors.name && <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={donorDetails.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 transition-all ${validationErrors.email
                                    ? 'border-red-300 focus:ring-red-200'
                                    : 'border-gray-200 focus:border-green-500 focus:ring-green-100 focus:bg-white'
                                    }`}
                            />
                            {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                value={donorDetails.phone}
                                maxLength={10}
                                onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                                className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl outline-none focus:ring-2 transition-all ${validationErrors.phone
                                    ? 'border-red-300 focus:ring-red-200'
                                    : 'border-gray-200 focus:border-green-500 focus:ring-green-100 focus:bg-white'
                                    }`}
                            />
                            {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
                        </div>
                    </div>
                </div>

                {/* Dedication Toggle */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={donorDetails.isDedicated}
                                onChange={(e) => setDonorDetails(p => ({ ...p, isDedicated: e.target.checked }))}
                            />
                            <div className="w-10 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Dedicate this donation</span>
                    </label>

                    {donorDetails.isDedicated && (
                        <textarea
                            placeholder="Write a message..."
                            value={donorDetails.dedicationMessage}
                            onChange={(e) => setDonorDetails(p => ({ ...p, dedicationMessage: e.target.value }))}
                            className="w-full mt-3 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-100 outline-none resize-none h-20 bg-white"
                        />
                    )}
                </div>

                {/* Error Message Toast */}
                {showError && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 animate-pulse">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-red-800">Please check details</p>
                            <p className="text-sm text-red-600">{errorMessage}</p>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleDonation}
                    disabled={isProcessing}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg shadow-green-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 ${isProcessing
                        ? 'bg-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 hover:shadow-xl'
                        }`}
                >
                    {isProcessing ? (
                        <>
                            <Loader className="animate-spin" size={20} />
                            <span>Processing Securely...</span>
                        </>
                    ) : (
                        <>
                            <span className="text-lg">Donate ₹{getFinalAmount() > 0 ? getFinalAmount().toLocaleString() : 'Now'}</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded text-xs uppercase tracking-wider">Secure</span>
                        </>
                    )}
                </button>

                {/* Footer Badges */}
                <div className="flex justify-center items-center gap-4 pt-2 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <img src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png" alt="Payment Methods" className="h-4 object-contain" />
                </div>
            </div>

            {/* Success Invoice Modal Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-50 w-full max-w-2xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                        {/* Scrollable Receipt Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8">
                            <div className="bg-white p-6 md:p-12 rounded shadow-sm border border-slate-200 relative overflow-hidden" ref={invoiceRef}>
                                {/* Watermark */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                    <img src="/logo.png" className="w-96 grayscale" alt="watermark" />
                                </div>

                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-100 pb-6 mb-6 relative z-10 gap-4">
                                    <div className="flex items-center gap-4">
                                        <img src="/logo.png" alt="Foundation Logo" className="w-16 h-16 object-contain" />
                                        <div>
                                            <h1 className="text-xs font-bold text-blue-900 uppercase leading-tight">Shailendra Kumar Ajay Foundation</h1>
                                            <p className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">Registered Non-Profit Organization</p>
                                        </div>
                                    </div>
                                    <div className="text-left md:text-right text-xs text-slate-500">
                                        <p className="font-semibold text-slate-700 mb-1">Contact Us</p>
                                        <p>shailksingh6387@gmail.com</p>
                                        <p>+91 63873 45451</p>
                                        <p>www.skafoundation.org</p>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="text-center mb-8 relative z-10">
                                    <h2 className="text-2xl font-bold text-slate-800 tracking-widest border-b-2 border-green-600 inline-block pb-1">DONATION RECEIPT</h2>
                                </div>

                                {/* Invoice Details */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm relative z-10 mb-8 p-4 bg-slate-50/50 rounded-lg">
                                    <div className="flex justify-between md:block">
                                        <p className="text-slate-400 uppercase text-xs font-bold mb-1">Receipt No</p>
                                        <p className="font-mono font-bold text-slate-700">SKF-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000).toString().padStart(5, '0')}</p>
                                    </div>
                                    <div className="flex justify-between md:block md:text-right">
                                        <p className="text-slate-400 uppercase text-xs font-bold mb-1">Date</p>
                                        <p className="font-bold text-slate-700">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>

                                    <div className="col-span-1 md:col-span-2 border-t border-slate-200/50 my-1 hidden md:block"></div>

                                    <div className="grid grid-cols-2 md:block gap-4 md:gap-0">
                                        <div className="mb-0 md:mb-4">
                                            <p className="text-slate-400 uppercase text-xs font-bold mb-1">Donor Name</p>
                                            <p className="font-bold text-slate-800 text-lg">{donorDetails.name}</p>
                                        </div>
                                        <div className="md:hidden">
                                            <p className="text-slate-400 uppercase text-xs font-bold mb-1">Donor Email</p>
                                            <p className="font-medium text-slate-600 break-all">{donorDetails.email}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:block text-right">
                                        <p className="text-slate-400 uppercase text-xs font-bold mb-1">Donor Email</p>
                                        <p className="font-medium text-slate-600">{donorDetails.email}</p>
                                    </div>

                                    <div className="grid grid-cols-2 md:block gap-4 md:gap-0">
                                        <div className="mb-0 md:mb-0">
                                            <p className="text-slate-400 uppercase text-xs font-bold mb-1">Transaction ID</p>
                                            <p className="font-mono text-slate-600 text-xs bg-white border border-slate-200 py-1 px-2 rounded inline-block">{paymentDetails?.payment_id}</p>
                                        </div>
                                        <div className="md:hidden">
                                            <p className="text-slate-400 uppercase text-xs font-bold mb-1">Payment Method</p>
                                            <p className="font-medium text-slate-600">Online / Razorpay</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:block text-right">
                                        <p className="text-slate-400 uppercase text-xs font-bold mb-1">Payment Method</p>
                                        <p className="font-medium text-slate-600">Online / Razorpay</p>
                                    </div>
                                </div>

                                {/* Amount Box */}
                                <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center mb-8 relative z-10">
                                    <p className="text-green-700 font-semibold mb-1 uppercase tracking-wider text-xs">Amount Paid</p>
                                    <p className="text-4xl font-extrabold text-green-700">₹{getFinalAmount().toLocaleString()}</p>
                                </div>

                                {/* Declaration */}
                                <div className="bg-slate-50 border border-slate-100 rounded p-4 text-center mb-8 relative z-10">
                                    <p className="text-slate-500 text-sm italic">"This receipt confirms that we have received the above donation towards our charitable initiatives."</p>
                                </div>

                                {/* Footer */}
                                <div className="flex flex-col md:flex-row justify-between items-end pt-8 border-t border-slate-200 relative z-10 gap-8">
                                    <div className="text-xs text-slate-400 w-full md:w-auto text-center md:text-left">
                                        <p className="font-bold text-slate-600 mb-1">Shailendra Kumar Ajay Foundation</p>
                                        <p>Hardoi 241404, Uttar Pradesh, India</p>
                                        <p className="mt-1">PAN: <span className="font-mono">XXXXXXXXXX</span> | 80G: <span className="font-mono">XXXXXXXX</span></p>
                                    </div>
                                    <div className="text-center w-full md:w-auto flex flex-col items-center">
                                        <div className="relative mb-2">
                                            <img src="/logo.png" className="w-16 h-16 opacity-30 grayscale" alt="stamp" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <CheckCircle className="w-6 h-6 text-green-600/50" />
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold text-slate-600 border-t border-slate-300 pt-1 px-4">Authorized Signature</p>
                                    </div>
                                </div>

                                <div className="text-center mt-8">
                                    <p className="text-green-700 font-bold text-sm bg-green-50 inline-block px-4 py-1 rounded-full">Thank you for your generous contribution!</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer (Sticky) */}
                        <div className="p-4 border-t bg-white shrink-0 flex gap-3 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <button
                                onClick={resetForm}
                                className="flex-1 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={async (e) => {
                                    if (!invoiceRef.current) return;
                                    const btn = e.currentTarget;
                                    const originalText = btn.innerText;
                                    btn.innerText = 'Generating PDF...';
                                    try {
                                        const canvas = await html2canvas(invoiceRef.current, {
                                            scale: 2,
                                            useCORS: true,
                                            allowTaint: true,
                                            backgroundColor: '#ffffff',
                                            logging: false
                                        });
                                        const imgData = canvas.toDataURL('image/png');
                                        const pdf = new jsPDF('p', 'mm', 'a4');
                                        const pdfWidth = pdf.internal.pageSize.getWidth();
                                        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                                        pdf.save(`SKAF_Receipt_${paymentDetails?.payment_id}.pdf`);
                                    } catch (err) {
                                        console.error(err);
                                        alert("Could not generate PDF. Please try again.");
                                    } finally {
                                        btn.innerText = originalText;
                                    }
                                }}
                                className="flex-1 py-3 bg-blue-900 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20"
                            >
                                <Download size={18} />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationForm;
