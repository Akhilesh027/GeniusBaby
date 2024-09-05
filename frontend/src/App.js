import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Allroutes from './Allroutes'
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Allroutes/>
    </Router>
  )
}

export default App
