import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './Dashboard.css'; // Import your CSS file

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [billings, setBillings] = useState([]);
    const [summary, setSummary] = useState({ totalOrders: 0, totalRevenue: 0 });

    useEffect(() => {
        // Fetch products, orders, billings, and summary data
        const fetchData = async () => {
            try {
                const productsResponse = await axios.get('http://localhost:5000/products');
                setProducts(productsResponse.data);

                const ordersResponse = await axios.get('http://localhost:5000/api/billings');
                setOrders(ordersResponse.data);

                const billingsResponse = await axios.get('http://localhost:5000/api/billings');
                setBillings(billingsResponse.data);

                const summaryResponse = await axios.get('http://localhost:5000/api/summary');
                setSummary(summaryResponse.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    // Prepare data for charts
    const chartData = {
        labels: products.map(p => p.name),
        datasets: [
            {
                label: 'Product Prices',
                data: products.map(p => p.price),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ]
    };

    const revenueData = {
        labels: billings.map(o => new Date(o.createdAt).toLocaleDateString()),
        datasets: [
            {
                label: 'Revenue Over Time',
                data: orders.map(o => o.amount),
                fill: false,
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.1,
            }
        ]
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <nav>
                <Link to="/admin/products">Manage Products</Link>
                <Link to="/admin/orders">View Orders</Link>
                <Link to="/admin/billings">manage orders</Link>
            </nav>

            <section className="summary-container">
                <div className="summary-box summary-orders">
                    <h3>Total Orders</h3>
                    <p>{summary.totalOrders}</p>
                </div>
                <div className="summary-box summary-revenue">
                    <h3>Total Revenue</h3>
                    <p>₹{summary.totalRevenue.toFixed(2)}</p>
                </div>
            </section>

            {/* <section className="chart-container">
                <h2>Product Prices</h2>
                <Bar data={chartData} options={{ responsive: true }} />
            </section> */}

            <section className="chart-container">
                <h2>Revenue Over Time</h2>
                <Line data={revenueData} options={{ responsive: true }} />
            </section>

            <section>
                <h2>Manage Products</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>₹{product.price}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                    {/* Add edit functionality */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

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
                            <th>Payment Status</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
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
                                <td>{order.amount}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <section>
                <h2>View Billings</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billings.map(billing => (
                            <tr key={billing.id}>
                                <td>{billing.id}</td>
                                <td>{billing.firstName}</td>
                                <td>{billing.lastName}</td>
                                <td>{billing.email}</td>
                                <td>₹{billing.amount}</td>
                                <td>{billing.paymentMethod}</td>
                                <td>{billing.paymentStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AdminDashboard;
