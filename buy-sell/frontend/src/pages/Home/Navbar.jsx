import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../MyContext";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";


function Navbar() {
  const navigate = useNavigate();
  const { info, change_info } = useAppContext();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Electronics");

  const notifye = (message) => toast.error(message);
  const notifys = (message) => toast.success(message);
  // Handle profile navigation
  const profile_handle = () => {
    if (info && info.userId) {
      navigate(`/profile/${info.userId}`);
    } else {
      console.error("User ID not found in context");
      navigate("/"); // Redirect to home if no user
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear context or reset values
    change_info({});  // Clear user info from context

    // Remove JWT token from local storage or cookies
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');

    navigate("/"); // Redirect to home page after logout
  };


  const handle_search = () => {
    if (!search && !category) {
      notifye("Please fill at least one field");
    }
    else{
      // console.log("search",search,"category",category);
      navigate(`/Home/${category}/${search}`);
    }
  };


return (
  <nav className="py-2 flex justify-center gap-x-10 items-center">
    {/* Profile button */}
    <button
      onClick={profile_handle}
      className="rounded-2xl text-sm px-4 h-10 hover:border content-center"
    >
      Profile
    </button>

    {/* Home Link */}
    <Link
      to="/Home"
      className="rounded-2xl text-sm px-4 h-10 hover:border content-center"
    >
      Home
    </Link>

    {/* Cart Link */}
    <Link
      to="/Cart"
      className="rounded-2xl text-sm px-4 h-10 hover:border content-center"
    >
      Cart
    </Link>

    {/* Search Bar */}
    <div className="flex items-center ">
      <input value={search} onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="bg-gray-300 h-10 px-2 rounded"
      />
    </div>
    <div >
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-300 h-10 rounded">
        <option value="Electronics">Electronics</option>
        <option value="Cloths">Cloths</option>
        <option value="Stationary">Stationary</option>
        <option value="Food">Food</option>
        <option value="Fitness">Fitness</option>
      </select>
    </div>

    <button onClick={handle_search} className="bg-gray-300 rounded text-sm px-4 h-10 hover:border">
      Search
    </button>
    {/* Orders Link */}
    <Link
      to="/Orders"
      className="rounded-2xl text-sm px-4 h-10 hover:border content-center"
    >
      Orders
    </Link>

    {/* History Link */}
    <Link
      to="/History"
      className="rounded-2xl text-sm px-4 h-10 hover:border content-center"
    >
      History
    </Link>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="hover:bg-red-500 rounded-2xl text-sm h-8 px-4 hover:drop-shadow-md content-center"
    >
      Logout
    </button>
    <Toaster />
  </nav>
);
}


export default Navbar;
