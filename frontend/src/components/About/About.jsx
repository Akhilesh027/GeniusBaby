import React, { useEffect, useRef } from 'react';
import ProductInfo from '../Home/HomeProduct';
import './about.css';
import Footer from '../Home/Footer';
import AboutImage from '../Images/05.png';
import { gsap } from 'gsap';

const About = () => {
  const imageRef = useRef(null);
  const textSectionRef = useRef(null);
  const socialMediaRef = useRef(null);

  useEffect(() => {
    // Initial animation for the about section
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo(
      textSectionRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      socialMediaRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power2.out' }
    );
  }, []);

  return (
    <>
      <div id='About'>
        <div className="about-us-container">
          <div className="about-us-content">
            <div className="image-section" ref={imageRef}>
              <img src={AboutImage} alt="Pregnant woman" className="about-us-image" />
            </div>
            <div className="text-section" ref={textSectionRef}>
              <h2>About Us</h2>
              <p>
                Our Mission..., is to improving prenatal care through innovative solutions. Our unique Genius
                baby Prenatal Music Device is to enhance fetal development and maternal well-being through
                the power of music which should reach all sections of the society.
              </p>
              <p>
                <strong>GENIUS BABY THE MOST EFFECTIVE AND SAFE PRE-NATAL MUSIC DEVICE</strong>
              </p>
              <p>
                GENIUS BABY PREGNANCY AUDIO DEVICE can significantly boost the brain of your baby while still in the
                womb. Improves music awareness, language skills and IQ levels of your new born baby and enhances the health
                level in general.
              </p>
              <p>
                WITH GENIUS BABY PREGNANCY AUDIO DEVICE, you will get a more healthy, clever and a bubbly baby.
              </p>
            </div>
            <div className="social-media" ref={socialMediaRef}>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
       <div className="p">
       <ProductInfo />
       </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
