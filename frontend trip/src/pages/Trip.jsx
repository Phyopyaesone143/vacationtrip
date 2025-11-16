import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'

const Trip = () => {

    const {tirp} = useContext(StoreContext)

  return (
    <div>
        <div>
            <div>
                <h2>{trip.trip_name}</h2>
            </div>
        </div>
    </div>
  )
}

export default Trip