import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Mail, Phone, Send, Heart, Users, MessageCircle } from 'lucide-react';

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const cardsRef = useRef(null);
    const formRef = useRef(null);
    const mapRef = useRef(null);

    const areCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
    const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
    const isMapInView = useInView(mapRef, { once: true, margin: "-100px" });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);

        setTimeout(() => {
            setIsSuccess(false);
            reset();
        }, 4000);
    };

    const contactCards = [
        {
            icon: <MapPin className="w-8 h-8" />,
            title: 'Visit Us',
            content: 'Hardoi 241304, UP',
            description: 'Come see our library and meet our team',
            color: 'bg-green-100 text-green-600',
            delay: 0
        },
        {
            icon: <Phone className="w-8 h-8" />,
            title: 'Call Us',
            content: '+91 63873 45441',
            description: 'Mon - Fri, 9AM - 6PM',
            color: 'bg-blue-100 text-blue-600',
            delay: 0.1
        },
        {
            icon: <Mail className="w-8 h-8" />,
            title: 'Email Us',
            content: 'shailksingh6387@gmail.com',
            description: 'We reply within 24 hours',
            color: 'bg-amber-100 text-amber-600',
            delay: 0.2
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Volunteer',
            content: 'Join Our Team',
            description: 'Make a difference in your community',
            color: 'bg-purple-100 text-purple-600',
            delay: 0.3
        }
    ];

    const handleWhatsAppClick = () => {
        const message = encodeURIComponent("Hi! I'd like to learn more about donating books to Shailendra Kumar Ajay Foundation.");
        window.open(`https://wa.me/916387345451?text=${message}`, '_blank');
    };

    const handleEmailClick = () => {
        window.location.href = 'mailto:shailksingh6387@gmail.com?subject=Book Donation Inquiry';
    };

    return (
        <div className="w-full overflow-hidden">
            {/* Hero Section */}
            <motion.section
                className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 px-4 py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block py-1 px-3 rounded-full bg-primary-700/50 border border-primary-600 text-secondary-400 text-sm font-semibold mb-6"
                    >
                        Get in Touch
                    </motion.span>
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Let's Connect for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-500">Better Tomorrow</span>
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Together, we can spread literacy and change lives through the power of books. We'd love to hear from you.
                    </motion.p>
                </div>
            </motion.section>

            {/* Contact Cards */}
            <section className="relative z-20 -mt-16 px-4" ref={cardsRef}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactCards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            animate={areCardsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: card.delay }}
                        >
                            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${card.color}`}>
                                {card.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                            <p className="text-primary-700 font-semibold mb-1">{card.content}</p>
                            <p className="text-sm text-gray-500">{card.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Form Section */}
            <section className="py-24 px-4 bg-gray-50" ref={formRef}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">We're Here to Help</h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Whether you want to donate books, volunteer, or learn more about our mission, we're ready to answer any and all questions.
                        </p>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                                >
                                    <MessageCircle size={20} />
                                    WhatsApp Us
                                </button>
                                <button
                                    onClick={handleEmailClick}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-primary-100 text-primary-700 rounded-xl font-semibold hover:border-primary-600 hover:text-primary-600 transition-all"
                                >
                                    <Mail size={20} />
                                    Send Email
                                </button>
                            </div>
                        </div>

                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <div className="absolute inset-0 bg-primary-900/10 z-10"></div>
                            {/* Placeholder for illustration or map image if needed */}
                            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                <MapPin size={48} className="text-primary-400" />
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl z-20">
                                <p className="font-semibold text-gray-900 flex items-center gap-2">
                                    <MapPin size={16} className="text-primary-600" />
                                    Hardoi 241304, UP, India
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                        <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                        {!isSuccess ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        {...register("name", { required: "Name is required" })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                        })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        {...register("subject", { required: "Subject is required" })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="How can I help?"
                                    />
                                    {errors.subject && <span className="text-red-500 text-sm mt-1 block">{errors.subject.message}</span>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows="4"
                                        {...register("message", { required: "Message is required" })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                                        placeholder="Your message here..."
                                    ></textarea>
                                    {errors.message && <span className="text-red-500 text-sm mt-1 block">{errors.message.message}</span>}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        ) : (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Heart size={40} className="fill-current" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                                <p className="text-gray-600">We've received your message and will get back to you within 24 hours.</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
