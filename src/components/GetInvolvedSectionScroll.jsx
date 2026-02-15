import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookHeart, Users, Calendar, Share2 } from 'lucide-react';
import './GetInvolvedSectionScroll.css';

const GetInvolvedSectionScroll = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const actions = [
        {
            icon: BookHeart,
            title: 'Donate Books',
            description: 'Share your books with children who need them. Every book makes a difference.',
            cta: 'DONATE NOW',
            color: '#2d5016'
        },
        {
            icon: Users,
            title: 'Volunteer',
            description: 'Join our team and help us organize events, teach, and spread awareness.',
            cta: 'Become a Volunteer',
            color: '#3d6b1f'
        },
        {
            icon: Calendar,
            title: 'Join Events',
            description: 'Participate in our book drives, workshops, and community programs.',
            cta: 'View Events',
            color: '#4d7b2f'
        },
        {
            icon: Share2,
            title: 'Spread Awareness',
            description: 'Share our mission on social media and help us reach more people.',
            cta: 'Share Now',
            color: '#2d5016'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="get-involved" className="get-involved-section-scroll" ref={ref}>
            <div className="get-involved-container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                >
                    <span className="section-tag">Make an Impact</span>
                    <h2 className="section-title">Get Involved</h2>
                    <div className="title-underline"></div>
                    <p className="section-description">
                        There are many ways you can support our mission and help children access quality education.
                    </p>
                </motion.div>

                <motion.div
                    className="involvement-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {actions.map((action, index) => (
                        <motion.div
                            key={index}
                            className="involvement-card"
                            variants={cardVariants}
                            whileHover={{ y: -10, boxShadow: '0 20px 50px rgba(45, 80, 22, 0.15)' }}
                        >
                            <motion.div
                                className="involvement-icon"
                                style={{ backgroundColor: action.color }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <action.icon size={40} />
                            </motion.div>

                            <h3 className="involvement-title">{action.title}</h3>
                            <p className="involvement-description">{action.description}</p>

                            <motion.button
                                className="involvement-cta"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {action.cta}
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="involvement-footer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.8 }}
                >
                    <h3>Ready to make a difference?</h3>
                    <p>Join thousands of supporters who are changing lives through education.</p>
                    <motion.button
                        className="footer-cta-btn"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started Today
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default GetInvolvedSectionScroll;
