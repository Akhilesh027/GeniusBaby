import React, { useEffect, useRef } from 'react';
import './ReviewsSlider.css';
import reviewimg from '../Images/user.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ReviewsGrid = () => {
  const reviewsRef = useRef(null);

  useEffect(() => {
    // Reviews Grid Animation
    gsap.fromTo(
      reviewsRef.current.querySelectorAll('.review-card'),
      { opacity: 0, y: 50 },  // from state
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: reviewsRef.current,
          start: 'top center',
          end: 'bottom top',
        },
      }
    );
  }, []);

  const reviews = [
    {
      name: 'Reya.',
      review: "I absolutely love the Genius Baby Prenatal Music Belt! It's so comfortable to wear and I enjoy playing soothing music for my baby. The sound quality is great and it's easy to connect to my phone. Highly recommend for all expecting moms!",
      image: reviewimg,
    },
    {
      name: 'Snaha.',
      review: "The Genius Baby audio device has been amazing during my pregnancy. It's reassuring to know that the sound is safe for my baby and I love the idea that they can hear the same music after they're born. It's easy to use and fits comfortably around my belly.",
      image: reviewimg,
    },
    {
      name: 'Mahesh R.',
      review: "The Genius Baby audio device is such a clever and wonderful product. It's easy to attach to my belly. It's like we're already creating memories together. The sound is clear and the device is very comfortable to wear. I highly recommend it to other moms-to-be!",
      image: reviewimg,
    },
    {
      name: 'Anshita.',
      review: "The Genius Baby earphones are fantastic! I use them every evening to nature sounds for my baby. The earphones are gentle and safe and they stay in place nicely. I love that I can start introducing my baby to music now. It's a beautiful way to connect with my little one.",
      image: reviewimg,
    },
  ];

  return (
    <div className="reviews-grid" ref={reviewsRef}>
      <h2>What Our Customers Say</h2>
      <div className="review-cards">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <img src={review.image} alt={review.name} />
            <p>"{review.review}"</p>
            <h3>{review.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsGrid;
