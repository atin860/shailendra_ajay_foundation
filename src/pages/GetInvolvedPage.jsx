import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { BookHeart, Users, Handshake, Share2, CheckCircle, TrendingUp, Heart, BookOpen } from 'lucide-react';
import GetInvolvedCard from '../components/GetInvolvedCard';
import { useCountUp } from '../hooks/useCountUp';
import './GetInvolvedPage.css';
import './GetInvolvedPageFix.css';
import './StatsRowFix.css';
import './FormEnhanced.css';
import './SectionSpacing.css';
import './YellowButton.css';

const GetInvolvedPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const formRef = useRef(null);
    const statsRef = useRef(null);

    const isFormInView = useInView(formRef, { once: true, margin: "-100px" });
    const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

    // Count-up animations for impact stats
    const booksCount = useCountUp(50000, 2500, statsRef);
    const volunteersCount = useCountUp(1200, 2000, statsRef);
    const communitiesCount = useCountUp(350, 2000, statsRef);
    const impactCount = useCountUp(95, 1500, statsRef);

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        // Simulate backend API call
        // In production, replace with actual Firebase/Node.js API
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Example Firebase integration:
            // await addDoc(collection(db, "volunteers"), {
            //   ...data,
            //   timestamp: serverTimestamp()
            // });

            console.log('Volunteer data:', data);
            setIsSubmitting(false);
            setIsSuccess(true);

            setTimeout(() => {
                setIsSuccess(false);
                reset();
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsSubmitting(false);
        }
    };

    const waysToHelp = [
        {
            icon: <BookHeart />,
            title: 'Donate Books',
            description: 'Share your books and spread knowledge to those who need it most. Every book makes a difference.',
            buttonText: 'DONATE NOW',
            color: '#4a7c2c',
            delay: 0
        },
        {
            icon: <Users />,
            title: 'Volunteer With Us',
            description: 'Join our team of passionate volunteers and help organize book drives and literacy programs.',
            buttonText: 'Become a Volunteer',
            color: '#5a9638',
            delay: 0.1
        },
        {
            icon: <Handshake />,
            title: 'Partner With Schools',
            description: 'Connect your school or organization with our mission to promote literacy in underserved communities.',
            buttonText: 'Partner With Us',
            color: '#facc15',
            delay: 0.2
        },
        {
            icon: <Share2 />,
            title: 'Spread the Word',
            description: 'Share our mission on social media and help us reach more people who want to make a difference.',
            buttonText: 'Share Now',
            color: '#f4c430',
            delay: 0.3
        }
    ];

    return (
        <div className="get-involved-page">
            {/* Hero Section with Parallax */}
            <motion.section
                className="get-involved-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-background"></div>

                {/* Floating Accent Shapes */}
                <motion.div
                    className="floating-shape shape-1"
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="floating-shape shape-2"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, -10, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                />

                <div className="hero-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Get Involved. Make an Impact.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Join our community of changemakers and help us bring the gift of reading to every child.
                    </motion.p>
                    <motion.div
                        className="hero-emoji"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                    >
                        🌟
                    </motion.div>
                </div>
            </motion.section>

            {/* Ways to Get Involved Section */}
            <section className="ways-to-help-section">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Ways You Can Help</h2>
                    <p>Choose how you'd like to make a difference in your community</p>
                </motion.div>

                <div className="ways-grid">
                    {waysToHelp.map((way, index) => (
                        <GetInvolvedCard
                            key={index}
                            icon={way.icon}
                            title={way.title}
                            description={way.description}
                            buttonText={way.buttonText}
                            color={way.color}
                            delay={way.delay}
                            onButtonClick={() => {
                                if (way.title === 'Volunteer With Us') {
                                    document.getElementById('volunteer-form')?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        />
                    ))}
                </div>
            </section>

            {/* Impact Statistics Section */}
            <section className="impact-stats-section" ref={statsRef}>
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Our Impact Together</h2>
                    <p>See the difference we've made with your support</p>
                </motion.div>

                <div className="stats-grid">
                    <motion.div
                        className="stat-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <motion.div
                            className="stat-icon"
                            animate={isStatsInView ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, 0]
                            } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <BookOpen size={48} />
                        </motion.div>
                        <h3>{booksCount.toLocaleString()}+</h3>
                        <p>Books Donated</p>
                    </motion.div>

                    <motion.div
                        className="stat-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.div
                            className="stat-icon"
                            animate={isStatsInView ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, -10, 0]
                            } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Users size={48} />
                        </motion.div>
                        <h3>{volunteersCount.toLocaleString()}+</h3>
                        <p>Active Volunteers</p>
                    </motion.div>

                    <motion.div
                        className="stat-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <motion.div
                            className="stat-icon"
                            animate={isStatsInView ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, 0]
                            } : {}}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <Heart size={48} />
                        </motion.div>
                        <h3>{communitiesCount}+</h3>
                        <p>Communities Served</p>
                    </motion.div>

                    <motion.div
                        className="stat-card"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.div
                            className="stat-icon"
                            animate={isStatsInView ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, -10, 0]
                            } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <TrendingUp size={48} />
                        </motion.div>
                        <h3>{impactCount}%</h3>
                        <p>Literacy Improvement</p>
                    </motion.div>
                </div>
            </section>

            {/* Volunteer Sign-Up Form with Image */}
            <section className="volunteer-form-section" id="volunteer-form" ref={formRef}>
                <motion.div
                    className="form-wrapper-grid"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Left Side - Image */}
                    <motion.div
                        className="form-image-side"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="image-container">
                            <img
                                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                                alt="Volunteers helping children with books"
                            />
                            <div className="image-overlay-content">
                                <motion.div
                                    className="overlay-stat-box"
                                    initial={{ scale: 0 }}
                                    animate={isFormInView ? { scale: 1 } : {}}
                                    transition={{ delay: 0.6, type: "spring" }}
                                >
                                    <Heart size={32} />
                                    <h3>1,200+</h3>
                                    <p>Active Volunteers</p>
                                </motion.div>
                            </div>
                        </div>
                        <div className="volunteer-benefits">
                            <h3>Why Volunteer With Us?</h3>
                            <ul>
                                <li>
                                    <span className="benefit-icon">✨</span>
                                    <span>Make a real impact in children's lives</span>
                                </li>
                                <li>
                                    <span className="benefit-icon">🤝</span>
                                    <span>Join a passionate community</span>
                                </li>
                                <li>
                                    <span className="benefit-icon">📚</span>
                                    <span>Flexible volunteering opportunities</span>
                                </li>
                                <li>
                                    <span className="benefit-icon">🎯</span>
                                    <span>Develop new skills and experience</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        className="form-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="form-header">
                            <motion.div
                                className="form-icon"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={isFormInView ? { scale: 1, rotate: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
                            >
                                <Heart size={48} />
                            </motion.div>
                            <h2>Join Our Volunteer Team</h2>
                            <p>Be part of something meaningful. Together, we can change lives through literacy.</p>
                        </div>

                        {!isSuccess ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="volunteer-form">
                                {/* Name Field with Floating Label */}
                                <motion.div
                                    className={`form-group floating-label ${errors.name ? 'has-error' : ''}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                >
                                    <input
                                        type="text"
                                        id="name"
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: { value: 2, message: "Name must be at least 2 characters" }
                                        })}
                                        className={errors.name ? 'error' : ''}
                                        placeholder=" "
                                    />
                                    <label htmlFor="name">Full Name *</label>
                                    {errors.name && (
                                        <motion.span
                                            className="error-message"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            ⚠️ {errors.name.message}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* Email Field with Floating Label */}
                                <motion.div
                                    className={`form-group floating-label ${errors.email ? 'has-error' : ''}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className={errors.email ? 'error' : ''}
                                        placeholder=" "
                                    />
                                    <label htmlFor="email">Email Address *</label>
                                    {errors.email && (
                                        <motion.span
                                            className="error-message"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            ⚠️ {errors.email.message}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* Phone Field with Floating Label */}
                                <motion.div
                                    className={`form-group floating-label ${errors.phone ? 'has-error' : ''}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                >
                                    <input
                                        type="tel"
                                        id="phone"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[0-9+\-\s()]+$/,
                                                message: "Invalid phone number"
                                            }
                                        })}
                                        className={errors.phone ? 'error' : ''}
                                        placeholder=" "
                                    />
                                    <label htmlFor="phone">Phone Number *</label>
                                    {errors.phone && (
                                        <motion.span
                                            className="error-message"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            ⚠️ {errors.phone.message}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* Availability Field with Floating Label */}
                                <motion.div
                                    className={`form-group floating-label ${errors.availability ? 'has-error' : ''}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <select
                                        id="availability"
                                        {...register("availability", { required: "Please select your availability" })}
                                        className={errors.availability ? 'error' : ''}
                                    >
                                        <option value=""></option>
                                        <option value="weekdays">Weekdays</option>
                                        <option value="weekends">Weekends</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                    <label htmlFor="availability">Availability *</label>
                                    {errors.availability && (
                                        <motion.span
                                            className="error-message"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            ⚠️ {errors.availability.message}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* Message Field with Floating Label */}
                                <motion.div
                                    className={`form-group floating-label ${errors.message ? 'has-error' : ''}`}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isFormInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                >
                                    <textarea
                                        id="message"
                                        rows="4"
                                        {...register("message", {
                                            required: "Please tell us why you want to volunteer",
                                            minLength: { value: 20, message: "Please provide at least 20 characters" }
                                        })}
                                        className={errors.message ? 'error' : ''}
                                        placeholder=" "
                                    ></textarea>
                                    <label htmlFor="message">Why do you want to volunteer with us?</label>
                                    {errors.message && (
                                        <motion.span
                                            className="error-message"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            ⚠️ {errors.message.message}
                                        </motion.span>
                                    )}
                                </motion.div>

                                {/* Submit Button with Enhanced Animation */}
                                <motion.button
                                    type="submit"
                                    className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    whileHover={!isSubmitting ? {
                                        scale: 1.02,
                                        y: -4,
                                        boxShadow: "0 12px 40px rgba(74, 124, 44, 0.4)"
                                    } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            className="loading-spinner"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <div className="spinner-circle"></div>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <span>Join Our Team</span>
                                            <motion.span
                                                className="button-arrow"
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                →
                                            </motion.span>
                                        </>
                                    )}
                                </motion.button>

                                {/* Trust Badge */}
                                <motion.div
                                    className="trust-badge"
                                    initial={{ opacity: 0 }}
                                    animate={isFormInView ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                >
                                    <span className="lock-icon">🔒</span>
                                    <p>Your data is safe with us. We respect your privacy and will never share your information.</p>
                                </motion.div>
                            </form>
                        ) : (
                            <motion.div
                                className="success-message"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div
                                    className="success-icon"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                                >
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.5,
                                            times: [0, 0.5, 1]
                                        }}
                                    >
                                        <CheckCircle size={100} strokeWidth={2.5} />
                                    </motion.div>
                                </motion.div>
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Welcome to the Team! 🎉
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Thank you for joining us! We'll contact you within 48 hours with next steps.
                                </motion.p>
                                <motion.div
                                    className="success-confetti"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <span>🎊</span>
                                    <span>✨</span>
                                    <span>🌟</span>
                                    <span>💚</span>
                                    <span>📚</span>
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default GetInvolvedPage;
