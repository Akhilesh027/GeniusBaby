  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { FaShoppingCart, FaBars } from 'react-icons/fa';
  import logo from '../Images/logocard.png';
  import './Navbar.css';
  import Cart from '../Cart/Cart';

  const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [navbarClass, setNavbarClass] = useState('default');

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setNavbarClass('scrolled');
        } else {
          setNavbarClass('default');
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <>
        <div id="navbar" className={navbarClass}>
          <div className="box">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <div className={`links ${isMobileMenuOpen ? 'open' : ''}`}>
              <Link className='link' to="/" onClick={toggleMobileMenu}>Home</Link>
              <Link className='link' to="/about" onClick={toggleMobileMenu}>About</Link>
              <Link className='link' to="/product/1" onClick={toggleMobileMenu}>Product</Link>
              <Link className='link' to="/contact" onClick={toggleMobileMenu}>Contact</Link>
            </div>
            <div className="cart">
              <FaShoppingCart onClick={toggleSidebar} />
            </div>
            <div className="hamburger" onClick={toggleMobileMenu}>
              <FaBars />
            </div>
          </div>
        </div>

        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        
            <Cart onClose={closeSidebar} />
        
        </div>
      </>
    );
  };

  export default Navbar;
