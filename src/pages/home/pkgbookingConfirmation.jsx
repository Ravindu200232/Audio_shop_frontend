import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function PkgBookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();


  const booking = location.state.result;
  console.log(booking);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Booking data not found.
      </div>
    );
  }

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        amount: booking.totalAmount,
        bookingId: booking.orderId || null,
      },
    });
  };

  // Split the multiline description
  const descriptionLines = booking.description?.split("\n") || [];

  return (
    <div className="min-h-screen bg-primary text-primary p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-accent mb-6">
        Package Booking Confirmed
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl space-y-4">
        <div>
          <span className="font-bold text-lg text-primary">
            Package Description:
          </span>
          <div className="mt-2 space-y-1 text-gray-700 text-sm">
            {descriptionLines.map((line, index) => (
              <p
                key={index}
                className="pl-2 border-l-4 border-accent bg-gray-50 p-2 rounded"
              >
                {line.trim()}
              </p>
            ))}
          </div>
        </div>

        <p>
          <span className="font-bold">Start Date:</span> {booking.startingDate}
        </p>
        <p>
          <span className="font-bold">End Date:</span> {booking.endingDate}
        </p>
        <p>
          <span className="font-bold">Duration:</span> {booking.days} day(s)
        </p>
        
        <p>
          <span className="font-bold">Total Amount:</span> Rs.
          {booking.totalAmount.toFixed(2)}
        </p>

        <button
          onClick={handleProceedToPayment}
          className="mt-6 bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-dark transition"
        >
          Proceed to Payment
        </button>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 ml-40 bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-dark transition">
            Cancel
          </button>
      </div>
    </div>
  );
}
