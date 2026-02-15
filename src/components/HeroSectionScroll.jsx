import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, BarChart, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSectionScroll = () => {
    const navigate = useNavigate();

    const [bgImage, cardImage] = React.useMemo(() => {
        const img1 = Math.floor(Math.random() * 10) + 1;
        let img2 = Math.floor(Math.random() * 10) + 1;
        while (img1 === img2) {
            img2 = Math.floor(Math.random() * 10) + 1;
        }
        return [`/event_${img1}.jpeg`, `/event_${img2}.jpeg`];
    }, []);

    return (
        <section className="relative min-h-[85vh] flex items-center bg-gray-900 text-white overflow-hidden pt-20 pb-16">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <img 
                    src={bgImage} 
                    alt="Background" 
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent"></div>
            </div>

            <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Content Column */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-7 space-y-8"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                        <span className="text-xs font-semibold text-indigo-200 tracking-wide uppercase">Non-Profit Organization</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight color-white text-white">
                        Empowering Future <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                            Through Education
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
                        Join us in our mission to provide books, resources, and hope to underprivileged children. 
                        We believe every child deserves a chance to learn and grow.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <button 
                            onClick={() => navigate('/donate')}
                            className="btn bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 border border-transparent"
                        >
                            DONATE NOW
                        </button>
                        <button 
                            onClick={() => navigate('/about')}
                            className="btn bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm"
                        >
                            <Play size={16} className="mr-2 fill-current" />
                            How We Work
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 mt-8">
                        <div>
                            <h4 className="text-3xl font-bold text-white mb-1">50k+</h4>
                            <p className="text-sm text-gray-400 font-medium">Books Donated</p>
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold text-white mb-1">10k+</h4>
                            <p className="text-sm text-gray-400 font-medium">Lives Impacted</p>
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold text-white mb-1">100%</h4>
                            <p className="text-sm text-gray-400 font-medium">Transparent</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Image/Card Column */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden lg:block lg:col-span-5 relative"
                >
                    {/* Floating Card Design */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gray-800/50 backdrop-blur-md p-2">
                        <img 
                            src={cardImage} 
                            alt="Children Learning" 
                            className="rounded-xl w-full h-auto object-cover"
                        />
                        
                        {/* Floating Badge */}
                        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-4 mt-2">
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <Heart className="fill-current w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-gray-900 font-bold text-sm">Your Impact Matters!</p>
                                <p className="text-gray-500 text-xs mt-0.5">Help us reach more children today.</p>
                            </div>
                            <button 
                                onClick={() => navigate('/donate')}
                                className="ml-auto text-indigo-600 font-bold text-sm hover:underline"
                            >
                                Donate →
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSectionScroll;
