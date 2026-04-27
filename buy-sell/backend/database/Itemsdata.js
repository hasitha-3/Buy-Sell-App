
import mongoose from 'mongoose';

const items_data = new mongoose.Schema({
    itemname: { type: String, required: true },
    itemprice: { type: Number, required: true },
    itemcategory: { type: String, required: true },
    itemdescription: { type: String, required: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // Ensure this is defined
});

const Items = mongoose.model('items_data', items_data);

export default Items;
