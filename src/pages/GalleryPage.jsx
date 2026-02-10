import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryImageCard from '../components/GalleryImageCard';
import LightboxModal from '../components/LightboxModal';
import './GalleryPage.css';

const GalleryPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = ['All', 'Documentation', 'Donation Drives', 'Events', 'Volunteers', 'Community'];

    const galleryImages = [
        {
            id: 1,
            src: "Documentation 1.jpeg",
            category: "Documentation"
        },
        {
            id: 2,
            src: "Documentation 2.jpeg",
            category: "Documentation"
        },
        {
            id: 3,
            src: "Documentation 3.jpeg",
            category: "Documentation"
        },
        {
            id: 4,
            src: "Documentation 4.jpeg",
            category: "Documentation"
        },
        {
            id: 5,
            src: "Event 2.jpeg",
            caption: "Children discovering new books at our library",
            category: "Community"
        },
        {
            id: 6,
            src: "Event 2.jpeg",
            caption: "Annual book distribution drive in rural schools",
            category: "Donation Drives"
        },
        {
            id: 7,
            src: "Event 5.jpeg",
            caption: "Volunteer training workshop",
            category: "Volunteers"
        },
        {
            id: 8,
            src: "Event 9.jpeg",
            caption: "Young reader enjoying a storybook",
            category: "Community"
        },
        {
            id: 9,
            src: "Event 10.jpeg",
            caption: "Organizing books for distribution",
            category: "Donation Drives"
        },
        {
            id: 10,
            src: "Event 1.jpeg",
            caption: "Community book fair event",
            category: "Events"
        },
        {
            id: 11,
            src: "Event 4.jpeg",
            caption: "Digital literacy training session",
            category: "Events"
        },
        {
            id: 12,
            src: "Event 6.jpeg",
            caption: "Reading circle with children",
            category: "Community"
        },
        {
            id: 13,
            src: "Event 7.jpeg",
            caption: "Volunteers packing books for donation",
            category: "Volunteers"
        },
        {
            id: 14,
            src: "Event 8.jpeg",
            caption: "Mobile library reaching remote villages",
            category: "Donation Drives"
        },
        {
            id: 15,
            src: "Event 5.jpeg",
            caption: "Storytelling session at community center",
            category: "Events"
        }
    ];

    const filteredImages = activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        const index = filteredImages.findIndex(img => img.id === image.id);
        setCurrentImageIndex(index);
    };

    const handleNext = () => {
        const nextIndex = (currentImageIndex + 1) % filteredImages.length;
        setCurrentImageIndex(nextIndex);
        setSelectedImage(filteredImages[nextIndex]);
    };

    const handlePrev = () => {
        const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        setCurrentImageIndex(prevIndex);
        setSelectedImage(filteredImages[prevIndex]);
    };

    return (
        <div className="gallery-page">
            {/* Hero Section */}
            <motion.section
                className="gallery-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="gallery-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="gallery-hero-title">Moments of Impact</h1>
                    <p className="gallery-hero-subtitle text-white">
                        Witness the joy of reading and the power of community through our journey of spreading literacy.
                    </p>
                </motion.div>
            </motion.section>

            {/* Category Filter */}
            <section className="gallery-filter-section">
                <div className="container">
                    <div className="category-tabs">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="gallery-grid-section">
                <div className="container">
                    <motion.div
                        className="gallery-masonry-grid"
                        key={activeCategory}
                        layout
                    >
                        {filteredImages.map((image, index) => (
                            <GalleryImageCard
                                key={image.id}
                                image={image}
                                index={index}
                                onClick={handleImageClick}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                className="gallery-cta"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <div className="container">
                    <h2 className="cta-title">Be Part of Our Story</h2>
                    <p className="cta-subtitle">
                        Join us in creating more moments of joy and learning. Your contribution makes a difference.
                    </p>
                    <div className="cta-buttons">
                        <motion.button
                            className="cta-btn primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Donate Now
                        </motion.button>
                        <motion.button
                            className="cta-btn secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Become a Volunteer
                        </motion.button>
                    </div>
                </div>
            </motion.section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <LightboxModal
                        image={selectedImage}
                        onClose={() => setSelectedImage(null)}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        hasNext={currentImageIndex < filteredImages.length - 1}
                        hasPrev={currentImageIndex > 0}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryPage;
