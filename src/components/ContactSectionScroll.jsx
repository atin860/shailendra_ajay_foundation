import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const ContactSectionScroll = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    return (
        <section id="contact" className="py-24 bg-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left: Info */}
                    <div>
                        <span className="text-indigo-600 font-bold text-sm tracking-wide uppercase mb-2 block">Get in Touch</span>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Discuss Your Impact</h2>
                        <p className="text-gray-600 text-lg mb-12 leading-relaxed">
                            Have questions about our programs or want to get involved? We'd love to hear from you.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Email Us</h4>
                                    <p className="text-gray-600 mb-1">For general inquiries and support.</p>
                                    <a href="mailto:shailksingh6387@gmail.com" className="text-indigo-600 font-semibold hover:underline">shailksingh6387@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Call Us</h4>
                                    <p className="text-gray-600 mb-1">Mon-Fri from 9am to 6pm.</p>
                                    <a href="tel:+916387345451" className="text-indigo-600 font-semibold hover:underline">+91 63873 45451</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">Visit Us</h4>
                                    <p className="text-gray-600">Hardoi 241404, Uttar Pradesh, India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <MessageSquare className="text-indigo-600" size={24} />
                            <h3 className="text-2xl font-bold text-gray-900">Send us a Message</h3>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-gray-600">
                                    <option>General Inquiry</option>
                                    <option>Volunteering</option>
                                    <option>Donation Support</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea 
                                    rows="4" 
                                    placeholder="How can we help you?" 
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            <button className="w-full btn-primary py-4 text-base shadow-lg shadow-indigo-200 rounded-xl flex justify-center items-center gap-2">
                                <Send size={18} /> Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSectionScroll;
