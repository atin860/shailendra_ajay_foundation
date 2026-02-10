import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const HybridNavbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'about', label: 'About Us', path: '/about' },
        { id: 'programs', label: 'Programs', path: '/programs' },
        { id: 'blog', label: 'Blog', path: '/blog' },
        { id: 'events', label: 'Events', path: '/events' },
        { id: 'gallery', label: 'Gallery', path: '/gallery' },
        { id: 'contact', label: 'Contact', path: '/contact' },
        { id: 'get-involved', label: 'Get Involved', path: '/get-involved' },
    ];

    useEffect(() => {
        if (navRef.current && !isMobileMenuOpen) {
            const activeLink = navRef.current.querySelector(`[data-section="${activeSection}"]`);
            if (activeLink) {
                const { offsetLeft, offsetWidth } = activeLink;
                setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
            }
        }
    }, [activeSection, isMobileMenuOpen]);

    useEffect(() => {
        const currentPath = location.pathname;
        const currentItem = menuItems.find(item => item.path === currentPath);
        if (currentItem) {
            setActiveSection(currentItem.id);
        }
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        // Cleanup on unmount
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft py-2' : 'bg-white py-4'
                }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <RouterLink to="/" className="flex items-center gap-3 z-50 relative group">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-primary-500/30 transition-shadow"
                    >
                        S
                    </motion.div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-sm tracking-wide text-primary-900 leading-none">SHAILENDRA KUMAR</span>
                        <span className="font-bold text-xs tracking-wider text-secondary-500 leading-none mt-0.5">AJAY FOUNDATION</span>
                    </div>
                </RouterLink>

                {/* Desktop Menu */}
                <div className="hidden xl:flex items-center gap-1 relative" ref={navRef}>
                    {menuItems.map((item) => (
                        <RouterLink
                            key={item.id}
                            to={item.path}
                            className={`relative px-4 py-2 text-sm font-semibold transition-colors rounded-lg hover:bg-primary-50 ${activeSection === item.id ? 'text-primary-700' : 'text-text-light hover:text-primary-600'
                                }`}
                            data-section={item.id}
                        >
                            {item.label}
                        </RouterLink>
                    ))}

                    {/* Animated Underline */}
                    <motion.div
                        className="absolute bottom-0 h-0.5 bg-secondary-500 rounded-full pointer-events-none"
                        animate={{
                            left: underlineStyle.left + 16, // Adjust for padding
                            width: underlineStyle.width - 32,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RouterLink
                            to="/donate"
                            className="bg-gradient-to-r from-secondary-400 to-secondary-500 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-secondary-500/30 hover:shadow-secondary-500/50 transition-all text-sm flex items-center gap-2"
                        >
                            <span>Donate Now</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </RouterLink>
                    </motion.div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="xl:hidden p-2 text-primary-900 rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-100"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                            >
                                <Menu size={24} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMobileMenu}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] xl:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-[101] xl:hidden flex flex-col overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-primary-50/50">
                                <span className="font-bold text-primary-900">Menu</span>
                                <button onClick={closeMobileMenu} className="p-2 text-primary-500 hover:bg-primary-100 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-4 px-4">
                                <div className="flex flex-col gap-2">
                                    {menuItems.map((item) => (
                                        <RouterLink
                                            key={item.id}
                                            to={item.path}
                                            onClick={closeMobileMenu}
                                            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeSection === item.id
                                                ? 'bg-primary-50 text-primary-700'
                                                : 'text-text-light hover:bg-gray-50 hover:text-primary-600'
                                                }`}
                                        >
                                            {item.label}
                                        </RouterLink>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <RouterLink
                                    to="/donate"
                                    onClick={closeMobileMenu}
                                    className="w-full flex items-center justify-center gap-2 bg-secondary-500 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-secondary-600 transition-colors"
                                >
                                    <span>Donate Now</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </RouterLink>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default HybridNavbar;
