import express from 'express';
import Items from '../database/Itemsdata.js';


const add_item = express();

add_item.post('/', async (req, res) => {

    try {
        let{ itemname, itemprice, itemcategory, itemdescription,seller_id } = req.body.item_data;
        itemname=itemname.toLowerCase();
        const newitem = new Items({
            itemname, 
            itemprice, 
            itemcategory, 
            itemdescription,
            seller_id
        });
        console.log("Received Data:", req.body);

        await newitem.save();
        res.userexist=0;
        res.status(200).json({ message: "Success,Item added" });

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({message: "Server error", error: err.message });
    }
});



export default add_item;