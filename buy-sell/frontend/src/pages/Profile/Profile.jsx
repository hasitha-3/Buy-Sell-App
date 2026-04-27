import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Home/Navbar";
import { useAppContext } from "../../MyContext";

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
  const { info } = useAppContext();
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const userResponse = await axios.get(`http://localhost:8000/profile/${userId}`);
        setUser(userResponse.data);

        // Fetch all items and filter by seller_id
        const itemsResponse = await axios.get('http://localhost:8000/Home/all/items');
        const userItems = itemsResponse.data.filter(item => item.seller_id === info.userId);
        setUserProducts(userItems);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, info.userId]);

  if (loading) return <div className="text-center mt-10 text-slate-600">Loading...</div>;
  if (!user) return <div className="text-center mt-10 text-slate-600">User not found...</div>;

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      
      {/* User Info Section */}
      <p className="hero-title text-4xl font-bold my-6 text-center">Your Account</p>
      <div className="flex justify-center items-center px-4 pb-8">
        <div className="glass-card grid py-8 px-6 md:px-12 rounded-2xl w-full max-w-xl">
          <F first="First name" second={user.firstname} />
          <F first="Last name" second={user.lastname} />
          <F first="Contact Number" second={user.contact_number} />
          <F first="Email address" second={user.Email} />
          <F first="User ID" second={user._id} />
          <button className="btn-primary px-2 py-2 mt-2 mb-2 rounded-xl w-full font-semibold">Edit</button>
        </div>
      </div>

      {/* Your Products Section */}
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <p className="hero-title text-3xl font-bold mb-6 text-center">Your Listed Products</p>
        
        {userProducts.length > 0 ? (
          <div>
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-lg font-semibold text-blue-900">
                📊 Total Products: <span className="text-2xl text-blue-600">{userProducts.length}</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProducts.map((product) => (
                <div key={product._id} className="glass-card p-4 rounded-xl">
                  <p className="hero-title text-xl font-bold mb-2">{product.itemname}</p>
                  <p className="text-sm text-slate-600 mb-2">
                    <span className="font-semibold">Category:</span> {product.itemcategory}
                  </p>
                  <p className="text-sm text-slate-700 mb-2 min-h-10">
                    {product.itemdescription}
                  </p>
                  <p className="font-semibold text-lg text-green-600 mb-2">₹{product.itemprice}</p>
                  <p className="text-xs text-slate-500 break-all">
                    <span className="font-semibold">ID:</span> {product._id}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg mb-4">You haven't listed any products yet</p>
            <a href='/seller' className='btn-primary rounded-xl px-6 py-3 text-lg inline-block'>
              Start Selling Now →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
