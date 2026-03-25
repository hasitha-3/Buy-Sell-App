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
        <div className="bg-gray-300 p-5 rounded">
            <h2 className="text-4xl">{itemname}</h2>
            <p>Category: {itemcategory}</p>
            <p>{itemdescription}</p>
            <p>Price: ${itemprice}</p>
            <div>
                <button className="bg-gray-600 rounded p-1 px-2 w-full" onClick={handle_add_to_cart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ItemLayout;
