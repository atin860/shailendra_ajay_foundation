import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import './LegalPages.css';

const PrivacyPage = () => {
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
                    <Shield size={48} className="legal-icon" />
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Last Updated: January 27, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>1. Introduction</h2>
                        <p>
                            Shailendrakumar Ajay ("we," "our," or "us") is committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                            when you visit our website or make a donation.
                        </p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <p>We may collect the following types of information:</p>
                        <ul>
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and mailing address</li>
                            <li><strong>Payment Information:</strong> Credit card details, billing address (processed securely through our payment partners)</li>
                            <li><strong>Usage Data:</strong> IP address, browser type, pages visited, and time spent on our website</li>
                            <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul>
                            <li>Process donations and issue tax receipts</li>
                            <li>Send newsletters and updates about our programs</li>
                            <li>Respond to your inquiries and provide customer support</li>
                            <li>Improve our website and services</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Information Sharing</h2>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties.
                            We may share your information with:
                        </p>
                        <ul>
                            <li>Payment processors to complete transactions</li>
                            <li>Service providers who assist in our operations</li>
                            <li>Legal authorities when required by law</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect your personal information.
                            All payment transactions are encrypted using SSL technology. However, no method
                            of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2>6. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access your personal information</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Children's Privacy</h2>
                        <p>
                            Our website is not intended for children under 13. We do not knowingly collect
                            personal information from children under 13.
                        </p>
                    </section>

                    <section>
                        <h2>8. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy, please contact us at:
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

export default PrivacyPage;
