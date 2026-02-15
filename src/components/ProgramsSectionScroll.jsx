import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgramsSectionScroll = () => {
    const navigate = useNavigate();

    const programs = [
        {
            icon: BookOpen,
            title: 'Book Donation',
            description: 'Distributing books to underserved communities across India.',
            stats: '25k+ Books',
            color: 'bg-emerald-100 text-emerald-600'
        },
        {
            icon: GraduationCap,
            title: 'Scholarships',
            description: ' providing educational materials to help children succeed.',
            stats: '5k+ Students',
            color: 'bg-blue-100 text-blue-600'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Building libraries and learning centers in rural areas.',
            stats: '50+ Libraries',
            color: 'bg-amber-100 text-amber-600'
        },
        {
            icon: Heart,
            title: 'Mentorship',
            description: 'Connecting volunteers with students for guidance.',
            stats: '1k+ Mentors',
            color: 'bg-rose-100 text-rose-600'
        }
    ];

    return (
        <section id="programs" className="py-16 md:py-24 bg-white">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-indigo-600 font-bold text-sm tracking-wide uppercase mb-2 block">What We Do</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Key Programs</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        We run multiple initiatives to ensure every child has access to quality education and learning resources.
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={index}
                            className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col items-start"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={`p-3 rounded-xl mb-6 ${program.color} transition-colors`}>
                                <program.icon size={24} className="stroke-[2.5px]" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                                {program.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                {program.description}
                            </p>

                            <div className="mt-auto w-full pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                                    {program.stats}
                                </span>
                                <button className="text-indigo-600 hover:text-indigo-700 p-1.5 rounded-full hover:bg-indigo-50 transition-colors">
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => navigate('/donate')}
                        className="btn-primary rounded-full px-8 py-3 text-sm font-bold shadow-lg shadow-indigo-200"
                    >
                        Support Our Mission
                    </button>
                    <p className="mt-4 text-xs text-gray-400">
                        Join over 500+ donors making a difference.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProgramsSectionScroll;
