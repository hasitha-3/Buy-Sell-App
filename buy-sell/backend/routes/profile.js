
import express from 'express';
import Data from '../database/userdata.js';
// import Registration from '../../frontend/src/pages/Registration/Registration.jsx';
import jwt from 'jsonwebtoken';


const profile_api = express();

profile_api.get('/:userId', async (req, res) => {
    console.log(req.params.userId);
    try {
        const user = await Data.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});

profile_api.post('/:userId', async (req, res) => {
    const secretkey = process.env.SECRET_KEY;
    const user = await Data.findById(req.params.userId);
    const access_token=jwt.sign({ user ,secretkey}, secretkey);
    res.status(200).json({ access_token:access_token });
});


const Authentication=(req,res,next)=>{
    const authheader=req.header('Authorization');
    const token=authheader && authheader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Access denied"});
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({message:"Token is not valid"});
        }
        req.user=user;
        next();
    });
};

export default profile_api;