import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, LoadCart } from "../../utils/card";
import toast from "react-hot-toast";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Footer from "../../components/footer";

export default function ProductOverview() {
  const { key } = useParams();

  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingStatus("Loaded");
      })
      .catch((err) => {
        console.error(err);
        setLoadingStatus("error");
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/${key}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  const handleAddReview = async () => {
    setRefresh(false);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to submit a review.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        {
          productId: key,
          rating: userRating,
          comment: userComment,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setReviews((prevReviews) => [...prevReviews, response.data]);
      setUserRating(0);
      setUserComment("");
      toast.success("Review submitted successfully.");
      setRefresh(true);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-primary text-white">
      {loadingStatus === "loading" && (
        <div className="border-b-4 w-[100px] h-[100px] my-4 border-b-accent rounded-full animate-spin"></div>
      )}

      {loadingStatus === "Loaded" && (
        <div className="w-full max-w-4xl p-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4">
              <ImageSlider images={product.Image} />
            </div>
            <div className="md:w-1/2 p-4">
              <h1 className="text-3xl font-bold text-accent mb-4">
                {product.name}
              </h1>
              <p className="text-xl mb-2">Price: Rs.{product.price}</p>
              <p className="text-xl mb-2">Category: {product.category}</p>
              <p className="text-xl mb-2">Dimensions: {product.dimensions}</p>
              <p className="text-xl mb-2">Description: {product.description}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  addToCart(product.key, 1);
                  toast.success("Added to Cart");
                  console.log(LoadCart());
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-16 p-4 bg-white text-black rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

            {/* Existing Reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border p-4 rounded shadow bg-white text-black"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={review.profilePicture}
                      alt={review.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(review.data).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={review.rating}
                    readOnly
                  />
                  <p className="mt-2">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Review */}
            <div className="mt-6 border-t pt-6 text-black">
              <h3 className="text-xl font-bold mb-2">Write a Review</h3>
              <div className="mb-4">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={userRating}
                  onChange={setUserRating}
                />
              </div>
              <textarea
                className="w-full border p-2 rounded mb-4 text-black"
                rows="4"
                placeholder="Write your comment here..."
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              ></textarea>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAddReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {loadingStatus === "error" && (
        <div className="text-red-500 text-xl">
          Failed to load product details. Please try again later.
        </div>
      )}
      <Footer />
    </div>
  );
}
