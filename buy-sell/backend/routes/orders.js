import express from 'express';
import Orders from '../database/Orders.js';
import cart_items from '../database/cart_items.js';

const orders_api = express();

// Create order from cart
orders_api.post('/create', async (req, res) => {
    try {
        const { user_id, cartItems, totalPrice } = req.body;

        if (!user_id || !cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        // Generate unique order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create order
        const newOrder = new Orders({
            buyer_id: user_id,
            items: cartItems.map(item => ({
                itemname: item.itemname,
                itemprice: item.itemprice,
                quantity: item.quantity,
                seller_id: item.seller_id,
                itemcategory: item.itemcategory
            })),
            totalPrice: totalPrice,
            orderNumber: orderNumber,
            paymentStatus: 'Completed', // Simulate successful payment
            deliveryStatus: 'Processing'
        });

        await newOrder.save();

        // Mark cart items as ordered and delete from cart
        await cart_items.deleteMany({ buyyer_id: user_id, status_item: 0 });

        res.status(200).json({ 
            message: "Order created successfully",
            order: newOrder,
            orderNumber: orderNumber
        });

    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Get user's orders
orders_api.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userOrders = await Orders.find({ buyer_id: userId }).sort({ createdAt: -1 });
        res.status(200).json(userOrders);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Get order by ID
orders_api.get('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Orders.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(order);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Update order status (for admin)
orders_api.put('/update/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { deliveryStatus, paymentStatus } = req.body;

        const updatedOrder = await Orders.findByIdAndUpdate(
            orderId,
            { 
                ...(deliveryStatus && { deliveryStatus }),
                ...(paymentStatus && { paymentStatus }),
                ...(deliveryStatus === 'Delivered' && { deliveredAt: new Date() })
            },
            { new: true }
        );

        res.status(200).json({ 
            message: "Order updated successfully",
            order: updatedOrder 
        });
    } catch (err) {
        console.error("Error updating order:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default orders_api;
