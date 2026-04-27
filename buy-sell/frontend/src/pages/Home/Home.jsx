import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import ItemLayout from '../Item/Item_layout'
import { useAppContext } from '../../MyContext'

function Home() {
  const [featuredItems, setFeaturedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { info } = useAppContext()

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Home/all/items')
        if (response.status === 200) {
          // Filter items (exclude seller's own items)
          const filtered = response.data.filter(item => item.seller_id !== info.userId)
          // Show only 6 featured items
          setFeaturedItems(filtered.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedItems()
  }, [info.userId])

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

      {/* Featured Items Section */}
      <div className='px-4 py-8'>
        <h2 className='hero-title text-3xl font-bold mb-6'>Featured Products</h2>
        
        {loading ? (
          <p className='text-center text-slate-600'>Loading items...</p>
        ) : featuredItems.length > 0 ? (
          <div className='flex flex-wrap gap-5 justify-center'>
            {featuredItems.map((item) => (
              <ItemLayout
                key={item._id}
                item_info={item}
                userId={info.userId}
              />
            ))}
          </div>
        ) : (
          <p className='text-center text-slate-600'>No items available yet. Start selling!</p>
        )}

        {featuredItems.length > 0 && (
          <div className='text-center mt-8'>
            <button 
              onClick={() => navigate('/home/Electronics')}
              className='btn-primary rounded-xl px-6 py-3 text-lg'
            >
              Browse All Products →
            </button>
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className='px-4 py-8'>
        <h2 className='hero-title text-3xl font-bold mb-6'>Shop by Category</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {['Electronics', 'Fitness', 'Cloths', 'Stationary', 'Food'].map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/home/${cat}`)}
              className='glass-card py-8 px-4 rounded-2xl text-center hover:bg-white/20 transition text-lg font-semibold'
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
