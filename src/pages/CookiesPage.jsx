import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie, ArrowLeft } from 'lucide-react';
import './LegalPages.css';

const CookiesPage = () => {
    return (
        <div className="legal-page">
            <motion.div
                className="legal-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>

                <div className="legal-header">
                    <Cookie size={48} className="legal-icon" />
                    <h1>Cookie Policy</h1>
                    <p className="last-updated">Last Updated: January 27, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are placed on your device when you visit our website.
                            They help us provide you with a better experience by remembering your preferences and
                            understanding how you use our site.
                        </p>
                    </section>

                    <section>
                        <h2>2. Types of Cookies We Use</h2>

                        <h3>Essential Cookies</h3>
                        <p>
                            These cookies are necessary for the website to function properly. They enable basic
                            functions like page navigation and access to secure areas.
                        </p>

                        <h3>Analytics Cookies</h3>
                        <p>
                            We use analytics cookies to understand how visitors interact with our website. This
                            helps us improve our content and user experience.
                        </p>

                        <h3>Functional Cookies</h3>
                        <p>
                            These cookies remember your preferences (such as language or region) to provide a
                            more personalized experience.
                        </p>

                        <h3>Marketing Cookies</h3>
                        <p>
                            We may use marketing cookies to track visitors across websites and display relevant
                            advertisements about our programs and initiatives.
                        </p>
                    </section>

                    <section>
                        <h2>3. Third-Party Cookies</h2>
                        <p>We may use third-party services that set cookies on our website, including:</p>
                        <ul>
                            <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                            <li><strong>Payment Processors:</strong> To process secure donations</li>
                            <li><strong>Social Media Platforms:</strong> To enable social sharing features</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. How We Use Cookies</h2>
                        <p>We use cookies to:</p>
                        <ul>
                            <li>Remember your preferences and settings</li>
                            <li>Understand how you use our website</li>
                            <li>Improve website performance and functionality</li>
                            <li>Provide personalized content and recommendations</li>
                            <li>Measure the effectiveness of our campaigns</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Managing Cookies</h2>
                        <p>
                            You can control and manage cookies in several ways:
                        </p>

                        <h3>Browser Settings</h3>
                        <p>
                            Most browsers allow you to refuse or accept cookies, delete existing cookies, and
                            set preferences for certain websites. Check your browser's help section for instructions.
                        </p>

                        <h3>Opt-Out Tools</h3>
                        <p>
                            You can opt out of analytics cookies using tools like Google Analytics Opt-out Browser Add-on.
                        </p>

                        <p className="warning-box">
                            <strong>Note:</strong> Disabling cookies may affect the functionality of our website
                            and limit your ability to use certain features.
                        </p>
                    </section>

                    <section>
                        <h2>6. Cookie Duration</h2>
                        <p>We use both session and persistent cookies:</p>
                        <ul>
                            <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                            <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Updates to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in technology
                            or legal requirements. We encourage you to review this page periodically.
                        </p>
                    </section>

                    <section>
                        <h2>8. Contact Us</h2>
                        <p>
                            If you have questions about our use of cookies, please contact us:
                        </p>
                        <div className="contact-box">
                            <p><strong>Email:</strong> privacy@shailendrakumarajay.org</p>
                            <p><strong>Phone:</strong> +91 63873 45441</p>
                            <p><strong>Address:</strong> 123 Education Street, Mumbai, Maharashtra, India</p>
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default CookiesPage;
