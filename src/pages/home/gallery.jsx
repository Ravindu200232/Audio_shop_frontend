import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";

export default function Gallery() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/packages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [backendUrl]);

  const handleItemClick = (item) => {
    navigate(`/package/${item.id}`, {
      state: { packageDetails: item },
    });
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gray-200 h-[300px] w-full" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="min-h-screen bg-primary text-secondary py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
            : packages.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleItemClick(item)}
                  className="cursor-pointer bg-white text-primary rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <img
                    src={item.image || "/default-package-image.jpg"}
                    alt={item.name}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="p-4">
                    <p className="text-xl font-semibold text-gray-600">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
