import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";

export default function ProductOverview() {
  const params = useParams();
  const key = params.key;

  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingStatus("Loaded");
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        setLoadingStatus("error");
      });
  }, []);
  console.log(params);
  return (
    <div className="w-full h-full justify-center flex">
      {loadingStatus == "loading" && (
        <div className="border-b-4 w-[100px] h-[100px] my-4 border-b-accent rounded-full animate-spin"></div>
      )}

      {loadingStatus == "Loaded" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[49%]  h-full p-4">
            <ImageSlider images={product.Image} />
          </div>
          <div className="w-[49%] h-full flex flex-col p-4">
            <h1 className="text-3xl font-bold text-accent mb-4">
              {product.name}
            </h1>
            <p className="text-xl mb-2">Price: ${product.price}</p>
            <p className="text-xl mb-2">Category: {product.category}</p>
            <p className="text-xl mb-2">Dimensions: {product.dimensions}</p>
            <p className="text-xl mb-2">Description: {product.description}</p>
          </div>
        </div>
      )}

      {loadingStatus == "error" && (
        <div className="text-red-500 text-xl">
          Failed to load product details. Please try again later.
        </div>
      )}
    </div>
  );
}
