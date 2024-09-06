import React from "react";
import "./Home.css";
import ProductInfo from "./HomeProduct";
import ReviewsSlider from "./ReviewsSlider";
import Footer from "./Footer";
import Slider from "./Slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div id="Home">
        <div id="banner">
            <Slider/>
        </div>
        <div id="Product">
          <ProductInfo/>
        </div>
        <div id="Reviews">
          <ReviewsSlider/>
        </div>
        <div id="Footer">
          <Footer/>
        </div>
        <div className="whatsapp">
        <a href="https://wa.me/9885647711" target="_blank" rel="noopener noreferrer" className="whatsapp-icon">
      <FontAwesomeIcon icon={faWhatsapp} size="2x" color="#25D366" />
      <Link to="/product/:id">
            <button type="submit" className="btn-attractive">
              shop now
            </button>
          </Link>
    </a>
        </div>
      </div>
    </>
  );
};

export default Home;
