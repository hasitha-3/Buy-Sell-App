import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Catagories from './Catagories'
import Item_layout from '../Item/Item_layout'
function Home() {
  // console.log("Home")
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='px-4 py-5 flex flex-col lg:flex-row gap-4'>
        <div className='glass-card py-12 w-full rounded-2xl px-8 lg:px-16 text-left grow'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-3'>Buy • Sell • Rent</p>
          <div className='hero-title text-4xl lg:text-5xl font-bold leading-tight'>
            Store. The best way to find products you actually want.
          </div>
          <p className='text-slate-600 mt-4 text-base lg:text-lg max-w-2xl'>
            Discover quality listings, compare by category, and manage your own products from one clean dashboard.
          </p>
        </div>

        <Link to={'/seller'} className='btn-primary flex justify-center items-center py-10 rounded-2xl text-center text-3xl lg:text-4xl font-bold w-full lg:w-72'>
          Sell Now
        </Link>
      </div>
      {/* <p className='text-4xl font-bold my-3'>Catagories.</p> */}
      

    </div>
  )
}

export default Home
