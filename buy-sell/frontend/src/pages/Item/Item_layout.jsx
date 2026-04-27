import React from 'react';
import axios from 'axios';
import { useAppContext } from "../../MyContext";
import { toast } from 'react-hot-toast';

const ItemLayout = ({ item_info, userId }) => {
const { info } = useAppContext();
    if (!item_info) return null;

    const { itemname, itemcategory, itemdescription, itemprice } = item_info;
    
    // Check if current user is the seller
    const isOwnItem = item_info.seller_id === info.userId;

    const handle_add_to_cart = async () => {
        try {
            const response = await axios.post('http://localhost:8000/cart/add', {
                item_info: item_info,
                user_id: info.userId,
                quantity: 1
            });

            if (response.status === 200) {
                toast.success(`${itemname} +1 added to cart! 🛒`);
                // Update cart count in navbar
                if (window.updateCartFromNavbar) {
                    window.updateCartFromNavbar();
                }
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add to cart');
        }
    };

    return (
        <div className="glass-card p-5 rounded-2xl w-80">
            <h2 className="hero-title text-2xl font-bold mb-2">{itemname}</h2>
            <p className="text-sm text-slate-500 mb-2">Category: {itemcategory}</p>
            <p className="text-sm text-slate-700 min-h-16">{itemdescription}</p>
            <p className="mt-3 font-semibold text-xl text-green-600">₹{itemprice}</p>
            <div>
                {isOwnItem ? (
                    <button className="bg-slate-400 text-white rounded-xl p-2 px-2 w-full mt-4 cursor-not-allowed" disabled>
                        Your Item - Cannot Buy
                    </button>
                ) : (
                    <button className="btn-primary rounded-xl p-2 px-2 w-full mt-4" onClick={handle_add_to_cart}>
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ItemLayout;
