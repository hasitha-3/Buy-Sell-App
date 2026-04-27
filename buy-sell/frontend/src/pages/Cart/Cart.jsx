import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import { useAppContext } from '../../MyContext';

function Cart() {
  const { info } = useAppContext();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCart();
  }, [info.userId]);

  useEffect(() => {
    // Calculate total price
    const total = cartItems.reduce((sum, item) => sum + (item.itemprice * item.quantity), 0);
    setTotalPrice(total);
  }, [cartItems]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/cart/${info.userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        handleRemoveItem(cartItemId);
        return;
      }
      const response = await axios.put(`http://localhost:8000/cart/update/${cartItemId}`, {
        quantity: newQuantity
      });
      setCartItems(cartItems.map(item => item._id === cartItemId ? response.data.item : item));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8000/cart/remove/${cartItemId}`);
      setCartItems(cartItems.filter(item => item._id !== cartItemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/orders/create', {
        user_id: info.userId,
        cartItems: cartItems,
        totalPrice: totalPrice
      });
      alert('Order placed successfully!');
      setCartItems([]);
      fetchCart();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error placing order');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="text-center mt-10">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="px-4 py-8 flex justify-center">
          <div className="glass-card rounded-2xl p-8 w-full max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Cart</p>
            <h1 className="hero-title text-4xl font-bold mt-2">Your cart is empty</h1>
            <p className="text-slate-600 mt-3">
              Items you add will appear here so you can review and place your order.
            </p>
            <Link to="/home" className="btn-primary inline-flex mt-6 px-5 py-2 rounded-xl font-semibold">
              Explore Items
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4 py-8 max-w-6xl mx-auto">
        <h1 className="hero-title text-4xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="glass-card p-5 rounded-xl flex gap-4">
                <div className="flex-1">
                  <h3 className="hero-title text-xl font-bold">{item.itemname}</h3>
                  <p className="text-sm text-slate-600 mb-2">{item.itemcategory}</p>
                  <p className="text-lg font-semibold text-green-600">₹{item.itemprice}</p>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-slate-200"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold">₹{item.itemprice * item.quantity}</p>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-red-500 hover:text-red-700 font-semibold text-lg"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="glass-card p-6 rounded-xl h-fit">
            <h2 className="hero-title text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-semibold">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="hero-title text-2xl font-bold text-green-600">₹{totalPrice}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="btn-primary w-full py-3 rounded-xl font-semibold text-lg"
            >
              Proceed to Checkout
            </button>
            <Link to="/home" className="block text-center mt-3 text-blue-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
