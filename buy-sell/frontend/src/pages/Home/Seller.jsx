import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Home/Navbar";
import { Toaster, toast } from "react-hot-toast";
import { useAppContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";

function Seller() {
    const navigate = useNavigate();
    const notifye = (message) => toast.error(message);
    const notifys = (message) => toast.success(message);
    const { info} = useAppContext();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Electronics");

    const handle_add = (e) => {
        e.preventDefault();
        // console.log("Add button clicked");
        // console.log(name, price, description, category);
        if(!name || !price || !description || !category){
            notifye("Please fill all the fields");
            return;
        }
        else{
            try{
                const item_data = {
                    itemname:name,
                    itemprice:price,
                    itemdescription:description,
                    itemcategory:category,
                    seller_id: info.userId
                };
                console.log(item_data);
            const response = axios.post("http://localhost:8000/add_item", {item_data});
            notifys("Item added successfully");
            navigate("/home");
            }
            catch(err){
                notifye("Error adding item");
            }

        }
    }


    return (
        <div className="bg-gray-400 w-full min-h-screen">
            <Navbar />
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-gray-200 grid py-10 px-20 rounded w-fit">
                    <form>
                        <div>
                            <p className="font-semibold mb-1">Name:</p>
                            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className="px-2 py-1 mb-2 border-2 rounded w-full" />
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Price:</p>
                            <input type='number' value={price} onChange={(e)=>setPrice(e.target.value)} className="px-2 py-1 mb-2 border-2 rounded w-full" />    
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Description:</p>
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="px-2 py-1 mb-2 border-2 rounded w-full" />    
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Category:</p>
                            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="px-2 py-1 mb-2 border-2 rounded w-full">
                                <option value="Electronics">Electronics</option>
                                <option value="Cloths">Cloths</option>
                                <option value="Stationary">Stationary</option>
                                <option value="Food">Food</option>
                                <option value="Fitness">Fitness</option>
                            </select>
                        </div>
                        <button type="submit" onClick={handle_add} className="bg-gray-400 px-2 py-1 mt-4 rounded w-full">Add</button>
                        <Toaster />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Seller
