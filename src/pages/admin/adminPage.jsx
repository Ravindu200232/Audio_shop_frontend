import { BsGraphDown } from "react-icons/bs";
import { CiSpeaker } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import User from "./users";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[200px] h-full bg-green-200">
        <button className="w-full h-[40px] bg-blue-300 text-[25px] font-bold flex justify-around items-center">
          <BsGraphDown />
          Dashboard
        </button>
        <Link
          to="/admin/booking"
          className="w-full h-[40px] bg-blue-400 text-[25px] font-bold flex justify-around items-center"
        >
          <CiBookmarkCheck />
          Bookings
        </Link>
        <Link
          to="/admin/item"
          className="w-full h-[40px] bg-blue-300 text-[25px] font-bold flex justify-around items-center"
        >
          <CiSpeaker />
          Item
        </Link>
        <Link
          to="/admin/user"
          className="w-full h-[40px] bg-blue-400 text-[25px] font-bold flex justify-around items-center"
        >
          <CiUser />
          Users
        </Link>
      </div>
      <div className="w-[calc(100vw-200px)] relative">
        <Routes path="/*">
          <Route path="/booking" element={<h1>Booking</h1>} />
          <Route path="/item" element={<AdminItemPage />} />
          <Route path="/item/add" element={<AddItemPage />} />
          <Route path="/item/edit" element={<UpdateItemPage />} />
          <Route path="/user/*" element={<User />} />
        </Routes>
      </div>
    </div>
  );
}
