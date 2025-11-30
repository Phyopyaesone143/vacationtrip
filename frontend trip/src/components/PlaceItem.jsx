import React, { useContext, useEffect, useState } from 'react'
import Vacation from './Vacation'
import { StoreContext } from '../context/StoreContext'
// import { place_v } from '../assets/assets'
import { vacationList } from '../utils/apiService'


const PlaceItem = ({place}) => {

// const { place_V } = useContext(StoreContext)

const [vacations,setVacations] = useState([])

  useEffect(()=>{
    vacationList()
    .then((response)=>setVacations(response.data.vacations))
  }, [])

  return (
    <div className='mt-[30px]' id='food-display'>
        
        <div className="grid  mt-[30px] gap-[30px] row-gap-[50px]">
            {vacations.map((item,index)=>{
                if(place===item.place){
                    return <Vacation key={item.id} id={item.id} place={item.place} image={item.image} description={item.description} price={item.price} duration={item.duration} />
                }
                
            })}
        </div>
    </div>
  )
}

export default PlaceItem