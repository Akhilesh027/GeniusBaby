import React, { useEffect, useRef } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const sections = footer.querySelectorAll('.footer-section');

    gsap.fromTo(
      sections,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: footer,
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer-section about">
          <h2>About Genius Baby</h2>
          <p>Genius Baby is dedicated to supporting expecting parents with a range of products designed to ensure a healthy and comfortable pregnancy. Our mission is to provide the best resources and support for both mothers and fathers-to-be.</p>
        </div>
        <div className="footer-section-links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link className="link" to="/home">Home</Link></li>
            <li><Link className="link" to="/about">About Us</Link></li>
            <li><Link className="link" to="/products">Products</Link></li>
            <li><Link className="link" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:support@geniusbaby.com" className="contact-link">info@geniusbaby.com</a></p>
          <p>Phone: +91 9885647711</p>
          <p>Address: Patel's Green Front Apartments, Yapral, Secunderabad-500087, Telangana, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Genius Baby. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
