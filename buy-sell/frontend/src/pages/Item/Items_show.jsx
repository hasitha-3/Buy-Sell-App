import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemLayout from "./Item_layout";
import Navbar from "../Home/Navbar";
import { useAppContext } from "../../MyContext";
function ItemsShow() {
    const { search: paramSearch, category: paramCategory } = useParams();
    const [items, setItems] = useState([]);
    const { info } = useAppContext();
    // Swap search and category (avoiding direct reassignment)
    const search = paramCategory;
    const category = paramSearch;

    useEffect(() => {
        setItems([]); // Clear items before fetching new ones
        const fetchItems = async () => {
            try {
                let url = "http://localhost:8000/Home";

                if (category && search) {
                    url = `${url}/${category}/${search}`;
                } else if (search) {
                    url = `${url}/${search}`;
                } else if (category) {
                    url = `${url}/${category}`;
                } else {
                    console.log("No category or search provided.");
                    return;
                }

                console.log("Fetching:", url);
                const response = await axios.get(url);

                if (response.status === 404) {
                    console.log("No items found");
                    return;
                }
                console.log("Response:", response.data);
                setItems(response.data); // Flatten nested arrays
                const filtered = response.data.filter((item) => item.seller_id != info.userId);
                setItems(filtered);

            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, [search, category]); // ✅ Ensures re-fetching when either `search` or `category` changes

    useEffect(() => {
        console.log("Updated items:", items);
    }, [items]); // ✅ This ensures items are logged after state updates


    return (
        <>
            <Navbar />
            <div className="bg-gray-400 w-full h-screen flex flex-col items-center">
                <h1 className="text-4xl font-bold mt-4 mb-4">Items</h1>
                <div className="flex flex-wrap gap-4 justify-center items-center">
                    {items.map((item, index) => (
                        <ItemLayout
                            item_info={item}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default ItemsShow;
