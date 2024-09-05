import React, { useState } from 'react';
import './Slider.css'; // Make sure to create this CSS file
import banner from '../Images/banner.jpg';
import background from '../Images/banner2.jpg';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { imgSrc: banner, altText: 'Slide 1' },
        { videoSrc: background, altText: 'Slide 2' },
    ];

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div id="banner">
            <div className="slider">
                <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div className="slide" key={index}>
                            {slide.imgSrc ? (
                                <img src={slide.imgSrc} alt={slide.altText} />
                            ) : (
                                <img src={slide.videoSrc} autoPlay loop muted />
                            )}
                            <h1>{slide.caption}</h1>
                        </div>
                    ))}
                </div>
                <button className="prev" onClick={handlePrev}>&#10094;</button>
                <button className="next" onClick={handleNext}>&#10095;</button>
            </div>
        </div>
    );
};

export default Slider;
