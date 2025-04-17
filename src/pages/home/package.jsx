import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/card";

export default function PackageDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.packageDetails?._id;

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, 1);
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [hours, setHours] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPackage = async () => {
      if (!id) return setLoading(false);

      try {
        const response = await axios.get(`${backendUrl}/api/packages/${id}`);
        setPackageDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch package:", err);
        toast.error("Failed to load package details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  useEffect(() => {
    if (packageDetails && hours > 0) {
      const basePrice = packageDetails.basePrice || 0;
      setTotal(basePrice * hours);
    }
  }, [packageDetails, hours]);

  const handleBooking = async () => {
    if (!startDate || !endDate || total <= 0) {
      alert("Please select valid dates and calculate the total price.");
      return;
    }

    // Include the package inclusions in the order items
    const orderItems = (packageDetails?.orderItem || []).map((item) => ({
      key: item.product?.key,
      qty: item.quantity || 1,
      // Include additional data from the package
      inclusions: packageDetails.inclusions || [], // Add inclusions data to each item
    }));

    // Concatenate all package details for the description
    const description = `
      Package Name: ${packageDetails.name}
      Description: ${packageDetails.description || "No description provided."}
      Inclusions: ${
        packageDetails.inclusions?.join(", ") || "No inclusions listed"
      }
      Base Price: $${packageDetails.basePrice || "N/A"}
    `;

    const orderData = {
      orderItem: orderItems,
      startingDate: startDate,
      hours,
      endingDate: endDate,
      totalAmount: total,
      days: calculateDays(),
      description: description, // Adding the new concatenated description field
    };

    console.log("Order Data:", orderData);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/orders/pkg`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Booking successful!");
        navigate("/orders");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("There was an error with your booking.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading package...</p>;
  if (!packageDetails)
    return <p className="text-center mt-10 text-red-500">Package not found.</p>;

  return (
    <div className="min-h-screen bg-primary text-primary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <img
            src={packageDetails.image || "/default.jpg"}
            alt={packageDetails.name}
            className="w-full h-[400px] object-cover rounded-lg"
          />

          <div className="mt-4">
            <h2 className="text-3xl font-bold text-primary">
              {packageDetails.name}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {packageDetails.description || "No description provided."}
            </p>

            {packageDetails.inclusions?.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-primary">
                  Package Inclusions:
                </h3>
                <ul className="mt-4 list-disc pl-5 text-primary">
                  {packageDetails.inclusions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-6 text-sm text-red-500">
                No inclusions listed for this package.
              </p>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-primary">
                  Start Date:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(formatDate(new Date(e.target.value)))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-primary">
                  End Date:
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(formatDate(new Date(e.target.value)))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-primary">
                  Hours:
                </label>
                <input
                  type="number"
                  min="1"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value) || 1)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-primary">
                Total Price:{" "}
                <span className="text-primary font-bold">
                  ${total.toFixed(2)}
                </span>
              </h4>
            </div>

            <div className="mt-6">
              <button
                onClick={handleBooking}
                className="bg-accent text-white py-2 px-6 rounded-lg hover:bg-accent-dark transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
