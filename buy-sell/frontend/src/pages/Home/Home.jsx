import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Catagories from './Catagories'
import Item_layout from '../Item/Item_layout'
function Home() {
  // console.log("Home")
  return (
    <div>
      <Navbar />
      <div className='flex'>
        <div className=' py-10 w-5/6 rounded px-20 my-1 text-left text-4xl font-bold grow-1'>
          Store.The best way to buy <p className='text-gray-500'> the products you love.</p>
        </div>
        <Link to={'/seller'} className='flex justify-center items-center bg-yellow-400 py-10 rounded mx-2 my-1 text-center text-4xl font-bold grow-2'>
          SELL
        </Link>
      </div>
      {/* <p className='text-4xl font-bold my-3'>Catagories.</p> */}
      

    </div>
  )
}

export default Home
