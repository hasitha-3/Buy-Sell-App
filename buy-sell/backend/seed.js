import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Items from './database/Itemsdata.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const sampleItems = [
    // Electronics - 8 items
    {
        itemname: "wireless headphones",
        itemprice: 5999,
        itemcategory: "Electronics",
        itemdescription: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "smart watch",
        itemprice: 12999,
        itemcategory: "Electronics",
        itemdescription: "Advanced smartwatch with fitness tracking, heart rate monitor, and 7-day battery.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "usb-c charger",
        itemprice: 1599,
        itemcategory: "Electronics",
        itemdescription: "Fast charging USB-C charger with 65W power, compatible with all devices.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "bluetooth speaker",
        itemprice: 3499,
        itemcategory: "Electronics",
        itemdescription: "Portable bluetooth speaker with 360° sound and waterproof design.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "phone stand",
        itemprice: 599,
        itemcategory: "Electronics",
        itemdescription: "Adjustable phone stand for desk, works with all smartphones.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "screen protector",
        itemprice: 299,
        itemcategory: "Electronics",
        itemdescription: "Tempered glass screen protector with HD clarity and easy installation.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "usb cable set",
        itemprice: 799,
        itemcategory: "Electronics",
        itemdescription: "Pack of 3 premium USB cables - USB-C, Micro USB, and Lightning.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "power bank",
        itemprice: 2499,
        itemcategory: "Electronics",
        itemdescription: "20000mAh power bank with fast charging and dual ports.",
        seller_id: "507f1f77bcf86cd799439011"
    },

    // Fitness - 8 items
    {
        itemname: "nike running shoes",
        itemprice: 4999,
        itemcategory: "Fitness",
        itemdescription: "Comfortable Nike running shoes perfect for daily workouts and marathons.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "yoga mat",
        itemprice: 1299,
        itemcategory: "Fitness",
        itemdescription: "Non-slip yoga mat with thickness of 6mm, perfect for yoga and meditation.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "dumbbells set",
        itemprice: 3999,
        itemcategory: "Fitness",
        itemdescription: "Complete dumbbell set with 10kg total weight, perfect for home gym.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "resistance bands",
        itemprice: 899,
        itemcategory: "Fitness",
        itemdescription: "Set of 5 resistance bands for strength training and rehabilitation.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "skipping rope",
        itemprice: 499,
        itemcategory: "Fitness",
        itemdescription: "Professional skipping rope with comfortable grip handles.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "water bottle",
        itemprice: 599,
        itemcategory: "Fitness",
        itemdescription: "Stainless steel water bottle - keeps water cold for 24 hours.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "gym bag",
        itemprice: 1999,
        itemcategory: "Fitness",
        itemdescription: "Spacious gym bag with multiple compartments and shoulder straps.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "push up bars",
        itemprice: 699,
        itemcategory: "Fitness",
        itemdescription: "Non-slip push-up bars for better grip and wrist support.",
        seller_id: "507f1f77bcf86cd799439011"
    },

    // Cloths - 8 items
    {
        itemname: "leather jacket",
        itemprice: 8999,
        itemcategory: "Cloths",
        itemdescription: "Stylish black leather jacket, perfect for casual and formal wear.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "cotton t-shirt",
        itemprice: 499,
        itemcategory: "Cloths",
        itemdescription: "100% cotton comfortable t-shirt available in multiple colors and sizes.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "denim jeans",
        itemprice: 1999,
        itemcategory: "Cloths",
        itemdescription: "Classic blue denim jeans with perfect fit and comfortable fabric.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "casual shirt",
        itemprice: 899,
        itemcategory: "Cloths",
        itemdescription: "Lightweight casual shirt, perfect for summer and casual outings.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "winter coat",
        itemprice: 5999,
        itemcategory: "Cloths",
        itemdescription: "Warm winter coat with waterproof outer layer and thermal lining.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "shorts",
        itemprice: 699,
        itemcategory: "Cloths",
        itemdescription: "Comfortable shorts, perfect for summer and casual wear.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "hoodie",
        itemprice: 1499,
        itemcategory: "Cloths",
        itemdescription: "Cozy hoodie with soft fleece interior and kangaroo pockets.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "socks pack",
        itemprice: 299,
        itemcategory: "Cloths",
        itemdescription: "Pack of 6 premium quality cotton socks in multiple colors.",
        seller_id: "507f1f77bcf86cd799439011"
    },

    // Stationary - 8 items
    {
        itemname: "notebook set",
        itemprice: 299,
        itemcategory: "Stationary",
        itemdescription: "Pack of 3 premium quality notebooks for office and school use.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "ballpoint pen set",
        itemprice: 199,
        itemcategory: "Stationary",
        itemdescription: "Professional ballpoint pen set with smooth writing and ergonomic design.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "desk organizer",
        itemprice: 599,
        itemcategory: "Stationary",
        itemdescription: "Wooden desk organizer to keep your workspace tidy and organized.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "sticky notes pack",
        itemprice: 149,
        itemcategory: "Stationary",
        itemdescription: "Colorful sticky notes pack with 5 different colors, 300 pieces total.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "highlighter set",
        itemprice: 299,
        itemcategory: "Stationary",
        itemdescription: "Pack of 8 highlighters in vibrant colors for better note-taking.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "marker pen set",
        itemprice: 399,
        itemcategory: "Stationary",
        itemdescription: "Professional marker pen set with permanent and water-based options.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "stapler",
        itemprice: 249,
        itemcategory: "Stationary",
        itemdescription: "Durable stapler with 1000 staples included, perfect for office use.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "file holder",
        itemprice: 699,
        itemcategory: "Stationary",
        itemdescription: "Metal file holder with 5 compartments for document organization.",
        seller_id: "507f1f77bcf86cd799439011"
    },

    // Food - 8 items
    {
        itemname: "organic coffee beans",
        itemprice: 899,
        itemcategory: "Food",
        itemdescription: "100% organic Arabica coffee beans, freshly roasted and premium quality.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "dark chocolate",
        itemprice: 399,
        itemcategory: "Food",
        itemdescription: "Premium dark chocolate 72% cocoa, delicious and perfect for gifting.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "green tea",
        itemprice: 299,
        itemcategory: "Food",
        itemdescription: "Pure green tea leaves with antioxidants, perfect for daily consumption.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "almond butter",
        itemprice: 699,
        itemcategory: "Food",
        itemdescription: "Natural almond butter with no added sugars, high in protein.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "honey jar",
        itemprice: 399,
        itemcategory: "Food",
        itemdescription: "Pure raw honey from local beekeepers, 500ml jar.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "granola pack",
        itemprice: 499,
        itemcategory: "Food",
        itemdescription: "Homemade granola with nuts, seeds, and dried fruits.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "olive oil",
        itemprice: 599,
        itemcategory: "Food",
        itemdescription: "Extra virgin olive oil from premium sources, 500ml bottle.",
        seller_id: "507f1f77bcf86cd799439011"
    },
    {
        itemname: "muesli cereal",
        itemprice: 449,
        itemcategory: "Food",
        itemdescription: "Healthy muesli cereal with whole grains and dried fruits.",
        seller_id: "507f1f77bcf86cd799439011"
    }
];

async function seedDatabase() {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(mongoURI);
        console.log("Connected successfully!");

        console.log("Clearing existing items...");
        await Items.deleteMany({});
        console.log("Items cleared!");

        console.log("Adding sample items...");
        const insertedItems = await Items.insertMany(sampleItems);
        console.log(`${insertedItems.length} items added successfully!`);
        
        console.log("\nSample items added:");
        insertedItems.forEach(item => {
            console.log(`✓ ${item.itemname} - ₹${item.itemprice} (${item.itemcategory})`);
        });

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("\nDisconnected from MongoDB");
    }
}

seedDatabase();
