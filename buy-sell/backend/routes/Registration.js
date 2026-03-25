
import express from 'express';
// Importing the default export
import Data from '../database/userdata.js';

// import Registration from '../../frontend/src/pages/Registration/Registration.jsx';

const Registration_api = express();

Registration_api.post('/', async (req, res) => {
    const { firstname, lastname, Email, contact_number, age, password } = req.body.userdata;

    try {
        // Check if user already exists by Email or contact_number
        const user = await Data.findOne({
            $or: [
                { Email: { $regex: `^${Email}$`, $options: 'i' } }, // Case-insensitive Email search
                { contact_number } // Exact match for contact_number
            ]
        });

        if (user) {
            res.userexist=1;
            return res.status(400).json("user may already exist");
        }

        // Create a new user document
        const newuser = new Data({
            firstname, 
            lastname, 
            Email, 
            contact_number, 
            age, 
            password
        });

        // Log to see what data is being sent
        console.log(newuser); 

        // Await the save operation to ensure the data is saved before sending the response
        await newuser.save();
        res.userexist=0;
        res.status(200).json({ message: "Success, user registered" , userId: newuser._id});

    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({message: "Server error", error: err.message });
    }
});



export default Registration_api;