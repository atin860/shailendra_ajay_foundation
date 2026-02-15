import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import DonationForm from '../components/DonationForm';
import UpiQrCard from '../components/UpiQrCard';
import './DonatePage.css'; // Keeping for any global styles if needed, but overriding most with Tailwind

const DonatePage = () => {
    const formRef = useRef(null);
    const qrRef = useRef(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToQr = () => {
        qrRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pb-24 lg:pb-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-4"
                    >
                        <Heart className="w-8 h-8 text-yellow-500 fill-current" />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                        Donate & Support
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Your contribution helps educate children and change lives.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column (Desktop) / Second (Mobile) - Donation Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-7 order-2 lg:order-1"
                        ref={formRef}
                    >
                        <DonationForm onScrollToQr={scrollToQr} />
                    </motion.div>

                    {/* Right Column (Desktop) / First (Mobile) - UPI QR Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-5 order-1 lg:order-2 space-y-6"
                        ref={qrRef}
                    >
                        <div className="sticky top-24">
                            <UpiQrCard />
                            
                            {/* Additional Info - Visible on all screens now */}
                            <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                    <span className="bg-green-100 text-green-700 p-1 rounded">🛡️</span> 
                                    Tax Benefits
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    All donations are eligible for 50% tax exemption under section 80G of the Income Tax Act. You will receive your tax exemption certificate within 7 days.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile Sticky Button - Scrolls to Form */}
                <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
                    <button 
                        onClick={scrollToForm}
                        className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-2xl flex items-center justify-center gap-2 transform active:scale-95 transition-transform"
                    >
                        <span>Donate Now</span>
                        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonatePage;
