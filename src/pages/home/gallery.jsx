import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const [packages, setPackages] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Replace with your backend URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.get(`${backendUrl}/api/packages`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });
        console.log(response);
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages", error);
      }
    };

    fetchPackages();
  }, [backendUrl]);

  const handleItemClick = (item) => {
    navigate(`/package/${item.id}`, {
      state: { packageDetails: item }, // Passing package details to the next page
    });
  };

  return (
    <div className="min-h-screen bg-primary text-secondary py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {packages.map((item) => (
          <div
            key={item._id}
            onClick={() => handleItemClick(item)}
            className="cursor-pointer bg-white text-primary rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={item.image || "/default-package-image.jpg"} // Use a default image if none exists
              alt={item.name}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <p className="text-xl font-semibold text-gray-600">{item.name}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
