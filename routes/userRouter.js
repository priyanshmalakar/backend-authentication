const express = require('express');
const router = express.Router();
const User = require('../conn/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const verifyToken = require("../middleware/verifyToken")

router.post('/register' , async(req,res)=>{
    try {
        const {username ,password} = req.body;
    const userExists = await User.findOne({username});
    if(!userExists){
        const hashedpass = await bcrypt.hash(password, 10);
        const newUser = new User({username , password : hashedpass});
        newUser.save()
        .then(user =>{
            res.status(201).json(user);
            console.log(user);
        })
    }
    }
    catch (error) {
        res.status(404).json(error);
        
    }
})

router.get('/home', verifyToken, async (req, res) => {
    try {
        // Access is allowed only if the token is valid
        res.json({ 
            message: 'Hello, world!', 
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/login' , async(req,res)=>{
    const {username, password} = req.body;
    try {
        const userExists = await User.findOne({username});
        if(!userExists){
            return res.status(401).json({message : "username in invalid"});
        }
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        
        const token = jwt.sign({ userId: userExists._id }, 'your-secret-key', { expiresIn: '1h' });

        
        res.status(200).json({ token, userExists })
        console.log(userExists, token)
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
module.exports = router;