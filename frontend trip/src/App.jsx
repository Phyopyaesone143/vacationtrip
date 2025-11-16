import React from 'react'
import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Trip from './pages/Trip'
import Cart from './pages/Cart'
import LoginPopup from './components/LoginPopup'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='w-[90%] mx-auto'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/trip' element={<Trip />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
