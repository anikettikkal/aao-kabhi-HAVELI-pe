import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import FoodItem from './models/FoodItem.js';
import Table from "./models/Table.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);

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
    if (existingUserPhone) {
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

app.post("/createFoodItem", async(req, res)=>{
    const {title, description, imgUrl, price, category} = req.body;

    const foodItem = new FoodItem({
        title: title,
        description: description,
        imgUrl: imgUrl,
        price: price,
        category: category
    })

    const savedFoodItem = await foodItem.save();

    res.json({
        success: true,
        message: "Food Item created successfully",
        data: savedFoodItem
    })
})

// http://localhost:5000/foodItemByCategory?category=pizza   ==> (category=pizza)called as a query
app.get("/foodItemByCategory", async(req,res)=>{
    const {category} = req.query;

    const foodItem = await FoodItem.find({
        category: category
    })

    res.json({
        success: true,
        message: "Food item fetched succesfully",
        data: foodItem
    })
})

// http://localhost:5000/foodItems?title=pizza
app.get("/foodItems", async(req,res)=>{
    const {title} = req.query;

    const foodItems = await FoodItem.find({
        title: {$regex: title, $options: 'i'}
    })

    res.json({
        success:true,
        message: "Food Items fetched successfully",
        data: foodItems
    })
})

app.post("/createTable", async(req, res)=>{
    const {tableNumber} = req.body;

    const existingTable = await Table.findOne({ tableNumber: tableNumber });
    if (existingTable) {
        return res.json({
            success: false,
            message: "Table already exists"
        })
    }

    const table = new Table({
        tableNumber: tableNumber,
        occupied: false
    })

    const savedTable = await table.save();

    res.json({
        success: true,
        message: "Table created successfully",
        data: savedTable
    })
})

app.post("/bookTable", async (req, res) => {
    const { tableNumber, userId } = req.body;

    const existingTable = await Table.findOne({ tableNumber: tableNumber });
    if (existingTable && existingTable.occupied) {
        return res.json({
            success: false,
            message: "Table already occupied"
        })
    }

    if(existingTable){
        existingTable.occupied = true;
        existingTable.occupiedBy = userId;
        await existingTable.save();
    }

    res.json({
        success: true,
        message: "Table booked successfully",
        data: existingTable
    })
})

app.post("/unbookTable", async (req, res) => {
    const { tableNumber } = req.body;

    const existingTable = await Table.findOne({ tableNumber: tableNumber });

    if(existingTable){
        existingTable.occupied = false;
        existingTable.occupiedBy = null;
        await existingTable.save();
    }

    res.json({
        success: true,
        message: "Table unbooked successfully",
        data: existingTable
    })
});

app.get("/availableTables", async (req, res) => {
    const availableTables = await Table.find({ occupied: false });

    res.json({
        success: true,
        message: "Available tables fetched successfully",
        data: availableTables
    })
});
// api routes ends here


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})