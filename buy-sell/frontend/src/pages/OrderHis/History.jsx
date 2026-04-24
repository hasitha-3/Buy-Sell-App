import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Home/Navbar';

function History() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-4 py-8 flex justify-center">
        <div className="glass-card rounded-2xl p-8 w-full max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">History</p>
          <h1 className="hero-title text-4xl font-bold mt-2">No purchase history yet</h1>
          <p className="text-slate-600 mt-3">
            Your completed transactions and past activity will be listed here.
          </p>
          <Link to="/home" className="btn-primary inline-flex mt-6 px-5 py-2 rounded-xl font-semibold">
            Browse Marketplace
          </Link>
        </div>
      </div>
    </div>
  )
}

export default History
