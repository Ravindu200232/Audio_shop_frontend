import { useEffect, useState } from "react";
import { formatDate, LoadCart } from "../../utils/card";
import BookingItem from "../../components/bookingitem";
import axios from "axios";
import toast from "react-hot-toast";

export function BookingPage() {
  const [cart, setCart] = useState(LoadCart());
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(
    formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000))
  );
  const [total, setTotal] = useState(0);

  function reloadCart() {
    setCart(LoadCart());
    calculateTotal();
   
  }

  function calculateTotal(){
    const cartInfo = LoadCart();
    cartInfo.startingDate = startDate;
    cartInfo.endingDate = endDate;
    cartInfo.days = calculateDays();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
      .then((res) => {
        console.log(res.data);
        setTotal(res.data.total)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(()=>{
    calculateTotal();
  },[startDate,endDate])

  function handleBookingCreation() {
    const cart = LoadCart();
    cart.startingDate = startDate;
    cart.endingDate = endDate;
    cart.days = calculateDays();

    const token = localStorage.getItem("token");
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("cart");
        toast.success("Booking Created");
        setCart(LoadCart());
      })
      .catch((err) => {
        console.log(err);
        toast.success("Booking Failed");
      });
  }

  // Calculate number of days
  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0); // Ensure no negative values
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-primary p-6">
      <h1 className="text-3xl font-bold text-accent mb-6">Booking Page</h1>

      {/* Date Inputs */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Start Date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(formatDate(new Date(e.target.value)))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <label className="block text-gray-700 font-semibold mt-4 mb-2">
          End Date:
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(formatDate(new Date(e.target.value)))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />

        <p className="mt-4 text-lg font-medium text-gray-700">
          Duration: <span className="text-accent">{calculateDays()} days</span>
        </p>
      </div>

      {/* Booking Items */}
      <div className="w-full max-w-3xl flex flex-col items-center space-y-4">
        {cart.orderItem.length > 0 ? (
          cart.orderItem.map((item) => (
            <div
              key={item.key}
              className="w-full   rounded-lg "
            >
              <BookingItem
                itemKey={item.key}
                qty={item.qty}
                refresh={reloadCart}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        )}
      </div>

      

      <div className="w-full flex justify-center mt-4 flex-col items-center">
        <p className="text-accent font-semibold mb-3">Total : {total.toFixed(2)}</p>
        <button
          className="bg-accent text-white px-4 py-2 rounded-md"
          onClick={handleBookingCreation}
        >
          Create Booking
        </button>
      </div>
    </div>
  );
}
