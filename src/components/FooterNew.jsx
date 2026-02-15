import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Youtube,
    Lock,
    Heart
} from 'lucide-react';

// Custom Threads Icon as it might not be in Lucide
const ThreadsIcon = ({ size = 20, className }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7 3.13-7 7-7 7 3.13 7 7v1" />
        <path d="M21.5 12h-2.5a2 2 0 0 1-1.6-.8l-.4-.6a4 4 0 1 0 0 5.6" />
        <path d="M12 7v.01" />
    </svg>
);

const FooterNew = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: true, margin: "-50px" });

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    const toggleAccordion = (section) => {
        setActiveAccordion(activeAccordion === section ? null : section);
    };

    const quickLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Programs', path: '/programs' },
        { name: 'Impact Stories', path: '/blog' },
        { name: 'Annual Reports', path: '/about#reports' },
        { name: 'Careers', path: '/about#careers' }
    ];

    const getInvolvedLinks = [
        { name: 'Donate Books', path: '/donate' },
        { name: 'Volunteer', path: '/get-involved' },
        { name: 'Fundraise', path: '/get-involved#fundraise' },
        { name: 'Partner with Us', path: '/contact' },
        { name: 'Events', path: '/events' }
    ];

    const contactInfo = {
        address: 'Hardoi 241404, UP, India',
        phone: '+91 63873 45451',
        email: 'shailksingh6387@gmail.com'
    };

    const AccordionSection = ({ title, children, sectionKey }) => (
        <div className="border-b border-white/10 pb-4">
            <button
                className="w-full flex items-center justify-between text-white py-2"
                onClick={() => toggleAccordion(sectionKey)}
            >
                <h4 className="text-xl font-bold text-white">{title}</h4>
                <motion.div
                    animate={{ rotate: activeAccordion === sectionKey ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </button>
            <AnimatePresence>
                {activeAccordion === sectionKey && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return (
        <motion.footer
            className="bg-slate-900 text-white mt-16 relative overflow-hidden"
            ref={footerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.2),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.1),transparent_50%)]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                {/* Newsletter Section */}
                <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-16 border border-white/20 shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left max-w-xl">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">📚 Stay Connected</h3>
                            <p className="text-white/90 text-lg">Subscribe to our newsletter for updates on literacy programs and impact stories</p>
                        </div>
                        <form className="flex w-full max-w-md gap-4 flex-col sm:flex-row" onSubmit={handleSubscribe}>
                            {!subscribed ? (
                                <>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="flex-1 px-6 py-3 rounded-full bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-secondary-400 focus:bg-white/20 transition-all backdrop-blur-sm"
                                    />
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-3 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-secondary-500/20 transition-all whitespace-nowrap"
                                    >
                                        Subscribe
                                    </motion.button>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex-1 px-6 py-3 rounded-full bg-success/20 border-2 border-success text-white text-center font-semibold flex items-center justify-center"
                                >
                                    ✓ Thank you for subscribing!
                                </motion.div>
                            )}
                        </form>
                    </div>
                </motion.div>

                {/* Donate CTA (Desktop only) */}
                <div className="hidden lg:block mb-16">
                     <motion.div
                        className="bg-gradient-to-r from-secondary-400/20 to-secondary-400/10 rounded-2xl p-8 border border-secondary-400/30 relative overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-secondary-400 rounded-full text-primary-900">
                                    <Heart size={32} className="fill-current" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">Your Small Help Can Change a Life</h3>
                                    <p className="text-white/90">Support education for underprivileged children with a secure donation.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end gap-1 text-sm text-white/80">
                                    <div className="flex items-center gap-2">
                                        <Lock size={14} />
                                        <span>100% Secure Payments</span>
                                    </div>
                                    <span>Tax Benefits Available</span>
                                </div>
                                <Link 
                                    to="/donate"
                                    className="px-8 py-3 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 font-bold rounded-full shadow-lg hover:shadow-xl hover:translate-y-px transition-all"
                                >
                                    Donate Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <img src="/logo.png" alt="Logo" className="h-20 mb-6 bg-white rounded-lg p-2" />
                        <p className="text-white/80 leading-relaxed mb-6">
                            Empowering children through education and healthcare, creating lasting change in communities across India.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Youtube, href: "https://youtube.com/@shailendrakumarajayfoundation?si=PmVLvp52Ld2_6RsD" },
                                { Icon: Facebook, href: "https://www.facebook.com/share/18JDWpWVUv/" },
                                { Icon: ThreadsIcon, href: "https://www.threads.net/@shailendra_kumar_ajay_foundati" }
                            ].map(({ Icon, href }, i) => (
                                <a 
                                    key={i} 
                                    href={href} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary-500 hover:text-primary-900 transition-all hover:-translate-y-1"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links - Desktop */}
                    {!isMobile && (
                        <>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
                                    Quick Links
                                    <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-secondary-500 rounded-full"></span>
                                </h4>
                                <ul className="space-y-4">
                                    {quickLinks.map((link, i) => (
                                        <li key={i}>
                                            <Link to={link.path} className="text-white/70 hover:text-secondary-400 hover:pl-2 transition-all flex items-center gap-2">
                                                <span className="opacity-0 hover:opacity-100 transition-opacity">→</span>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
                                    Get Involved
                                    <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-secondary-500 rounded-full"></span>
                                </h4>
                                <ul className="space-y-4">
                                    {getInvolvedLinks.map((link, i) => (
                                        <li key={i}>
                                            <Link to={link.path} className="text-white/70 hover:text-secondary-400 hover:pl-2 transition-all flex items-center gap-2">
                                                <span className="opacity-0 hover:opacity-100 transition-opacity">→</span>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-6 relative inline-block">
                                    Contact
                                    <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-secondary-500 rounded-full"></span>
                                </h4>
                                <ul className="space-y-6">
                                    <li className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-secondary-400">
                                            <MapPin size={20} />
                                        </div>
                                        <span className="text-white/80">{contactInfo.address}</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-secondary-400">
                                            <Phone size={20} />
                                        </div>
                                        <a href={`tel:${contactInfo.phone}`} className="text-white/80 hover:text-secondary-400 transition-colors">
                                            {contactInfo.phone}
                                        </a>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/20 text-secondary-400">
                                            <Mail size={20} />
                                        </div>
                                        <a href={`mailto:${contactInfo.email}`} className="text-white/80 hover:text-secondary-400 transition-colors">
                                            {contactInfo.email}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </>
                    )}

                    {/* Mobile Accordions */}
                    {isMobile && (
                        <div className="col-span-1 space-y-4">
                            <AccordionSection title="Quick Links" sectionKey="quick-links">
                                <ul className="space-y-3">
                                    {quickLinks.map((link, i) => (
                                        <li key={i}>
                                            <Link to={link.path} className="text-white/70 block py-1">{link.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionSection>
                            <AccordionSection title="Get Involved" sectionKey="get-involved">
                                <ul className="space-y-3">
                                    {getInvolvedLinks.map((link, i) => (
                                        <li key={i}>
                                            <Link to={link.path} className="text-white/70 block py-1">{link.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionSection>
                            <AccordionSection title="Contact" sectionKey="contact">
                                <ul className="space-y-4">
                                    <li className="flex gap-3 text-white/80">
                                        <MapPin size={20} className="shrink-0 text-secondary-400" />
                                        {contactInfo.address}
                                    </li>
                                    <li>
                                        <a href={`tel:${contactInfo.phone}`} className="flex gap-3 text-white/80">
                                            <Phone size={20} className="shrink-0 text-secondary-400" />
                                            {contactInfo.phone}
                                        </a>
                                    </li>
                                    <li>
                                        <a href={`mailto:${contactInfo.email}`} className="flex gap-3 text-white/80">
                                            <Mail size={20} className="shrink-0 text-secondary-400" />
                                            {contactInfo.email}
                                        </a>
                                    </li>
                                </ul>
                            </AccordionSection>
                            <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
                                <h4 className="text-lg font-bold mb-2">Help Us Grow</h4>
                                <p className="text-white/70 mb-4 text-sm">Your contribution can make a difference.</p>
                                <Link to="/donate" className="block w-full text-center py-3 bg-secondary-500 text-primary-900 font-bold rounded-lg">
                                    Donate Now
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/60 text-sm text-center md:text-left">
                        © {currentYear} Shailendrakumar Ajay. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-white/60">
                        <Link to="/privacy" className="hover:text-secondary-400 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-secondary-400 transition-colors">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-secondary-400 transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default FooterNew;
