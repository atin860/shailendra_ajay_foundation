import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

const HybridNavbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Programs', path: '/programs' },
        { name: 'Events', path: '/events' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
                scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-2' 
                : 'bg-white py-4'
            }`}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <RouterLink to="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                        S
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm md:text-base leading-tight tracking-tight group-hover:text-indigo-700 transition-colors">
                            SHAILENDRA KUMAR
                        </span>
                        <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest leading-none">
                            Ajay Foundation
                        </span>
                    </div>
                </RouterLink>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <RouterLink
                            key={link.name}
                            to={link.path}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                location.pathname === link.path
                                ? 'text-indigo-600 bg-indigo-50'
                                : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                            }`}
                        >
                            {link.name}
                        </RouterLink>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden lg:flex items-center">
                    <RouterLink
                        to="/donate"
                        className="btn-accent px-5 py-2 rounded-full !text-xs md:!text-sm font-bold uppercase tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                    >
                        <span>Donate Now</span>
                        <Heart size={14} className="fill-current" />
                    </RouterLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
                    >
                        <div className="flex flex-col p-4 space-y-2">
                            {navLinks.map((link) => (
                                <RouterLink
                                    key={link.name}
                                    to={link.path}
                                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        location.pathname === link.path
                                        ? 'bg-indigo-50 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {link.name}
                                </RouterLink>
                            ))}
                            <div className="border-t border-gray-100 pt-3 mt-2">
                                <RouterLink
                                    to="/donate"
                                    className="w-full btn-accent justify-center py-3"
                                >
                                    Donate Now
                                </RouterLink>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default HybridNavbar;
