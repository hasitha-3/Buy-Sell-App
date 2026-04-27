import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../MyContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";


function Navbar() {
  const navigate = useNavigate();
  const { info, change_info } = useAppContext();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, [info.userId]);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cart/${info.userId}`);
      const totalItems = response.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  const updateCartCount = () => {
    // Called whenever item is added
    fetchCartCount();
  };

  // Expose function to Item_layout via window
  useEffect(() => {
    window.updateCartFromNavbar = updateCartCount;
  }, []);

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
      navigate(`/home/${category}/${search}`);
    }
  };


return (
  <nav className="glass-card mx-4 mt-4 rounded-2xl px-4 py-3 flex flex-wrap justify-center gap-3 items-center">
    {/* Profile button */}
    <button
      onClick={profile_handle}
      className="rounded-xl text-sm px-4 h-10 hover:bg-white/70 content-center"
    >
      Profile
    </button>

    {/* Home Link */}
    <Link
      to="/home"
      className="rounded-xl text-sm px-4 h-10 hover:bg-white/70 content-center"
    >
      Home
    </Link>

    {/* My Listings Link */}
    <Link
      to="/my-listings"
      className="rounded-xl text-sm px-4 h-10 hover:bg-white/70 content-center"
    >
      My Listings
    </Link>

    {/* Cart Link */}
    <Link
      to="/cart"
      className="rounded-xl text-sm px-4 h-10 hover:bg-white/70 content-center relative"
    >
      Cart
      {cartCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>

    {/* Search Bar */}
    <div className="flex items-center ">
      <input value={search} onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="field h-10 px-3 min-w-52"
        placeholder="Search products"
      />
    </div>
    <div >
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="field h-10 rounded">
        <option value="Electronics">Electronics</option>
        <option value="Cloths">Cloths</option>
        <option value="Stationary">Stationary</option>
        <option value="Food">Food</option>
        <option value="Fitness">Fitness</option>
      </select>
    </div>

    <button onClick={handle_search} className="btn-primary rounded-xl text-sm px-4 h-10">
      Search
    </button>
    {/* Orders Link */}
    <Link
      to="/orders"
      className="rounded-xl text-sm px-4 h-10 hover:bg-white/70 content-center"
    >
      Orders
    </Link>

    {/* History Link */}
    <Link
      to="/history"
      className="rounded-xl text-sm px-4 h-10 hover:bg-white/70 content-center"
    >
      History
    </Link>

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="btn-danger rounded-xl text-sm h-10 px-4 hover:drop-shadow-md content-center"
    >
      Logout
    </button>
    <Toaster />
  </nav>
);
}


export default Navbar;
