import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, X, Maximize2, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AboutPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const openLightbox = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset';
    };

    const handleDownload = (e, image) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = image;
        link.download = image.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="about-page bg-gray-50 min-h-screen">
             {/* Blue Header Section */}
             <header className="py-20 bg-indigo-900 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container-custom relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4 text-white"
                    >
                        About Our Foundation
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-indigo-100 max-w-2xl mx-auto"
                    >
                        Empowering communities through education and building brighter futures for children across India.
                    </motion.p>
                </div>
            </header>

            {/* Main Content Section */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-bold text-sm tracking-wide uppercase mb-2 block">Who We Are</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transforming Lives Through Education</h2>
                        <div className="w-20 h-1.5 bg-indigo-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-gray-600 text-lg leading-relaxed">
                                <span className="font-bold text-indigo-700">SHAILENDRA KUMAR AJAY FOUNDATION</span> is a non-profit organization dedicated to transforming the educational landscape in rural and underserved communities across India. Since our inception in 2015, we have been committed to ensuring that every child has access to quality education.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Our holistic approach encompasses not just providing educational resources, but also fostering community engagement, teacher training, infrastructure development, and sustainable support systems that create lasting change.
                            </p>

                            <Link to="/get-involved" className="btn-primary inline-flex gap-2 mt-4">
                                <span>👍</span> Join Our Mission
                            </Link>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="Mission.jpeg"
                                alt="Foundation mission"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

             {/* Documentation Images Section - UPDATED */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey in Pictures</h2>
                         <p className="text-gray-600 max-w-2xl mx-auto">Explore our official documentation and certificates of recognition.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {documentationImages.map((image, index) => (
                            <motion.div 
                                key={index} 
                                className="group relative bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => openLightbox(image)}>
                                    <img 
                                        src={image} 
                                        alt={`Document ${index + 1}`} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 gap-4">
                                        <button 
                                            className="p-3 bg-white/90 rounded-full text-indigo-900 hover:bg-white transition-colors transform hover:scale-110 shadow-lg"
                                            onClick={(e) => { e.stopPropagation(); openLightbox(image); }}
                                            title="View Fullscreen"
                                        >
                                            <Maximize2 size={20} />
                                        </button>
                                        <button 
                                            className="p-3 bg-white/90 rounded-full text-indigo-900 hover:bg-white transition-colors transform hover:scale-110 shadow-lg"
                                            onClick={(e) => handleDownload(e, image)}
                                            title="Download Image"
                                        >
                                            <Download size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 bg-white border-t border-gray-100">
                                    <h4 className="font-semibold text-gray-800 text-sm truncate">Official Document {index + 1}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Click to view details</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-indigo-600 font-bold text-sm tracking-wide uppercase mb-2 block">Leadership</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Meet Our Board</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                             Grateful for the commitment of our international board who bring experience, opportunities, and resources to the organisation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {boardMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300"
                                whileHover={{ y: -8 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                    />
                                    
                                    {/* Quote Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <p className="text-white text-sm italic leading-relaxed">"{member.thought}"</p>
                                    </div>
                                </div>
                                
                                <div className="p-6 text-center border-t border-gray-100 relative bg-white z-10">
                                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-indigo-600 text-sm font-medium">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={closeLightbox}
                    >
                        <button 
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
                            onClick={closeLightbox}
                        >
                            <X size={32} />
                        </button>

                         <button 
                            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 transition-all border border-white/20 z-50 font-medium"
                            onClick={(e) => handleDownload(e, selectedImage)}
                        >
                            <Download size={20} />
                            Download Hi-Res
                        </button>

                        <motion.img 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            src={selectedImage} 
                            alt="Full Screen Preview" 
                            className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl cursor-default"
                            onClick={(e) => e.stopPropagation()} // Prevent close on image click
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Documentation Images Array
const documentationImages = [
    "/Documentation 1.jpeg",
    "/Documentation 2.jpeg",
    "/Documentation 3.jpeg",
    "/Documentation 4.jpeg"
];

const boardMembers = [
    {
        name: "Shailendra Kumar",
        role: "Founder and Director",
        image: "/Founder.jpg",
        thought: "Giving is not just about making a donation, it is about making an impact. Every contribution helps us move closer to a world where compassion and support create real transformation."
    },
    {
        name: "Ajay Kumar",
        role: "2nd Director",
        image: "/2nd Director.jpg",
        thought: "Our mission is to create opportunities and bring positive change to lives that need it most. With your support, we can continue to empower communities, spread hope, and build a brighter tomorrow."
    },
    {
        name: "Amit Kumar",
        role: "Member",
        image: "/Amit Kumar.jpg",
        thought: "As a united team, we are dedicated to bringing positive change and meaningful support to those in need. Your contribution helps us create opportunities, spread hope, and build a brighter future for many lives."
    },
    {
        name: "Ankit Gautam",
        role: "Member",
        image: "/Ankit Gautam.jpg",
        thought: "As a united team, we are dedicated to bringing positive change and meaningful support to those in need. Your contribution helps us create opportunities, spread hope, and build a brighter future for many lives"
    },
    {
        name: "Kanchan devi",
        role: "Member",
        image: "/Kanchan devi.jpg",
        thought: "Together, we work with one mission — to serve humanity with compassion and commitment. Every donation you make empowers us to reach more people and make a lasting difference in society."
    },
    {
        name: "Satyprakash",
        role: "Member",
        image: "/Satyprakash.jpg",
        thought: "Driven by vision and guided by compassion, our team strives to create real impact in the community. Your support strengthens our mission and helps transform lives every day."
    },
    {
        name: "Soni",
        role: "Member",
        image: "/Soni.jpg",
        thought: "We believe that true change happens when people come together for a cause. Your generous contribution helps us bring hope, care, and support to those who need it most."
    }
];

export default AboutPage;
