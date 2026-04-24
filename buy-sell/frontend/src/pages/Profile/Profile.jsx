import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Home/Navbar";

// ✅ Fixed props destructuring
function F({ first, second }) {
  return (
    <div className="mb-3">
      <p className="font-semibold text-sm mb-1">{first}</p>
      <p className="field">{second}</p>
    </div>
  );
}

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/profile/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // ✅ Stop loading after fetching
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div className="text-center mt-10 text-slate-600">Loading...</div>; // ✅ Show loading indicator
  if (!user) return <div className="text-center mt-10 text-slate-600">User not found...</div>; // ✅ Handle case where user is not found

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <p className="hero-title text-4xl font-bold my-6 text-center">Your Account</p>
      <div className="flex justify-center items-center px-4 pb-8">
        <div className="glass-card grid py-8 px-6 md:px-12 rounded-2xl w-full max-w-xl">
          <F first="First name" second={user.firstname} />
          <F first="Last name" second={user.lastname} />
          <F first="Contact Number" second={user.contact_number} />
          <F first="Email address" second={user.Email} />
          <button className="btn-primary px-2 py-2 mt-2 mb-2 rounded-xl w-full font-semibold">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
