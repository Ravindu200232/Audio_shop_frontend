import { MdOutlinePayments } from "react-icons/md";
import { BsGraphDown } from "react-icons/bs";
import { CiSpeaker, CiBookmarkCheck, CiUser } from "react-icons/ci";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemPage from "./adminItemPage";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import User from "./users";
import AdminBookingPage from "./adminbookingpage";
import { MdRateReview } from "react-icons/md";
import { AdminReviewPage } from "./adminReviewpage";
import { AdminInquiryPage } from "./adminInquirypage";
import AdminPackagePage from "./adminpakage";
import AddPackagePage from "./addpackage";
import UpdatePackagePage from "./updatepackage";
import { AdminPayment } from "./adminPayment";

export default function AdminPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center h-20 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>

          <nav className="mt-10">
            <Link
              to="/admin/booking"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
            >
              <CiBookmarkCheck className="w-6 h-6" />
              <span className="ml-4">Bookings</span>
            </Link>
            <Link
              to="/admin/item"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
            >
              <CiSpeaker className="w-6 h-6" />
              <span className="ml-4">Items</span>
            </Link>
            <Link
              to="/admin/package"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
            >
              <CiBookmarkCheck className="w-6 h-6" />
              <span className="ml-4">Packages</span>
            </Link>
            <Link
              to="/admin/user"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
            >
              <CiUser className="w-6 h-6" />
              <span className="ml-4">Users</span>
            </Link>
            <Link
              to="/admin/review"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
            >
              <MdRateReview className="w-6 h-6" />
              <span className="ml-4">Reviews</span>
            </Link>
            <Link
              to="/admin/inquiry"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
            >
              <BsGraphDown className="w-6 h-6" />
              <span className="ml-4">Inquiries</span>
            </Link>
            <Link
              to="/admin/payment"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200"
            >
              <MdOutlinePayments className="w-6 h-6" />
              <span className="ml-4">Payment</span>
            </Link>
          </nav>
        </div>

        {/* 🔓 Logout Button */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="w-full text-left flex items-center px-6 py-3 text-red-600 hover:bg-red-100 border-t"
        >
          <span className="ml-4 font-semibold">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Routes>
          <Route path="/booking" element={<AdminBookingPage />} />
          <Route path="/item" element={<AdminItemPage />} />
          <Route path="/item/add" element={<AddItemPage />} />
          <Route path="/item/edit" element={<UpdateItemPage />} />
          <Route path="/user/*" element={<User />} />
          <Route path="/review" element={<AdminReviewPage />} />
          <Route path="/inquiry" element={<AdminInquiryPage />} />
          <Route path="/package" element={<AdminPackagePage />} />
          <Route path="/package/add" element={<AddPackagePage />} />
          <Route path="/package/edit" element={<UpdatePackagePage />} />
          <Route path="/payment" element={<AdminPayment />} />
        </Routes>
      </main>
    </div>
  );
}
