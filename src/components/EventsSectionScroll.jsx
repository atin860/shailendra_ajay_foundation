import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, X, ArrowRight } from 'lucide-react';

const EventsSectionScroll = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        {
            title: 'Annual Book Drive',
            date: 'Feb 15, 2026',
            time: '10:00 AM',
            location: 'Delhi Community Center',
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Fundraiser'
        },
        {
            title: 'Volunteer Workshop',
            date: 'Feb 22, 2026',
            time: '2:00 PM',
            location: 'Mumbai NGO Office',
            image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Training'
        },
        {
            title: 'Kids Reading Fest',
            date: 'Mar 5, 2026',
            time: '11:00 AM',
            location: 'Bangalore City Park',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'Community'
        }
    ];

    return (
        <section id="events" className="py-20 bg-gray-50 border-t border-gray-200">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <span className="text-indigo-600 font-bold text-sm tracking-wide uppercase mb-2 block">Events</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Upcoming Activities</h2>
                        <p className="text-gray-600">Join us in our upcoming events and be a part of the change.</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                        View All Events <ArrowRight size={18} />
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-premium border border-gray-100 transition-all duration-300 group cursor-pointer"
                            whileHover={{ y: -4 }}
                            onClick={() => setSelectedEvent(event)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={event.image} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                                    {event.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
                                    <Calendar size={14} />
                                    <span>{event.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                                    {event.title}
                                </h3>
                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-gray-400" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-gray-400" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-8 text-center md:hidden">
                    <button className="btn-secondary w-full">View All Events</button>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                        >
                            <div className="relative h-40">
                                <img src={selectedEvent.image} alt="Header" className="w-full h-full object-cover" />
                                <button 
                                    onClick={() => setSelectedEvent(null)}
                                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full backdrop-blur-md transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedEvent.title}</h3>
                                <p className="text-gray-500 text-sm mb-6">Enter your details to register.</p>
                                
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Full Name</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Email</label>
                                        <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm" placeholder="john@example.com" />
                                    </div>
                                    <button className="w-full btn-primary py-3 mt-2">
                                        Confirm Registration
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default EventsSectionScroll;
