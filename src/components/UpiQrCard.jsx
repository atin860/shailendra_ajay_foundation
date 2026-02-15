import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UpiQrCard = () => {
    const [copied, setCopied] = useState(false);
    const upiId = 'shailendraajayfoundation@sbi'; // Replace with actual UPI ID

    const [imageError, setImageError] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(upiId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-sm mx-auto">
            {/* Header / Brand Strip */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-center">
                <h3 className="text-white font-bold text-lg tracking-wide uppercase">Quick UPI Donation</h3>
                <p className="text-blue-100 text-xs mt-1">Scan & Pay Instantly</p>
            </div>

            <div className="p-6 flex flex-col items-center">
                {/* Full QR Image with Fallback */}
                <div className="w-full mb-6 relative group">
                    {!imageError ? (
                        <img 
                            src="/qr_code.png" 
                            alt="Donate UPI QR Code" 
                            className="w-full h-auto object-contain rounded-xl shadow-sm"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="bg-white p-3 rounded-xl border-2 border-dashed border-gray-300 shadow-inner flex flex-col items-center justify-center text-center">
                             <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}&pn=Shailendra%20Kumar%20Ajay%20Foundation&cu=INR`} 
                                alt="Donate UPI QR Code" 
                                className="w-48 h-48 object-contain transition-transform group-hover:scale-105 mb-2"
                            />
                            <p className="text-xs text-orange-600 font-medium">
                                *Custom QR image not found.<br/>Using generated QR.
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Please ensure public/qr_code.png exists</p>
                        </div>
                    )}
                </div>

                {/* UPI ID Section */}
                <div className="w-full bg-gray-50 rounded-lg p-3 flex items-center justify-between border border-gray-200">
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">UPI ID</span>
                        <span className="text-sm font-mono font-medium text-gray-800 truncate" title={upiId}>
                            {upiId}
                        </span>
                    </div>
                    <button 
                        onClick={handleCopy}
                        className="p-2 ml-2 hover:bg-white rounded-full transition-colors focus:outline-none group relative"
                        title="Copy UPI ID"
                    >
                        {copied ? (
                            <Check size={18} className="text-green-500" />
                        ) : (
                            <Copy size={18} className="text-gray-400 group-hover:text-blue-600" />
                        )}
                         <AnimatePresence>
                            {copied && (
                                <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: -30 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none"
                                >
                                    Copied!
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>
            
             {/* Trust Footer */}
            <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
                    Secure & Direct Transfer
                </p>
            </div>
        </div>
    );
};

export default UpiQrCard;
