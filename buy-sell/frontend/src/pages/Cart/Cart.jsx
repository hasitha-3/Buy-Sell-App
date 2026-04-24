import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';

function Cart() {
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
  )
}

export default Cart
