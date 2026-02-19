import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import './LegalPages.css';

const TermsPage = () => {
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
                    <FileText size={48} className="legal-icon" />
                    <h1>Terms of Service</h1>
                    <p className="last-updated">Last Updated: January 27, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the Shailendrakumar Ajay website, you accept and agree to be
                            bound by these Terms of Service. If you do not agree to these terms, please do not
                            use our website.
                        </p>
                    </section>

                    <section>
                        <h2>2. Use of Website</h2>
                        <p>You agree to use our website only for lawful purposes and in a way that does not:</p>
                        <ul>
                            <li>Infringe the rights of others</li>
                            <li>Restrict or inhibit anyone's use of the website</li>
                            <li>Violate any applicable laws or regulations</li>
                            <li>Transmit harmful or malicious code</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Donations</h2>
                        <p>All donations made through our website are:</p>
                        <ul>
                            <li>Voluntary and non-refundable</li>
                            <li>Subject to our donation policy</li>
                            <li>Eligible for tax deductions as per applicable laws</li>
                            <li>Used solely for charitable purposes as described on our website</li>
                        </ul>
                        <p>
                            We reserve the right to refuse or return any donation at our discretion.
                        </p>
                    </section>

                    <section>
                        <h2>4. Intellectual Property</h2>
                        <p>
                            All content on this website, including text, graphics, logos, images, and software,
                            is the property of Shailendrakumar Ajay and is protected by copyright and other
                            intellectual property laws.
                        </p>
                        <p>
                            You may not reproduce, distribute, or create derivative works without our express
                            written permission.
                        </p>
                    </section>

                    <section>
                        <h2>5. User Content</h2>
                        <p>
                            If you submit content to our website (such as comments or testimonials), you grant
                            us a non-exclusive, royalty-free license to use, reproduce, and display that content.
                        </p>
                        <p>You represent that you own or have the right to use any content you submit.</p>
                    </section>

                    <section>
                        <h2>6. Third-Party Links</h2>
                        <p>
                            Our website may contain links to third-party websites. We are not responsible for
                            the content or practices of these external sites. Use them at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2>7. Disclaimer of Warranties</h2>
                        <p>
                            Our website is provided "as is" without warranties of any kind, either express or
                            implied. We do not guarantee that the website will be error-free or uninterrupted.
                        </p>
                    </section>

                    <section>
                        <h2>8. Limitation of Liability</h2>
                        <p>
                            Shailendrakumar Ajay shall not be liable for any indirect, incidental, special,
                            consequential, or punitive damages arising from your use of the website.
                        </p>
                    </section>

                    <section>
                        <h2>9. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms of Service at any time. Changes will be
                            effective immediately upon posting. Your continued use of the website constitutes
                            acceptance of the modified terms.
                        </p>
                    </section>

                    <section>
                        <h2>10. Governing Law</h2>
                        <p>
                            These Terms of Service are governed by the laws of India. Any disputes shall be
                            subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                        </p>
                    </section>

                    <section>
                        <h2>11. Contact Information</h2>
                        <p>
                            For questions about these Terms of Service, please contact us:
                        </p>
                        <div className="contact-box">
                            <p><strong>Email:</strong> legal@shailendrakumarajay.org</p>
                            <p><strong>Phone:</strong> +91 63873 45441</p>
                            <p><strong>Address:</strong> 123 Education Street, Mumbai, Maharashtra, India</p>
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default TermsPage;
