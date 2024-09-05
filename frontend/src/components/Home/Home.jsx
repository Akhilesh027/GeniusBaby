import React from "react";
import "./Home.css";
import banner from '../Images/banner.jpg'
import ProductInfo from "./HomeProduct";
import ReviewsSlider from "./ReviewsSlider";
import Footer from "./Footer";
import Slider from "./Slider";
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
      </div>
    </>
  );
};

export default Home;
