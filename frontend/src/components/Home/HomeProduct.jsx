import React, { useEffect, useRef } from "react";
import "./ProductInfo.css";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import image from "../Images/01.png";
import image2 from "../Images/09.png";
import image3 from "../Images/03.png";
import image4 from "../Images/04.png";
import whatsapp from "../Images/whatsapplogo.jpg"
gsap.registerPlugin(ScrollTrigger);

const ProductInfo = () => {
  const introRef = useRef(null);
  const benefitRef = useRef(null);
  const whyChooseUsRef = useRef(null);

  useEffect(() => {
    // Intro Section Animation
    gsap.fromTo(
      introRef.current,
      { opacity: 0, y: 50 },  // from state
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top center",
          end: "bottom top",
        },
      }
    );

    // Benefits Section Animation
    gsap.fromTo(
      benefitRef.current.querySelectorAll("h1"),
      { opacity: 0, y: 20 },  // from state
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: benefitRef.current,
          start: "top center",
          end: "bottom top",
        },
      }
    );

    gsap.fromTo(
      benefitRef.current.querySelectorAll("p"),
      { opacity: 0, x: -20 },  // from state
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: benefitRef.current,
          start: "top center",
          end: "bottom top",
        },
      }
    );

    gsap.fromTo(
      benefitRef.current.querySelector(".benefit-image"),
      { opacity: 0, scale: 0.9 },  // from state
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: benefitRef.current.querySelector(".benefit-image"),
          start: "top center",
          end: "bottom top",
        },
      }
    );

    // Why Choose Us Section Animation
    gsap.fromTo(
      whyChooseUsRef.current.querySelectorAll(".hero-section h1, .hero-section p"),
      { opacity: 0, y: 30 },  // from state
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: whyChooseUsRef.current.querySelector(".hero-section"),
          start: "top center",
          end: "bottom top",
        },
      }
    );

    gsap.fromTo(
      whyChooseUsRef.current.querySelectorAll(".text-content h2, .text-content p, .text-content ul li"),
      { opacity: 0, x: 50 },  // from state
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: whyChooseUsRef.current.querySelector(".text-content"),
          start: "top center",
          end: "bottom top",
        },
      }
    );

    gsap.fromTo(
      whyChooseUsRef.current.querySelectorAll(".image-content img"),
      { opacity: 0, scale: 1.1 },  // from state
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: whyChooseUsRef.current.querySelector(".image-content img"),
          start: "top center",
          end: "bottom top",
        },
      }
    );

    gsap.fromTo(
      whyChooseUsRef.current.querySelector(".cta-button"),
      { opacity: 0, scale: 0.8 },  // from state
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
          trigger: whyChooseUsRef.current.querySelector(".cta-section"),
          start: "top center",
          end: "bottom top",
        },
      }
    );
  }, []);

  return (
    <div className="product-info">
      <div className="header">
        <h1 className="none">Product Information</h1>
      </div>
      <section className="introduction" ref={introRef}>
        <img
          src={image}
          alt="Genius Baby Product Introduction"
          className="intro-image"
        />
        <div className="matter">
          <h1>THE MAGIC OF THE PRENATAL MUSIC/AUDIO DEVICE</h1>
          <p>
            Genius Baby is a revolutionary product designed to support expecting
            mothers throughout their pregnancy journey. Our product combines
            cutting-edge technology with expert insights to promote a healthier
            and more relaxed pregnancy experience. Whether it's reducing stress,
            monitoring health, or providing personalized advice, Genius Baby is
            here to help.
          </p>
          <p>
            At Genius Baby, we believe in providing the best support to
            expecting mothers through innovative products designed to promote
            health and well-being.
          </p>
          <Link to="/product/:id">
            <button type="submit" className="btn-attractive">
              shop now
            </button>
          </Link>
        </div>
      </section>
      <section className="benefit" ref={benefitRef}>
        <div className="header">
          <h1>Benefits of Genius Baby</h1>
        </div>
        <div className="benefits">
          <ul>
            <h1>Promotes a Healthier Pregnancy:</h1>
            <p>
              Genius Baby provides personalized wellness tips that are tailored
              to your unique pregnancy journey. These tips help in maintaining a
              balanced diet, encouraging regular exercise, and ensuring overall
              well-being for both mother and baby.
            </p>
            <h1>Reduces Stress and Anxiety:</h1>
            <p>
              Pregnancy can be a stressful time, but Genius Baby offers calming
              exercises, guided meditation sessions, and stress-relief
              techniques designed to keep you relaxed and focused on what truly
              matters.
            </p>
            <h1>Monitors Key Health Metrics</h1>
            <p>
              With Genius Baby, you can easily track essential health metrics
              such as fetal movement, maternal heart rate, and more. This
              real-time monitoring ensures that you and your baby are thriving
              throughout every stage of your pregnancy.
            </p>
          </ul>
          <div>
            <img src={image2} alt="Expert Advice" className="benefit-image" />
          </div>
        </div>
      </section>
      <div className="why-choose-us" ref={whyChooseUsRef}>
        <div className="hero-section">
          <h1>Why Choose Us?</h1>
          <p>Your trusted partner in your pregnancy journey.</p>
        </div>
        <div className="content-section">
          <div className="text-content">
            <h2>Unique Selling Proposition (USP)</h2>
            <p>
              At Genius Baby, we believe that every pregnancy journey is unique and deserves personalized care...
            </p>
            <ul>
              <li><strong>Personalized Experience:</strong> Unlike other products...</li>
              <li><strong>Trusted by Experts:</strong> Genius Baby is developed...</li>
              <li><strong>User-Friendly and Comfortable:</strong> We prioritize your comfort...</li>
            </ul>
          </div>
          <div className="image-content">
            <img src={image3} alt="Unique Selling Proposition" />
          </div>
        </div>
        <div className="content-section">
          <div className="image-content">
            <img src={image4} alt="Our Values" />
          </div>
          <div className="text-content">
            <h2>Our Values</h2>
            <ul>
              <li><strong>Commitment to Health:</strong> Your health and the health of your baby...</li>
              <li><strong>Uncompromising Quality:</strong> We use only the highest quality materials...</li>
              <li><strong>Continuous Innovation:</strong> We are committed to continuously improving...</li>
            </ul>
          </div>
        </div>
        <div className="cta-section">
          <Link to="/product/:id">
            <button className="cta-button">Shop Now</button>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default ProductInfo;
