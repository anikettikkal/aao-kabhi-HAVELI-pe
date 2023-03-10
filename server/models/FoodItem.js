import { Schema, model } from 'mongoose';

const FoodItemSchema = new Schema({
    title: String,
    description: String,
    imgUrl: String,
    price: Number,
    category: String
})

const FoodItem = model("FoodItem", FoodItemSchema)

export default FoodItem