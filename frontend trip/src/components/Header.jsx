import React from 'react'
import { assets } from '../assets/assets'
// import './index.css'

const Header = () => {
    return (
        <div className='mt-2 relative inline-block'>
            <img src={assets.wallpaper02} alt="" className='border-4 border-amber-50 rounded-4xl' />
            <div className="absolute flex flex-col top-[50%] right-[6vw]">
                <h2 className="text-white bg-amber-800 bg-gradient-to-bl font-bold drop-shadow-lg text-xl md:text-3xl md:mt-[3rem] lg:text-6xl lg:-ms-3">
                    Start Journey
                </h2 >
                <p className="text-white mt-2 font-bold drop-shadow-lg text-[10px] md:text-[16px] md:mt-[0.5rem] lg:text-2xl lg:mt-4 lg:-ms-2">
                    အိမ်မက်တွေနှင့်အတူ ရွက်လွှင့်ကြစို့
                </p>
            </div>
        </div>

    )
}

export default Header