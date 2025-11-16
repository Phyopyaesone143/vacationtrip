import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        // <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#323232] text-[#d9d9d9] flex flex-col items-center gap-5 px-[8vw] py-5 pt-20 mt-24 -mb-24">
        //     <div className="w-full grid grid-cols-[2fr_1fr_1fr] gap-20 md:grid md:grid-cols-[2fr_1fr_1fr] md:gap-20">
        //         <div className="flex flex-col items-start gap-[20px]">
        //             <img src={assets.logo} alt="" />
        //             <p className="text-justify">
        //                 Welcome to <span className="text-cyan-700">Tourism.</span>, where every journey begins with curiosity and ends with unforgettable memories. 
        //                 We are a passionate team of travel enthusiasts, storytellers, and local explorers dedicated to showcasing the beauty, culture, and hidden treasures of our world.
        //             </p>
        //             <div className="flex gap-6">
        //                 <img src={assets.facebook} alt="" className="w-[40px] mr-[15px]" />
        //                 <img src={assets.twitter} alt="" className="w-[40px] mr-[15px]" />
        //                 <img src={assets.whatsapp} alt="" className="w-[40px] mr-[15px]" />
        //             </div>
        //         </div>

        //         <div className="flex flex-col items-start gap-[20px]">
        //             <h2 className="text-white text-[1.5vw] font-black">COMPANY</h2>
        //             <ul className="text-left">
        //                 <li className="list-none mb-[10px] cursor-pointer">Home</li>
        //                 <li className="list-none mb-[10px] cursor-pointer">About Us</li>
        //                 <li className="list-none mb-[10px] cursor-pointer">Trip Booking</li>
        //                 <li className="list-none mb-[10px] cursor-pointer">Privacy Policy</li>
        //             </ul>
        //         </div>

        //         <div className="flex flex-col items-start gap-[20px]">
        //             <h2 className="text-white text-[1.5vw] font-black">GET IN TOUCH</h2>
        //             <ul className="text-left">
        //                 <li className="list-none mb-[10px] cursor-pointer">+959-428-014-794</li>
        //                 <li className="list-none mb-[10px] cursor-pointer">phyopyezonwin@gmail.com</li>
        //             </ul>
        //         </div>
        //     </div>

        //     <hr className="w-full h-[2px] my-5 bg-gray-600 border-none" />
        //     <p className='text-center md:text-left'>Copyright 2025 © Tourism.com - All Right Reserved. studied by CyberIce</p>
        // </div>
        <div
      id="contact-us"
      className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#323232] text-[#d9d9d9] flex flex-col items-center gap-5 px-[8vw] py-5 pt-20 mt-24 -mb-24"
    >
      <div
        className="
          w-full grid grid-cols-[2fr_1fr_1fr] gap-20
          max-[750px]:flex max-[750px]:flex-col max-[750px]:gap-[35px]
        "
      >
        {/* left */}
        <div className="flex flex-col items-start gap-5">
          <img src={assets.logo} alt="brand" />
          <p className="text-justify indent-8">
            Welcome to <span className="text-cyan-700">Tourism.</span>, where every journey begins with curiosity and ends with unforgettable memories. 
            We are a passionate team of travel enthusiasts, storytellers, and local explorers dedicated to showcasing the beauty, culture, and hidden treasures of our world.
          </p>
          <div className="flex items-center">
            <img src={assets.facebook} alt="facebook" className="w-10 mr-[15px]" />
            <img src={assets.twitter} alt="twitter" className="w-10 mr-[15px]" />
            <img src={assets.whatsapp} alt="linkedin" className="w-10 mr-[15px]" />
          </div>
        </div>

        {/* center */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white text-lg font-extrabold">COMPANY</h2>
          <ul className="text-left">
            <li className="list-none mb-[10px] cursor-pointer">Home</li>
            <li className="list-none mb-[10px] cursor-pointer">About us</li>
            <li className="list-none mb-[10px] cursor-pointer">Trip Booking</li>
            <li className="list-none mb-[10px] cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        {/* right */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white text-lg font-extrabold">GET IN TOUCH</h2>
          <ul className="text-left">
            <li className="list-none mb-[10px] cursor-pointer">+959-428-014-794</li>
            <li className="list-none mb-[10px] cursor-pointer">phyopyezonwin@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className="w-full h-[2px] my-5 bg-gray-500 border-0" />

      <p className="text-center text-[20px] max-[770px]:text-[14px]">
        Copyright 2025 © Tourism.com - All Right Reserved. studied by cyberice
      </p>
    </div>
    )
}

export default Footer
