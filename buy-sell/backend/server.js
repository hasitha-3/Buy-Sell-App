import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Data from './database/userdata.js';
import Registration_api from './routes/Registration.js';
import profile_api from './routes/profile.js';
import login_api from './routes/login.js';
import jwt from 'jsonwebtoken';
import add_item from './routes/add_item.js';
import find_items from './routes/find_items.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json()); // For parsing JSON requests
app.use(express.urlencoded({ extended: false }));

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB", err));


app.use('/Registration', Registration_api);


app.use('/profile', profile_api);

app.use('/login', login_api);

app.use('/add_item', add_item);


app.use('/Home',find_items);


const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token.split(" ")[1], JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
