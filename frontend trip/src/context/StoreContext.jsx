import React, { createContext, useState, useMemo, useEffect } from 'react';
// import { place_v } from '../assets/assets';
import { vacationList } from '../utils/apiService';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const [vacations,setVacations] = useState([])
  
    useEffect(()=>{
      vacationList()
      .then((response)=>setVacations(response.data.vacations))
    })

  const filteredTrips = useMemo(() => {
    if (!searchQuery.trim()) return vacations;
    const query = searchQuery.toLowerCase();
    return vacations.filter(trip => trip.place.trip_name.toLowerCase().includes(query));
  }, [searchQuery]);

  const addToCart = (item, opts = {}) => {
    const { id, price, image, place, description } = item;
    const duration = Number(opts.duration ?? 1);
    const startdate = opts.startdate ?? "";
    setCart(prev => {
      const existing = prev[id] || { qty: 0, duration: 0, startdate:"", place, image, price, description };
      return {
        ...prev,
        [id]: {
          ...existing,
          qty: existing.qty + 1,
          duration: duration || existing.duration || 1,
          startdate: startdate || existing.startdate,
          place, price, description,
        },
      };
    });
  };

  const removeFromCart = (id) => {
  setCart(prev => {
    const cur = prev[id];
    if (!cur) return prev;
    const nextQty = (cur.qty || 1) - 1;
    if (nextQty <= 0) {
      const { [id]: _, ...rest } = prev;
      return rest;
    }
    return { ...prev, [id]: { ...cur, qty: nextQty } };
  });
};


  const updateDuration = (id, duration) => {
    setCart(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], duration: Number(duration) || 1 } } : prev));
  };

  const updateDate = (id, selectedDate) => {
    setCart(prev => (prev[id] ? { ...prev, [id]: { ...prev[id], startdate: selectedDate } } : prev));
  };

  const getCartTotal = () =>
    Object.values(cart).reduce((sum, it) => sum + (it.price * (it.duration || 1) * (it.qty || 1)), 0);

  
  const contextValue = useMemo(() => ({
    vacations,
    cart,
    filteredTrips,
    searchQuery,
    setSearchQuery,
    addToCart,
    removeFromCart,
    updateDuration,
    updateDate,
    getCartTotal,
  }), [cart, filteredTrips, searchQuery]);  // <- FIXED

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
