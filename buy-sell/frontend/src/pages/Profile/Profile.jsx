import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Home/Navbar";

// ✅ Fixed props destructuring
function F({ first, second }) {
  return (
    <div>
      <p className="font-semibold mb-1">{first}:</p>
      <p className="px-2 py-1 mb-2 border-2 rounded w-full">{second}</p>
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

  if (loading) return <div className="text-center mt-10">Loading...</div>; // ✅ Show loading indicator
  if (!user) return <div className="text-center mt-10">User not found...</div>; // ✅ Handle case where user is not found

  return (
    <div className="bg-gray-400 w-full h-screen">
      <Navbar />
      <p className="text-4xl font-bold my-3 text-center">Your Account</p>
      <div className="flex justify-center items-center">
        <div className="bg-gray-200 grid py-10 px-20 rounded w-fit">
          <F first="First name" second={user.firstname} />
          <F first="Last name" second={user.lastname} />
          <F first="Contact Number" second={user.contact_number} />
          <F first="Email address" second={user.Email} />
          <button className="bg-gray-400 px-2 py-1 mb-2 rounded w-full">Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
