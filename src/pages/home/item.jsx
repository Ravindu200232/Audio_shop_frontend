import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import Footer from "../../components/footer";

export default function Item() {
  const [state, setState] = useState("loading"); // loading, success, error
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);

  useEffect(() => {
    if (state === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          setItems(res.data);
          setFilteredItems(res.data);
          setState("success");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || "An error occurred");
          setState("error");
        });
    }
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterItems(value, categoryFilters);
  };

  // Handle Checkbox Filters
  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    const updatedFilters = checked
      ? [...categoryFilters, value]
      : categoryFilters.filter((category) => category !== value);

    setCategoryFilters(updatedFilters);
    filterItems(searchTerm, updatedFilters);
  };

  // Filter Logic
  const filterItems = (searchValue, selectedCategories) => {
    let filtered = items;

    if (searchValue) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    setFilteredItems(filtered);
  };

  return (
    <div className="w-full min-h-screen  mt-[20px] bg-primary text-white">
      {/* Search & Filter Section */}
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:w-[40%] p-2 border border-gray-300 rounded-md outline-none"
          />

          {/* Filter Options */}
          <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="Electronics"
                onChange={handleFilterChange}
                className="accent-green-500"
              />
              Electronics
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="Clothing"
                onChange={handleFilterChange}
                className="accent-green-500"
              />
              Clothing
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                value="Accessories"
                onChange={handleFilterChange}
                className="accent-green-500"
              />
              Accessories
            </label>
          </div>
        </div>
      </div>

      {/* Product Listing */}
      <div className="w-full max-w-6xl mx-auto flex flex-wrap justify-center gap-4 pb-10">
        {state === "loading" && (
          <div className="w-full flex justify-center items-center">
            <div className="w-[50px] h-[50px] border-4 border-t-green-500 animate-spin rounded-full"></div>
          </div>
        )}

        {state === "success" && filteredItems.length === 0 && (
          <p className="text-gray-600 text-center w-full">No items found.</p>
        )}

        {state === "success" &&
          filteredItems.map((item) => (
            <div
              key={item.key}
            >
              <ProductCard item={item} />
            </div>
          ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
