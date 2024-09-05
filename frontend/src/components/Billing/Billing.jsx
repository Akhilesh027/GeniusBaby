import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BillingForm.css";
import razorpayimg from '../Images/razorpay.webp'
import cod from '../Images/cod.webp'
import cardimg from '../Images/card.png'
const Buy = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    streetAddress: "",
    townCity: "",
    state: "",
    pinCode: "",
    phone: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load PayPal script dynamically
  const loadPayPalScript = () => {
    if (window.paypal) {
      setIsPayPalLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID"; // Replace with your PayPal client ID
    script.onload = () => setIsPayPalLoaded(true);
    script.onerror = () => setError("Failed to load PayPal script.");
    document.body.appendChild(script);
  };

  useEffect(() => {
    // Fetch cart items from API
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setCartItems(response.data);
        const total = response.data.reduce(
          (acc, item) => acc + item.productPrice * item.quantity,
          0
        );
        setTotalAmount(total);
      } catch (err) {
        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    if (paymentMethod === "paypal") {
      loadPayPalScript();
    }
  }, [paymentMethod]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentSuccess = (paymentDetails) => {
    // Handle payment success and submit order details to the backend
    submitOrder(paymentDetails);
  };

  const handlePayment = (event) => {
    event.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "razorpay") {
      handleRazorpayPayment();
    } else if (paymentMethod === "paypal") {
      if (!isPayPalLoaded) {
        alert("PayPal is not loaded yet. Please try again.");
        return;
      }
      handlePayPalPayment();
    } else if (paymentMethod === "cod") {
      console.log("Cash on Delivery selected");
      handlePaymentSuccess({
        orderId: Date.now(),
        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pending",
        transactionId: null,
        amount: totalAmount,
      });
    }
  };

  const handleRazorpayPayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key ID
      amount: totalAmount * 100,
      currency: "INR",
      name: "Your Company",
      description: "Test Transaction",
      handler: function (response) {
        console.log("Razorpay Payment Success:", response);
        handlePaymentSuccess({
          orderId: response.razorpay_order_id,
          paymentMethod: "Razorpay",
          paymentStatus: "Completed",
          transactionId: response.razorpay_payment_id,
          amount: totalAmount,
        });
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePayPalPayment = () => {
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: (totalAmount / 74).toFixed(2), // Convert INR to USD, approximate conversion rate
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            console.log("PayPal Payment Success:", details);
            handlePaymentSuccess({
              orderId: details.id,
              paymentMethod: "PayPal",
              paymentStatus: "Completed",
              transactionId: details.id,
              amount: (totalAmount / 74).toFixed(2), // Convert INR to USD
            });
          });
        },
      })
      .render("#paypal-button-container");
  };

  const submitOrder = async (paymentDetails) => {
    try {
      const orderData = {
        ...formData,
        paymentMethod: paymentDetails.paymentMethod,
        transactionId: paymentDetails.transactionId,
        paymentStatus: paymentDetails.paymentStatus,
        amount: paymentDetails.amount,
      };

      const response = await axios.post(
        "http://localhost:5000/api/billing",
        orderData
      );

      if (response.status === 201) {
        alert("Order successfully completed");
        console.log(
          "Order and payment details recorded successfully:",
          response.data
        );
        navigate("/"); // Redirect to a success page or appropriate location
      }
    } catch (error) {
      console.error("Error recording order details:", error);
      setError("Failed to submit order");
    }
  };

  const getMessage = () => {
    switch (paymentMethod) {
      case "paypal":
        return "You will be redirected to PayPal page when you click Place Order.";
      case "razorpay":
        return "You will be redirected to Razorpay page when you click Place Order.";
      case "cod":
        return "You will confirm Cash on Delivery when you click Place Order.";
      default:
        return "";
    }
  };

  return (
    <form onSubmit={handlePayment} className="billing-form">
      <div className="billing-data">
        <div className="billing-details">
          <h2>Billing details</h2>
          <label>First name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label>Last name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label>Country / Region *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          <label>Street address *</label>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />

          <label>Town / City *</label>
          <input
            type="text"
            name="townCity"
            value={formData.townCity}
            onChange={handleChange}
            required
          />

          <label>State *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <label>PIN Code *</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />

          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Email address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="order-details">
        <h2>Your order</h2>
            {loading ? (
                <p>Loading...</p>
            ) : cartItems.length === 0 ? (
                <p>No items in the cart.</p>
            ) : (
                <div className="order-summary">
                    {cartItems.map((item) => (
                        <div key={item.id} className="order-item">
                            <div>
                                {item.productName} × {item.quantity}
                            </div>
                            <div>₹{item.productPrice * item.quantity}</div>
                        </div>
                    ))}
                    <div className="order-shipping">
                        <div>Shipping</div>
                        <div>Free shipping</div>
                    </div>
                    <div className="order-total">
                        <div>Total</div>
                        <div>₹{totalAmount}</div>
                    </div>
                </div>
            )}

          
          <div className="payment-page">
            <h2>Payment Options</h2>
            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={handlePaymentMethodChange}
                />
                Card Payment
                <img src={cardimg} alt="Card Payment" />
              </label>

              <label>
                <input
                  type="radio"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={handlePaymentMethodChange}
                />
                Razorpay Payment
                <img src={razorpayimg} alt="Razorpay Payment" />
              </label>

              <label>
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentMethodChange}
                />
                Cash on Delivery
                <img src={cod} alt="COD" />
              </label>
            </div>
            {paymentMethod === "card" && (
              <div className="card-details">
                <h2>Credit/Debit Card Details</h2>
                <label>
                  Card Number:
                  <input type="text" name="cardNumber" required />
                </label>
                <label>
                  Expiry Date:
                  <input type="text" name="expiryDate" required />
                </label>
                <label>
                  CVV:
                  <input type="text" name="cvv" required />
                </label>
              </div>
            )}
            <button type="submit" className="submit-btn">
              Place Order
            </button>
          </div>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
      <p>{getMessage()}</p>
    </form>
  );
};

export default Buy;
