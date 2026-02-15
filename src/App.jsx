import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SinglePageHome from './pages/SinglePageHome';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import PaymentDemo from './pages/PaymentDemo';
import ProgramsSection from './components/ProgramsSection';
import PageTransition from './components/PageTransition';
import PageLayout from './components/PageLayout';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <AnimatePresence mode="wait">
                    <Routes>
                        {/* Single Page Home with Scroll Navigation (has its own navbar) */}
                        <Route path="/" element={<SinglePageHome />} />

                        {/* Separate Pages (wrapped with PageLayout for navbar and footer) */}
                        <Route path="/about" element={
                            <PageLayout>
                                <PageTransition><AboutPage /></PageTransition>
                            </PageLayout>
                        } />
                        <Route path="/programs" element={
                            <PageLayout>
                                <PageTransition><ProgramsSection /></PageTransition>
                            </PageLayout>
                        } />
                        <Route path="/blog" element={
                            <PageLayout>
                                <PageTransition><BlogPage /></PageTransition>
                            </PageLayout>
                        } />
                        <Route path="/events" element={
                            <PageLayout>
                                <PageTransition><EventsPage /></PageTransition>
                            </PageLayout>
                        } />
                        <Route path="/gallery" element={
                            <PageLayout>
                                <PageTransition><GalleryPage /></PageTransition>
                            </PageLayout>
                        } />
                        <Route path="/contact" element={
                            <PageLayout>
                                <PageTransition><ContactPage /></PageTransition>
                            </PageLayout>
                        } />
                        <Route path="/donate" element={
                            <PageLayout>
                                <PageTransition><DonatePage /></PageTransition>
                            </PageLayout>
                        } />
                        <Route path="/get-involved" element={
                            <PageLayout>
                                <PageTransition><GetInvolvedPage /></PageTransition>
                            </PageLayout>
                        } />

                        {/* Payment Demo Page */}
                        <Route path="/payment-demo" element={
                            <PageLayout>
                                <PageTransition><PaymentDemo /></PageTransition>
                            </PageLayout>
                        } />

                        {/* Legal Pages */}
                        <Route path="/privacy" element={
                            <PageLayout>
                                <PageTransition><PrivacyPage /></PageTransition>
                            </PageLayout>
                        } />
                        <Route path="/terms" element={
                            <PageLayout>
                                <PageTransition><TermsPage /></PageTransition>
                            </PageLayout>
                        } />
                        <Route path="/cookies" element={
                            <PageLayout>
                                <PageTransition><CookiesPage /></PageTransition>
                            </PageLayout>
                        } />
                    </Routes>
                </AnimatePresence>
            </div>
        </Router>
    );
}

export default App;
