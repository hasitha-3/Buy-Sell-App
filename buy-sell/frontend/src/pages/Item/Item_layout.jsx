import React from 'react';
import axios from 'axios';
import { useAppContext } from "../../MyContext";
const ItemLayout = ({ item_info, userId }) => {
const { info } = useAppContext();
    if (!item_info) return null; // ✅ Avoid errors if item_info is undefined

    const { itemname, itemcategory, itemdescription, itemprice } = item_info;

    const handle_add_to_cart = async () => {
        console.log(`Adding ${itemname} to cart...`);

        try {
            const response = await axios.post('http://localhost:8000/cart/add', {
                item_info: item_info, // ✅ Corrected
                user_id: userId, // ✅ Pass userId from props
            });

            if (response.status === 200) {
                console.log('Item added successfully:', response.data);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className="glass-card p-5 rounded-2xl w-80">
            <h2 className="hero-title text-2xl font-bold mb-2">{itemname}</h2>
            <p className="text-sm text-slate-500 mb-2">Category: {itemcategory}</p>
            <p className="text-sm text-slate-700 min-h-16">{itemdescription}</p>
            <p className="mt-3 font-semibold text-xl">${itemprice}</p>
            <div>
                <button className="btn-primary rounded-xl p-2 px-2 w-full mt-4" onClick={handle_add_to_cart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ItemLayout;
