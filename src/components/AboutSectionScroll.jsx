import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutSectionScroll = () => {
    const navigate = useNavigate();
    
    const eventImage = React.useMemo(() => `/event_${Math.floor(Math.random() * 10) + 1}.jpeg`, []);

    return (
        <section id="about" className="py-20 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Left: Image Grid */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                            <img 
                                 src={eventImage}
                                alt="About Us" 
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Stats */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="bg-indigo-600 p-3 rounded-xl">
                                        <Award size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-white">15+ Years</p>
                                        <p className="text-sm text-indigo-200">Of Impactful Service</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Decorative Blob */}
                        <div className="absolute -z-10 top-[-20%] left-[-20%] w-[140%] h-[140%] bg-indigo-50/50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-indigo-600 font-bold text-sm tracking-wide uppercase mb-2 block">Who We Are</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            Building a Future Where <br className="hidden md:block" /> Every Child Matters.
                        </h2>
                        
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Founded in 2009, the Shailendra Kumar Ajay Foundation began with a simple mission: to ensure every child has access to quality educational resources. 
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed mb-8">
                            What started as a small book donation drive has grown into a nationwide movement, touching the lives of thousands of children across India through libraries, mentorships, and scholarships.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center shrink-0 text-indigo-600">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">Our Mission</h4>
                                    <p className="text-gray-600 text-sm">To provide quality education and resources to every child, regardless of background.</p>
                                </div>
                            </div>
                             <div className="flex gap-4">
                                <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 text-amber-600">
                                    <Eye size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">Our Vision</h4>
                                    <p className="text-gray-600 text-sm">A world where every child has the opportunity to learn, grow, and achieve their dreams.</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate('/about')}
                            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                        >
                            Read Our Full Story
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutSectionScroll;
