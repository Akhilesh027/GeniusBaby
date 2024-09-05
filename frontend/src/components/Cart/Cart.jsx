import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaTrash } from 'react-icons/fa';
import './Cart.css';
import img from '../Images/04.png';
import { Link } from 'react-router-dom';

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch cart items from the backend
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('https://geniusbaby.onrender.com/cart'); // Adjust the endpoint as necessary
        setCartItems(response.data);

        // Calculate the total amount
        const total = response.data.reduce(
          (acc, item) => acc + item.productPrice * item.quantity,
          0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`https://geniusbaby.onrender.com/cart/${productId}`);
      // Remove the item from the state
      setCartItems(cartItems.filter((item) => item.productId !== productId));
      // Update the total amount
      const total = cartItems
        .filter((item) => item.productId !== productId)
        .reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleBuyNow = () => {
    alert('Proceed to payment');
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <FaTimes className="close-icon" onClick={onClose} />
      </div>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.productId} className="cart-item">
                <img src={img} alt="cart" width={50} height={50} />
                <span className="item-name">{item.productName}</span>
                <span className="item-price">₹{item.productPrice}</span>
                <span className="item-quantity">Quantity: {item.quantity}</span>
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(item.productId)}
                />
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total Amount: ₹{totalAmount}</h3>
            <Link to="/billing">
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
