import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutPageStyles.css';

const AboutPage = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page">
            {/* Blue Header Section */}
            <header className="about-header">
                <h1>About Our Foundation</h1>
                <p className="text-white">
                    Empowering communities through education and building brighter futures for children across India.
                </p>

            </header>

            {/* Main Content Section */}
            <section className="about-content">
                <div className="section-title">
                    <h2>Who We Are</h2>
                    <h3>Transforming lives through education and empowerment</h3>
                    <div className="title-divider"></div>
                </div>

                <div className="content-grid">
                    <div className="text-column">
                        <p>
                            <span className="foundation-name">SHAILENDRA KUMAR AJAY FOUNDATION</span> is a non-profit organization dedicated to transforming the educational landscape in rural and underserved communities across India. Since our inception in 2015, we have been committed to ensuring that every child has access to quality education, regardless of their socio-economic background.
                        </p>
                        <p>
                            Our holistic approach encompasses not just providing educational resources, but also fostering community engagement, teacher training, infrastructure development, and sustainable support systems that create lasting change.
                        </p>

                        <Link to="/get-involved" className="join-btn">
                            <span className="icon">👍</span> Join Our Mission
                        </Link>
                    </div>

                    <div className="image-column">
                        <img
                            src="Mission.jpeg"
                            alt="Foundation vehicle and mission center"
                        />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <div className="team-header-container">
                    <h2 className="team-header">OUR BOARD</h2>
                </div>

                <p className="team-description">
                    Grateful for the commitment of our international board who bring experience, opportunities, and resources to the organisation.
                </p>

                <div className="team-grid">
                    {boardMembers.map((member, index) => (
                        <div
                            key={index}
                            className="team-member"
                            tabIndex="0" // Make focusable for keyboard users
                        >
                            <div className="member-image-wrapper">
                                <img src={member.image} alt={member.name} className="member-img" />

                                {/* Floating Tooltip - Positioned relative to wrapper */}
                                <div className="member-tooltip">
                                    <p>{member.thought}</p>
                                    <div className="tooltip-arrow"></div>
                                </div>
                            </div>
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

// Data Array for Board Members
const boardMembers = [
    {
        name: "Shailendra Kumar",
        role: "Founder and Director",
        image: "Founder.jpg",
        thought: "Giving is not just about making a donation, it is about making an impact. Every contribution helps us move closer to a world where compassion and support create real transformation."
    },
    {
        name: "Ajay Kumar",
        role: "2nd Director",
        image: "2nd Director.jpg",
        thought: "Our mission is to create opportunities and bring positive change to lives that need it most. With your support, we can continue to empower communities, spread hope, and build a brighter tomorrow."
    },
    {
        name: "Amit Kumar",
        role: "Member",
        image: "Amit Kumar.jpg",
        thought: "As a united team, we are dedicated to bringing positive change and meaningful support to those in need. Your contribution helps us create opportunities, spread hope, and build a brighter future for many lives."
    },
    {
        name: "Ankit Gautam",
        role: "Member",
        image: "Ankit Gautam.jpg",
        thought: "As a united team, we are dedicated to bringing positive change and meaningful support to those in need. Your contribution helps us create opportunities, spread hope, and build a brighter future for many lives"
    },
    {
        name: "Kanchan devi",
        role: "Member",
        image: "Kanchan devi.jpg",
        thought: "Together, we work with one mission — to serve humanity with compassion and commitment. Every donation you make empowers us to reach more people and make a lasting difference in society."
    },
    {
        name: "Satyprakash",
        role: "Member",
        image: "Satyprakash.jpg",
        thought: "Driven by vision and guided by compassion, our team strives to create real impact in the community. Your support strengthens our mission and helps transform lives every day."
    },
    {
        name: "Soni",
        role: "Member",
        image: "Soni.jpg",
        thought: "We believe that true change happens when people come together for a cause. Your generous contribution helps us bring hope, care, and support to those who need it most."
    }
];

export default AboutPage;
