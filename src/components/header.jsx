import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full h-[80px] shadow-xl flex justify-between items-center px-4 md:px-8 bg-primary relative">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="logo" className="w-[60px] h-[60px] rounded-full object-cover" />
      </div>

      {/* Search Bar - Hidden on Small Screens */}
      <div className="hidden md:flex w-[400px] h-[40px] bg-gray-300 rounded-3xl items-center px-3">
        <BiSearchAlt className="text-2xl text-gray-600" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-[16px] pl-2"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6 text-secondary">
        <Link to="/" className="text-[18px] hover:text-gray-400">Home</Link>
        <Link to="/contact" className="text-[18px] hover:text-gray-400">Contact</Link>
        <Link to="/gallery" className="text-[18px] hover:text-gray-400">Gallery</Link>
        <Link to="/item" className="text-[18px] hover:text-gray-400">Items</Link>
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4 text-white">
        <CgProfile className="text-[30px] cursor-pointer hover:text-gray-400" />
        <Link to="/cart">
          <AiOutlineShoppingCart className="text-[30px] hover:text-gray-400" />
        </Link>
        {/* Mobile Menu Button */}
        <HiMenu 
          className="text-[30px] md:hidden cursor-pointer hover:text-gray-400"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Mobile Navigation - Vertical Menu */}
      {menuOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-primary shadow-md flex flex-col items-center py-4 space-y-4 text-white">
          <Link to="/" className="text-[18px] hover:text-gray-400">Home</Link>
          <Link to="/contact" className="text-[18px] hover:text-gray-400">Contact</Link>
          <Link to="/gallery" className="text-[18px] hover:text-gray-400">Gallery</Link>
          <Link to="/item" className="text-[18px] hover:text-gray-400">Items</Link>
        </div>
      )}
    </header>
  );
}
