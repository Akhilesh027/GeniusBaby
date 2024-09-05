import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Product from "./components/Product/Product";
import ProductPage from "./components/Product/Product";
import Buy from "./components/Billing/Billing";
import ContactForm from "./components/Contact/Contact";
import AdminDashboard from './components/admin/Dashboard'
import ViewBillings from './components/admin/Billing'
import ViewOrders from './components/admin/Order'
import ManageProducts from './components/admin/ManageProducts'
import AdminRegister from "./components/admin/Auth/Registration";
import Loginpage from "./components/admin/Auth/login";
import Registration from "./components/admin/Auth/Registration";


const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Loginpage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/billings" element={<ViewBillings />} />
      <Route path="/admin/orders" element={<ViewOrders />} />
      <Route path="/admin/products" element={<ManageProducts />} />
      <Route path="/contact" element={<ContactForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/billing" element={<Buy />} />
    </Routes>
  );
};

export default Allroutes;
