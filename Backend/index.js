// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const db = require('./config/db');
const Product = require('./Module/Product');
const Cart = require('./Module/Cart');
const BillingDetails = require('./Module/Billing');
const nodemailer = require('nodemailer');
const Order = require('./Module/Order');
const Admin = require('./Module/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const Contact = require('./Module/Contact');
const User = require('./Module/User');
const app = express();

// Use cors middleware
app.use(cors());

// Use bodyParser middleware
app.use(bodyParser.json());

// Route to get all products
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await User.findOne({ where: { email } });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: admin.id }, 'BANNU9', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error });
    }
  });

app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single product by ID
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to create a new product
app.post('/products', async (req, res) => {
    const { name, description, price, category, stock, imageUrl } = req.body;
    try {
        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a product by ID
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock, imageUrl } = req.body;
    try {
        const [updated] = await Product.update(
            { name, description, price, category, stock, imageUrl },
            { where: { id } }
        );
        if (updated) {
            const updatedProduct = await Product.findByPk(id);
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a product by ID
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Product.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Product deleted successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add a product to the cart
app.post('/add', async (req, res) => {
    const { productId = 1, quantity, productName, productPrice } = req.body;
    try {
        const [cartItem, created] = await Cart.findOrCreate({
            where: { productId },
            defaults: { quantity, productName, productPrice },
        });

        if (!created) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }

        res.status(200).json({ message: 'Product added to cart successfully', cartItem });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Error adding to cart' });
    }
});

// Get all cart items
app.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.findAll();
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart items' });
    }
});

// Delete a cart item by productId
app.delete('/cart/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await Cart.destroy({ where: { productId } });

        if (result === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ message: 'Failed to delete cart item' });
    }
});

// Route to save billing details
app.post('/api/billing', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            country,
            streetAddress,
            townCity,
            state,
            pinCode,
            phone,
            email,
            paymentMethod,
            transactionId,
            paymentStatus,
            amount
        } = req.body;

        const billingDetails = await BillingDetails.create({
            firstName,
            lastName,
            country,
            streetAddress,
            townCity,
            state,
            pinCode,
            phone,
            email,
            paymentMethod,
            transactionId,
            paymentStatus,
            amount
        });

        // Send email after successful billing
        // Add email sending code here if needed

        res.status(201).json(billingDetails);
    } catch (error) {
        console.error('Error saving billing details:', error);
        res.status(500).json({ error: 'Failed to save billing details' });
    }
});

// Get all billing details
app.get('/api/billings', async (req, res) => {
    try {
        const billingDetails = await BillingDetails.findAll();
        res.status(200).json(billingDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching billing details' });
    }
});
app.put('/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
      const order = await BillingDetails.findByPk(id);

      if (!order) {
          return res.status(404).json({ message: 'Order not found' });
      }

      // Update the order status
      order.paymentStatus = status;
      await order.save();

      res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Failed to update order status' });
  }
});

// Route to get summary data
app.get('/api/summary', async (req, res) => {
    try {
        // Calculate total orders and total revenue
        const summaryQuery = `
            SELECT 
                COUNT(*) AS totalOrders,
                SUM(amount) AS totalRevenue
            FROM BillingDetails
        `;
        const [results] = await db.query(summaryQuery);
        res.status(200).json(results[0]);
    } catch (error) {
        console.error('Error fetching summary data:', error);
        res.status(500).json({ error: 'Failed to fetch summary data' });
    }
});

// Route to contact support

app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        // Insert form data into the database
        const newContact = await Contact.create({ name, email, phone, message });

        res.status(201).json(newContact);
        // Sending email using Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',  // You can change it to your mail service provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,  // Send confirmation email to the user
            subject: 'Thank you for contacting us!',
            text: `Hi ${name},\n\nThank you for your message:\n\n${message}\n\nWe will get back to you soon!`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send confirmation email.' });
            }

            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Message sent successfully and saved to the database.' });
        });
    } catch (error) {
        console.error('Error saving to the database:', error);
        return res.status(500).json({ message: 'Failed to save message to the database.' });
    }
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
