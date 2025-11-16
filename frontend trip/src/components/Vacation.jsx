import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import host from '../utils/host';

const Vacation = ({ id, place, image, price, description, duration: initialDuration = 1 }) => {
  const { addToCart, updateDuration } = useContext(StoreContext);
  const [duration, setDuration] = useState(initialDuration);
  const [startdate, setStartdate] = useState("");

  // const [vacations,setVacations] = useState([])
  
  //   useEffect(()=>{
  //     vacationList()
  //     .then((response)=>setVacations(response.data.vacations))
  //   })

  const handleAdd = () => {
    console.log("Start Date:", startdate);
    addToCart({ id, place, image, price, description }, { duration, startdate});
  };

  const handleDurationChange = (e) => {
    const d = Number(e.target.value) || 1;
    setDuration(d);
    updateDuration(id, d); // ရှီရင် update လုပ်ရန်
  };

const handleDateChange = (e) => {
    const selectedDate = e.target.value || ""; 
    setStartdate(selectedDate); 
    updateDate(id, selectedDate); 
  };


  return (
    <form id="vacation" className="space-y-2">
      <div className="h-[50px] bg-gradient-to-b from-indigo-200 via-blue-100 to-yellow-300">
        <h2 className="text-blue-700 text-3xl font-bold p-1">သွားရောက်လည်ပတ်မည့် ခရီးစဉ်အကျဉ်း</h2>
      </div>

      <div className="flex gap-4">
        <img src={`${host}${image}`} alt={place} className="w-48 h-48 object-cover rounded" />
        <div className="flex-1">
          <p className="text-[30px] bg-blue-600 text-amber-300 p-1.5">{place}</p>
          <p className="text-justify indent-8 p-5">{description}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <div className="flex w-full">
          <p className="box w-1/2 border border-white bg-blue-200">Cost per day</p>
          <p className="box w-1/2 border border-white bg-blue-200">{price} kyats</p>
        </div>
        <div className="flex w-full items-center">
          <label className="box w-1/2 border border-white bg-blue-200">Duration</label>
          <div className="box w-1/2 border border-white bg-blue-200">
            <input
              type="number"
              min="1"
              value={duration}
              onChange={handleDurationChange}
              className="bg-blue-100 text-right w-16 mx-1"
            /> days
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-1">
        <div className="flex w-full">
          <label className="box w-1/2 border border-white bg-blue-200">Date</label>
          <div className="box w-1/2 border border-white bg-blue-200">
            <input
              type="date"
              
              value={startdate}
              onChange={handleDateChange}
              className="bg-blue-100 text-right w-16 mx-1"
            />
          </div>
        </div>
        <div className="flex w-full">
          <p className="box w-1/2 border border-white bg-blue-200">Total</p>
          <p className="box w-1/2 border border-white bg-blue-200">
            {price * duration} kyats
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Add to Book
      </button>
    </form>
  );
};

export default Vacation;
