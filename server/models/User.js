import {Schema , model} from "mongoose"


const userSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    role: String,
}, { timestamps: true})

const User = model("USer", userSchema)

export default User