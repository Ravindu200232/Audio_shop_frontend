import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="w-[300px] h-full rounded-2xl overflow-hidden shadow-lg bg-white p-4 m-4">
      <img
        className="w-full h-50 object-cover rounded-lg"
        src={item.Image[0]}
        alt={item.name}
      />
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
        <p className="text-sm text-gray-500">{item.category.toUpperCase()}</p>
        <p className="mt-2 text-gray-700 text-sm">{item.description}</p>
        <p className="mt-2 text-sm text-gray-600">
          Dimensions: {item.dimensions}
        </p>
        <p className="mt-2 text-lg font-bold text-green-600">
          ${item.price.toFixed(2)}
        </p>
        <p
          className={`mt-1 text-sm font-semibold ${
            item.availability ? "text-green-500" : "text-red-500"
          }`}
        >
          {item.availability ? "In Stock" : "Out of Stock"}
        </p>
        <div className="mt-4 ">
          <Link
            to={"/product/" + item.key}
            className="w-full px-4 py-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
