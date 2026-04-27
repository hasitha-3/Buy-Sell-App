import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import ItemLayout from '../Item/Item_layout';
import { useAppContext } from '../../MyContext';

function MyListings() {
    const [myItems, setMyItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { info } = useAppContext();

    useEffect(() => {
        const fetchMyItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/Home/all/items');
                if (response.status === 200) {
                    // Filter to show only current user's items
                    const userItems = response.data.filter(item => item.seller_id === info.userId);
                    setMyItems(userItems);
                }
            } catch (error) {
                console.error('Error fetching your items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyItems();
    }, [info.userId]);

    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='px-4 py-8'>
                <h1 className='hero-title text-4xl font-bold mb-8'>My Listings</h1>
                
                {loading ? (
                    <p className='text-center text-slate-600'>Loading your items...</p>
                ) : myItems.length > 0 ? (
                    <div className='flex flex-wrap gap-5 justify-center'>
                        {myItems.map((item) => (
                            <div key={item._id} className='relative'>
                                <ItemLayout
                                    item_info={item}
                                    userId={info.userId}
                                />
                                <span className='absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-semibold'>
                                    Your Item
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-16'>
                        <p className='text-slate-600 text-lg mb-4'>You haven't listed any items yet</p>
                        <a href='/seller' className='btn-primary rounded-xl px-6 py-3 text-lg inline-block'>
                            Start Selling Now →
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyListings;
