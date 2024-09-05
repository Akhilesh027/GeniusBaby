import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import ProductImage from '../Images/03.png';
import t1 from '../Images/01.png';
import t2 from '../Images/03.png';
import t3 from '../Images/06.png';
import t4 from '../Images/04.png';
import t5 from '../Images/05.png';
import './Product.css';
import Footer from '../Home/Footer';

const Product = ({ initialQuantity = 1, productId=1 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState(ProductImage);

  const mainImageRef = useRef(null);
  const quantityRef = useRef(null);
  const productNameRef = useRef(null);
  const descriptionRefs = useRef([]);
  const priceRef = useRef(null);

  // Fetch product details from the new API endpoint
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = 1
        const response = await axios.get(`https://geniusbaby.onrender.com/products/${productId}`);
        setProduct(response.data);
        setMainImage(response.data.mainImage || ProductImage); // Set the main image from API if available
      } catch (err) {
        setError("Failed to fetch product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    gsap.from(mainImageRef.current, { opacity: 0, duration: 1, ease: "power3.inOut" });
  }, [mainImage]);

  useEffect(() => {
    gsap.from(productNameRef.current, { opacity: 0, y: -20, duration: 1, ease: "power3.inOut" });
    descriptionRefs.current.forEach((ref, index) => {
      gsap.from(ref, { opacity: 0, x: -20, duration: 1, delay: index * 0.2, ease: "power3.inOut" });
    });
    gsap.from(priceRef.current, { opacity: 0, y: 20, duration: 1, ease: "power3.inOut" });
  }, [loading]);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
    gsap.fromTo(quantityRef.current, { scale: 1.2 }, { scale: 1, duration: 0.2 });
  };

  const handleAddToCart = async () => {
    try {
      await axios.post('https://geniusbaby.onrender.com/add', {
        productId,
        productName: product.name,
        productPrice: product.price,
        quantity
      });
      alert('Product added to cart successfully!');
      window.location.href = '/product/:id';
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  if (loading) return (
    <div className="spinner"></div>
  );
  if (error) return <p>{error}</p>;

  return (
    <>
      <div id='product'>
        <div className="product-gallery">
          <div className="main-image" ref={mainImageRef}>
            <img src={mainImage} alt="Main Product Image" />
          </div>
          <div className="thumbnail-images">
            <img
              src={t1}
              alt="Thumbnail 1"
              onClick={() => handleThumbnailClick(t1)}
              className={mainImage === t1 ? 'active-thumbnail' : ''}
            />
            <img
              src={t2}
              alt="Thumbnail 2"
              onClick={() => handleThumbnailClick(t2)}
              className={mainImage === t2 ? 'active-thumbnail' : ''}
            />
            <img
              src={t3}
              alt="Thumbnail 3"
              onClick={() => handleThumbnailClick(t3)}
              className={mainImage === t3 ? 'active-thumbnail' : ''}
            />
            <img
              src={t4}
              alt="Thumbnail 4"
              onClick={() => handleThumbnailClick(t4)}
              className={mainImage === t4 ? 'active-thumbnail' : ''}
            />
             <img
              src={t5}
              alt="Thumbnail 5"
              onClick={() => handleThumbnailClick(t5)}
              className={mainImage === t5 ? 'active-thumbnail' : ''}
            />
          </div>
        </div>
        <div className='description'>
          <div>
            <h2 ref={productNameRef}>{product.name || 'Product Name'}</h2>
            <h4>Choosing the Right Music</h4>
            {["Offer tips on selecting soothing and appropriate music for prenatal listening.",
              "Suggest different genres and styles of music that can be enjoyable for both mother and baby.",
              "Discuss the importance of volume and timing when playing music for the unborn child.",
              "Provide practical ideas for weaving music into daily routines, such as bedtime rituals and meditation sessions."
            ].map((text, index) => (
              <p key={index} ref={el => descriptionRefs.current[index] = el}>{text}</p>
            ))}
            <h3 ref={priceRef}>₹{product.price || '0'} + Free Shipping</h3>
            <div ref={productNameRef} className='incre'>
              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
                <span ref={quantityRef}>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
              <div>
                <button className='pbtn' onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Product;
