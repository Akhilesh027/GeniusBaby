// src/pages/ViewBillings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewBillings.css'; // Import your CSS file

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        const fetchBillings = async () => {
            try {
                const response = await axios.get('https://geniusbaby.onrender.com/api/billings');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching billings', error);
            }
        };

        fetchBillings();
    }, []);

    const handleStatusChange = (orderId, status) => {
        setSelectedStatus((prevStatus) => ({
            ...prevStatus,
            [orderId]: status,
        }));
    };

    const updateOrderStatus = async (orderId) => {
        try {
            const status = selectedStatus[orderId];
            if (status) {
                await axios.put(`https://geniusbaby.onrender.com/orders/${orderId}/status`, { status });
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === orderId ? { ...order, paymentStatus: status } : order
                    )
                );
                alert(`Order ${orderId} status updated to ${status}`);
            }
        } catch (error) {
            console.error('Error updating order status', error);
        }
    };

    return (
        <>
            <div className="dashboard-section">
                <h2>Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Country</th>
                            <th>Street Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Pin Code</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Payment Method</th>
                            <th>Order Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.firstName}</td>
                                <td>{order.country}</td>
                                <td>{order.streetAddress}</td>
                                <td>{order.townCity}</td>
                                <td>{order.state}</td>
                                <td>{order.pinCode}</td>
                                <td>{order.phone}</td>
                                <td>{order.email}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.paymentStatus}</td>
                                <td>₹{order.amount}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Order;
