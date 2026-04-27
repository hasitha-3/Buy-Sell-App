import mongoose from 'mongoose';

const cart_item = new mongoose.Schema({
    itemname: { type: String, required: true },
    itemprice: { type: Number, required: true },
    itemcategory: { type: String, required: true },
    itemdescription: { type: String, required: true },
    seller_id: { type: String, required: true }, 
    buyyer_id: { type: String, required: true }, 
    quantity: { type: Number, required: true, default: 1 },
    status_item: { type: Number, required: true, default: 0 }, // 0 = in cart, 1 = ordered
    createdAt: { type: Date, default: Date.now }
});

const cart_items = mongoose.model('cart_items', cart_item);

export default cart_items;
