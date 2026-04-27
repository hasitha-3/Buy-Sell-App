
import express from 'express';
import Items from '../database/Itemsdata.js';

const find_items = express();

// Get all items
find_items.get('/all/items', async (req, res) => {
    try {
        const items = await Items.find({});
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching all items:', error);
        res.status(500).json({ message: "Error fetching items", error });
    }
});

// Search for items by category and name
find_items.get('/:category/:search', async (req, res) => {
    console.log(req.params.category, req.params.search);
    try {
        const items = await Items.find({
            itemcategory: req.params.category,
            itemname: new RegExp(req.params.search, 'i')  // Case-insensitive search for item name
        });
        if (items.length === 0) {
            return res.status(404).json({ message: "Items not found" });
        }
        res.status(200).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: "Error fetching items", error });
    }
});

// Search for items by name or category
find_items.get('/:catorsearch', async (req, res) => {
    console.log("catorsat",req.params.catorsearch);
    const ser = req.params.catorsearch;
    if(ser!='Electronics' && ser!='Fitness' && ser!='Stationary' && ser!='' && ser!='Cloths' && ser!='Food'){
        console.log("Searching by name:",ser);
        try {
            const items = await Items.find({
                itemname: new RegExp(req.params.catorsearch, 'i')  // Case-insensitive search for item name
            });
            if (items.length === 0) {
                return res.status(404).json({ message: "Items not found" });
            }
            res.status(200).json(items);
        } catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ message: "Error fetching items", error });
        }
    }
    else{
        console.log("Searching by category:",ser);
        try{
            const items=await Items.find({itemcategory:ser});
            if(items.length===0){
                return res.status(404).json({message:"Items not found"});
            }
            res.status(200).json(items);
           }
           catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ message: "Error fetching items", error });
           }
    }
});






export default find_items;