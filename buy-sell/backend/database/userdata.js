import mongoose from 'mongoose';

// Define the schema for user data
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    contact_number: { type: String, required: true, unique: true }, // Ensure this is defined
    age: { type: Number, required: true },
    password: { type: String, required: true }, // Ensure this is defined
});

// Create the model from the schema
const Data = mongoose.model('User', userSchema);

export default Data;
