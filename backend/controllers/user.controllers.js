import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config();

export const register=async(req,res)=>{
    try{
        const {name,username,email,password}=req.body;
        if(!name || !username || !email || !password){
            return res.status(400).json({message:"All field are required"});
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User Already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            username,
            password:hashedPassword,
            email
        });
        await newUser.save();
        const profile=new Profile({userId:newUser._id});
        //fill the attribute of userId with newely created newUser._id
        await profile.save();
        return res.status(500).json({message:"User Created"});

    }catch(err){
        console.log(err);
        return res.status(400).json({message:"Server Error"});
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All field are requiered"});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User does not exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"});
        }
        //generate a token
        const token=crypto.randomBytes(32).toString("hex");
        await User.updateOne({_id:user._id},{token});//{token:token}
        //it check _id of all document and compare with user._id if matches then add a attribute token
        return res.json({token});
    }catch(err){
        console.log(err);
    }
}

//uploading profile picture
export const uploadProfilePicture=async(req,res)=>{
    const {token}=req.body;
    try{
        const user=await User.findOne({token:token});
        if(!user){
            return req.status(404).json({message:"User not found"});
        }
        user.profilePicture=req.file.filename;
        await user.save();
        return res.json({message:"Profile Picture Updated"});
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}


export const updateUserProfile=async(req,res)=>{
    try{
        const {token,...newUserData}=req.body;
        const user=await User.findOne({token:token});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const {username,email}=newUserData;
        const existingUser=await User.findOne({$or:[{username},{email}]});
        if(existingUser){
            if(existingUser||String(existingUser._id)!==String(user._id)){
                return res.status(400).json({message:"Username or email already exists"});
            }
        }
        Object.assign(user,newUserData);
        await user.save();
        return res.json({message:"User updated"})

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}



export const getUserAndProfile=async(req,res)=>{
    const {token}=req.body;
    try{
        const user=await User.findOne({token:token});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const userProfile=await Profile.findOne({userId:user._id})
        .populate("userId","name username email profilePicture");

        return res.json(userProfile);

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

//password change
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS
    }
});
export const requestPasswordResetOTP=async(req,res)=>{
    const {email}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        //generate otp
        const otp=Math.floor(100000+Math.random()*900000).toString();//6 digit otp
        const otpExpires=new Date(Date.now()+10*60*1000);//10 minutes
        user.otp=otp;
        user.otpExpiry=otpExpires;
        await user.save();
        const mailOptions={
            from:process.env.GMAIL_USER,
            to:email,
            subject:"Password Reset OTP",
            text:`Your OTP for password reset is :${otp}. It will expire in 10 minutes`
        }
        await transporter.sendMail(mailOptions);
        return res.json({message:"OTP sent to your email"});
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }
}

//verification of otp
export const verifyPasswordResetOTP=async(req,res)=>{
    const {email,otp,newPassword}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(user.otp!==otp || user.otpExpiry<Date.now()){
            return res.status(400).json({message:"Invalid OTP or expired OTP"});
        }
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        user.otp=undefined;
        user.otpExpiry=undefined;
        await user.save();
        return res.json({message:"Password reset successfully"});
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

