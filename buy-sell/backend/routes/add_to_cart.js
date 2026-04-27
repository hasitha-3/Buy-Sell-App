import express from 'express';
import cart_items from '../database/cart_items.js';

const add_to_cart = express();

// Get all cart items for a user
add_to_cart.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await cart_items.find({ buyyer_id: userId, status_item: 0 });
        res.status(200).json(cartItems);
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Add to cart or increase quantity
add_to_cart.post('/add', async (req, res) => {
    try {
        const { item_info, user_id, quantity = 1 } = req.body;
        
        if (!item_info || !user_id) {
            return res.status(400).json({ message: "Missing item_info or user_id" });
        }

        // Check if item already in cart
        const existingItem = await cart_items.findOne({
            buyyer_id: user_id,
            itemname: item_info.itemname,
            seller_id: item_info.seller_id,
            status_item: 0
        });

        if (existingItem) {
            // Update quantity
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json({ message: "Item quantity updated", item: existingItem });
        }

        const { itemname, itemprice, itemcategory, itemdescription, seller_id } = item_info;
        const { _id: itemId } = item_info;
        
        const newCartItem = new cart_items({
            itemname, 
            itemprice, 
            itemcategory, 
            itemdescription,
            seller_id,
            buyyer_id: user_id,
            quantity: quantity,
            status_item: 0
        });
        
        await newCartItem.save();
        res.status(200).json({ message: "Item added to cart successfully", item: newCartItem });

    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Update quantity
add_to_cart.put('/update/:cartItemId', async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        if (quantity <= 0) {
            // Delete item if quantity is 0 or less
            await cart_items.findByIdAndDelete(cartItemId);
            return res.status(200).json({ message: "Item removed from cart" });
        }

        const updatedItem = await cart_items.findByIdAndUpdate(
            cartItemId,
            { quantity },
            { new: true }
        );

        res.status(200).json({ message: "Quantity updated", item: updatedItem });
    } catch (err) {
        console.error("Error updating quantity:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Remove from cart
add_to_cart.delete('/remove/:cartItemId', async (req, res) => {
    try {
        const { cartItemId } = req.params;
        await cart_items.findByIdAndDelete(cartItemId);
        res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
        console.error("Error removing item:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default add_to_cart;