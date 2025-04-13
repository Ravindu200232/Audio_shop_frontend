import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="w-[200px] h-[320px] rounded-xl overflow-hidden shadow-md bg-primary  p-3">
      {/* Product Image */}
      <img
        className="w-full h-[150px] object-cover rounded-md"
        src={item.Image[0]}
        alt={item.name}
      />

      {/* Product Info */}
      <div className="mt-3">
        <h2 className="text-sm font-semibold text-white truncate">
          {item.name}
        </h2>
        <p className="text-xs text-white">{item.category.toUpperCase()}</p>

        <p className="mt-1 text-sm font-bold text-green-600">
          ${item.price.toFixed(2)}
        </p>

        <p
          className={`text-xs font-semibold ${
            item.availability ? "text-green-500" : "text-red-500"
          }`}
        >
          {item.availability ? "In Stock" : "Out of Stock"}
        </p>

        {/* View Details Button */}
        <div className="mt-3">
          <Link
            to={"/product/" + item.key}
            className="block text-center px-3 py-1 text-xs font-semibold text-black bg-accent rounded-md hover:bg-blue-700"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
