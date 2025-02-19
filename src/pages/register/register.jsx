import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
        email : email,
        password : password,
        firstName : firstName,
        lastName : lastName,
        address : address,
        phone : phone 
    }).then((res)=>{
        console.log(res)
        toast.success("Registration successful!");
        navigate("/login");
    }).catch((err)=>{
        console.log(err)
        toast.error(err?.response?.data?.error|| "An error occured ")
    })

    // Simulating form submission since backend integration is not required
   
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="w-full h-screen flex justify-center items-center bg-picture">
        <div className="w-[400px] h-[600px] backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center relative">
          <img
            src="/logo.png"
            className="w-[100px] h-[100px] object-cover top-2 absolute rounded-full"
            alt="Logo"
          />
          <span className="text-white text-3xl mb-6">Register</span>

          {/* First Name */}
          <input
            type="text"
            placeholder="First Name"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-4"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />

          {/* Last Name */}
          <input
            type="text"
            placeholder="Last Name"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-4"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-4"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-4"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-4"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone"
            className="w-[300px] h-[40px] bg-transparent border-b-2 border-white text-xl text-white outline-none mb-4"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />

          {/* Submit Button */}
          <button className="mt-6 w-[300px] h-[50px] bg-[#010750] text-xl text-white rounded-lg">
            Register
          </button>
        </div>
      </div>
    </form>
  );
}
