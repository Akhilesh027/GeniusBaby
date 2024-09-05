import React, { useState } from 'react';
import './ContactForm.css';
import axios from 'axios';
// Import Font Awesome for icons, if not already added in your project
// Make sure to install `react-icons` package if you want to use it
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://geniusbaby.onrender.com/api/contact', formData);  // Use Axios to post data
            if (response.status === 200) {
                alert('Message sent successfully!');
                setFormData({ name: '', email: '', phone: '', message: '' });  // Reset form
            } else {
                alert('Failed to send message.');
            }
        } catch (error) {
            console.error('There was an error sending the message!', error);
            alert('An error occurred while sending the message.');
        }
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <div className="contact-info">
                <div className="contact-form">
                    <h2>Send Us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <button type="submit">Send Message</button>
                    </form>
                </div>
                <div className="contact-details">
                    <h2>Contact Information</h2>
                    <p><i className="fas fa-map-marker-alt"></i>Address: Patel's Green Front Apartments, Yapral, Secunderabad-500087, Telangana, India</p>
                    <p><i className="fas fa-phone-alt"></i>+91 9885647711</p>
                    <p><i className="fas fa-envelope"></i> <a href="mailto:support@geniusbaby.com" className="contact-link">info@geniusbaby.com</a></p>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
