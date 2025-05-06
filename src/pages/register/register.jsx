import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload"; // Adjust path if needed

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(
    "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
  );
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await mediaUpload(file);
      setImage(uploadedUrl);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("Image upload failed.");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      image ==
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    ) {
      toast.success("Please upload profile picture");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        email,
        password,
        firstName,
        lastName,
        address,
        phone,
        image,
      });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.error || "Email Already Added");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="w-full h-screen flex justify-center items-center bg-picture">
        <div className="w-[400px] h-[700px] backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center relative">
          <span className="text-white text-3xl mt-24 mb-4">Register</span>

          {/* Profile Image */}
          <div
            className="cursor-pointer mb-4"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={image || "https://via.placeholder.com/100?text=Upload"}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full border-2 border-white"
            />
            <label className="text-white text-sm mt-2 cursor-pointer">
              Click to upload image
            </label>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Form Fields */}
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            required
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-3"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            type="text"
            required
            id="lastName"
            placeholder="Last Name"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-3"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <input
            type="email"
            required
            id="email"
            placeholder="Email"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-3"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            required
            id="password"
            placeholder="Password"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-3"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="text"
            required
            id="address"
            placeholder="Address"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-3"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
          <input
            type="text"
            required
            id="phone"
            placeholder="Phone"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-4"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />

          <button
            id="register"
            className="mt-4 w-[300px] h-[50px] bg-[#010750] text-xl text-white rounded-lg"
          >
            Register
          </button>

          <span className="text-white text-sm mt-4 mb-2">
            Already have an account?{" "}
            <span
              id="login"
              className="text-blue-400 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </span>
        </div>
      </div>
    </form>
  );
}
