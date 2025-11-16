import React, { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'
import { tripList } from '../utils/apiService'
import host from '../utils/host'

const Explore = ({place,setPlace}) => {
  const [trips,setTrips] = useState([])

  useEffect(()=>{
    tripList()
    .then((response)=>setTrips(response.data.trips))
  })
  return (
    <div className='text-left mt-3' id='trip'>
        <h1 className='text-blue-700 font-extrabold text-xl lg:text-3xl'>ခရီးစဉ်များကို လေ့လာရန်</h1>
        <p className='mt-4 text-justify text-amber-700 text-[12px] indent-8 md:indent-16 md:text-[14px] lg:text-[20px]'>စိမ်းလန်းနေတဲ့ တောင်တန်းတွေထက်ဝယ် တိမ်လွှာတွေကို ငေးမောကြမလား။ ဖြူဖွေးနေတဲ့ ရေလှိုင်းတွေကြား ပင်လယ်ပြာခရီးမှာ အပေါင်းအဖော်များနဲ့ ပျော်ကြမလား။ တန်ခိုးကြီးဘုရားတွေကို စုံလင်အောင် ဖူးမလား။ မိသားစု စိတ်ချမ်းသာ ကိုယ်ကျန်းမာ အပန်းဖြေခရီးလေးထွက်ကြမလား။ မိမိသွားလိုသော ဒေသများကို ရွေးချယ်ကြည့်ကြရအောင်။</p>
        <div className='flex justify-between whitespace-nowrap items-center gap-[30px] text-center my-[20px] overflow-x-scroll'>
           {trips.map((item, index)=>{
            return(
                <HashLink smooth to='/#vacation' onClick={()=>setPlace(prev=>prev===item.trip_name? "All":item.trip_name)} key={index}>
                    <img src={`${host}${item.image}`} alt="" key={index} className='w-[7.5vw] min-w-[80px] h-[3.5vw] min-h-[80px] cursor-pointer rounded-tr-3xl rounded-tl-none rounded-bl-3xl rounded-br-3xl object-cover transition duration-200' />
                    <p>{item.trip_name}</p>
                </HashLink>
            )
           })} 
        </div>
    </div>
  )
}

export default Explore