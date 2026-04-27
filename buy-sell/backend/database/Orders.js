import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    buyer_id: { type: String, required: true },
    items: [{
        itemname: { type: String, required: true },
        itemprice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        seller_id: { type: String, required: true },
        itemcategory: { type: String, required: true }
    }],
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    deliveryStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
    orderNumber: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    deliveredAt: { type: Date }
});

const Orders = mongoose.model('orders', orderSchema);

export default Orders;
