import mongoose, { Schema } from "mongoose";
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    active:{
        type:Boolean,
        default:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    token:{
        type:String,
        default:''
    },
    otp:{
        type:String,
        default:''
    },
    otpExpiry:{
        type:Date,
        default:Date.now
    }
});

const User=mongoose.model("User",UserSchema);
export default User;