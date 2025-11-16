import React, { useState } from 'react'
import Header from '../components/Header'
import Explore from '../components/Explore'
import PlaceItem from '../components/PlaceItem'

const Home = () => {

  const [place,setPlace] = useState("ALL");

  return (
    <div>
        <Header/>
        <Explore place={place} setPlace={setPlace}/>
        <PlaceItem place={place}/>
    </div>
  )
}

export default Home