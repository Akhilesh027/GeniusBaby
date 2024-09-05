// src/pages/ManageProducts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageProducts.css'; // Import your CSS file

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productData, setProductData] = useState({ name: '', description: '', price: '', stock: '', imageUrl: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product.id);
        setProductData(product);
    };

    const handleSave = async () => {
        try {
            if (editingProduct) {
                await axios.put(`http://localhost:5000/products/${editingProduct}`, productData);
                setEditingProduct(null);
                setProductData({ name: '', description: '', price: '', stock: '', imageUrl: '' });
                // Refresh products list
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            }
        } catch (error) {
            console.error('Error saving product', error);
        }
    };

    return (
        <div className="manage-products">
            <h1>Manage Products</h1>
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
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={async () => {
                                    await axios.delete(`http://localhost:5000/products/${product.id}`);
                                    setProducts(products.filter(p => p.id !== product.id));
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingProduct && (
                <div className="edit-product">
                    <h2>Edit Product</h2>
                    <input
                        type="text"
                        value={productData.name}
                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        value={productData.description}
                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        placeholder="Description"
                    />
                    <input
                        type="number"
                        value={productData.price}
                        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                        placeholder="Price"
                    />
                    <input
                        type="number"
                        value={productData.stock}
                        onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                        placeholder="Stock"
                    />
                    <input
                        type="text"
                        value={productData.imageUrl}
                        onChange={(e) => setProductData({ ...productData, imageUrl: e.target.value })}
                        placeholder="Image URL"
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
