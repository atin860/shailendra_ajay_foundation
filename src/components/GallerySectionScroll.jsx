import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import './GallerySectionScroll.css';

const GallerySectionScroll = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { url: 'Event 1.jpeg', caption: 'Children enjoying books' },
        { url: 'Event 2.jpeg', caption: 'Community library' },
        { url: 'Event 3.jpeg', caption: 'Reading session' },
        { url: 'Event 4.jpeg', caption: 'Volunteer team' },
        { url: 'Event 5.jpeg', caption: 'Book distribution' },
        { url: 'Event 6.jpeg', caption: 'Workshop event' }
    ];

    return (
        <section id="gallery" className="gallery-section-scroll" ref={ref}>
            <div className="gallery-container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                >
                    <span className="section-tag">Our Impact</span>
                    <h2 className="section-title">Gallery</h2>
                    <div className="title-underline"></div>
                </motion.div>

                <motion.div
                    className="gallery-grid"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="gallery-item"
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setSelectedImage(image)}
                        >
                            <img src={image.url} alt={image.caption} />
                            <div className="gallery-overlay">
                                <ZoomIn size={32} />
                                <p>{image.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <>
                        <motion.div
                            className="lightbox-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                        />
                        <motion.div
                            className="lightbox-content"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                                <X size={32} />
                            </button>
                            <img src={selectedImage.url} alt={selectedImage.caption} />
                            <p className="lightbox-caption">{selectedImage.caption}</p>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default GallerySectionScroll;
