import express from 'express';
import cart_items from '../database/Itemsdata.js';


const add_to_cart = express();

add_to_cart.post('/', async (req, res) => {

    try {
        // Check if user already exists by Email or contact_number
        // console.log(req.body);
        const { itemname, itemprice, itemcategory, itemdescription,seller_id } = req.body.item_data;
        itemname=itemname.toLowerCase();
        // console.log(itemname, itemprice, itemcategory, itemdescription ,seller_id);
        const newitem = new Items({
            itemname, 
            itemprice, 
            itemcategory, 
            itemdescription,
            seller_id
        });
        // console.log(`new:,${newitem}`);
        await newitem.save();
        res.userexist=0;
        res.status(200).json({ message: "Success,Item added" });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({message: "Server error", error: err.message });
    }
});



export default add_to_cart;