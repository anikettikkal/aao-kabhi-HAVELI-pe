import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log(`Connected to MongoDB`)
})


// api routes starts here



app.post('/signup', async (req, res) => {
    const { name, phone, email, password, role } = req.body;

    // validation to check if all fields are filled starts here
    const emptyfields = [];
    if (!name) emptyfields.push('name');
    if (!phone) emptyfields.push('phone');
    if (!email) emptyfields.push('email');
    if (!password) emptyfields.push('password');
    if (!role) emptyfields.push('role');

    if (emptyfields.length > 0) {
        return res.json({
            success: false,
            message: `${emptyfields.join(',')} are required`
        })
    }
    // validation to check if all fields are filled end here

    // validation are check to email are all ready exists start here
    const existingUSer = await User.findOne({ email: email });
    if (existingUSer) {
        return res.json({
            success: false,
            message: "Email already exists"
        })
    }
    // validation to check if phone alredy exists starts here
    const existingUserPhone = await User.findOne({ phone: phone });
    if (existingUSerPhone) {
        return res.json({
            success: false,
            message: "phone already exists"
        })
    }
    // validtaion to check if phone already exists ends here

    const user = new User({
        name: name,
        phone: phone,
        email: email,
        password: password,
        role: role
    })

    const saveUser = await user.save();

    res.json({
        success: true,
        message: "user created successfully",
        data: saveUser
    })
})

app.post('/login', async(req,res)=>{
    const {email, password}= req.body;

    if(!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are requires"
        })
    }

    const existingUser = await User.findOne({ email: email, password: password});

    if(existingUser) {
        return res.json({
            success: true,
            message: "Login successfully",
            data: existingUser
        })
    }
    else
    {
        return res.json({
            success: false,
            message: "Invalid email or password"
        })
    }
})

// api routes ends here


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})