import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'


const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("menu");
  // const { searchQuery, setSearchQuery } = useContext(StoreContext);
  // const [showSearch, setShowSearch] = useState(false);

  return (
    <div className='flex items-center justify-between w-full h-[24vw, 24px]'>
      <img src={assets.logo} alt="" className='w-[150px] max-[900px]:w-[120px]' />
      <ul className="hidden md:flex capitalize list-none gap-5 text-[#49557e] text-[18px] max-[900px]:gap-[15px] max-[900px]:text-[16px]">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <HashLink smooth to='/#trip' onClick={() => setMenu("menu")} className={menu === "trip" ? "active" : ""}>trip</HashLink>
        <HashLink smooth to='/#contact-us' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</HashLink>
      </ul>
      <div className='flex items-center gap-3 md:gap-4'>
        {/* <img src={assets.search} alt="" onClick={() => setShowSearch(!showSearch)} className='w-[4vw] md:w-[2.5vw]' /> */}

        
        {/* {showSearch && (
          <input
            type="text"
            placeholder="Search trip..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 outline-none text-sm"
          />
        )} */}

        <div className='relative'>
          <Link to='/cart'><img src={assets.noti} alt="" className='w-[4.5vw] md:w-[2.5vw]' /></Link>
          <div className="absolute p-0.5 min-w-[4px] md:min-w-[10px] min-h-[4px] md:min-h-[10px] bg-[tomato] rounded-[5px] -top-4 md:-top-6 -right-2 text-amber-50 text-[12px] md:text-[16px]">0</div>
        </div>
        <button onClick={() => setShowLogin(true)} className="bg-transparent text-[#49557e] text-[16px] border border-[tomato] rounded-full px-[20px] py-[9px] cursor-pointer hover:text-blue-700 transition-all duration-300 max-[900px]:px-[16px] max-[900px]:py-[7px] max-[900px]:text-[13px]">Login</button>
      </div>
    </div>
  )
}

export default Navbar