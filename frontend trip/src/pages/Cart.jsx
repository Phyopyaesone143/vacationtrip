import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import host from "../utils/host";

const Cart = () => {
  const { cart, removeFromCart, getCartTotal } = useContext(StoreContext);

  const cartItems = Object.values(cart || {});

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100">
        <h2 className="text-3xl font-bold text-indigo-600">📁 Your Booking List is Empty</h2>
        <p className="text-gray-600 mt-2">Browse trips and add them to your booking list.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🧳 Your Selected Trips
      </h1>

      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row bg-white shadow-md rounded-lg overflow-hidden border border-indigo-200"
          >
            <img
              src={`${host}${item.image}`}
              alt={item.place}
              className="w-full sm:w-48 h-48 object-cover"
            />

            <div className="flex-1 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-indigo-700">
                  {item.place}
                </h2>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 cursor-pointer">✕</button>
              </div>

              <p className="text-gray-600 text-sm mt-1">{item.description}</p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                <div className="bg-blue-100 rounded-md py-2">
                  <p className="font-semibold text-blue-700">Booking Date</p>
                  <p className="text-blue-600">{item.startdate}</p>
                </div>
                <div className="bg-blue-100 rounded-md py-2">
                  <p className="font-semibold text-blue-700">Cost per day</p>
                  <p className="text-blue-600">{item.price} Kyats</p>
                </div>
                <div className="bg-yellow-100 rounded-md py-2">
                  <p className="font-semibold text-yellow-700">Duration</p>
                  <p className="text-yellow-600">{item.duration} days</p>
                </div>
              </div>

              <p className="text-right text-blue-800 font-bold mt-3">
                Total: {item.price * item.duration} Kyats
              </p>
            </div>
          </div>
        ))}

        <div className="bg-indigo-100 p-4 rounded-lg shadow-md mt-6 text-center">
          <h2 className="text-2xl font-semibold text-indigo-800">
            💰 Grand Total: {getCartTotal()} Kyats
          </h2>
          <button className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
