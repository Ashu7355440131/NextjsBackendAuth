import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";

const app=express();
app.use(cors());
app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);
const start=async()=>{
    const connectDb=await mongoose.connect("mongodb+srv://ashutosh7355vns:CYTWM2k2UDaCdFDI@cluster0.nr5vm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    app.listen(9080,()=>{
        console.log(`server is listening at port ${9080}`);
    })
}

start();





/*
CYTWM2k2UDaCdFDI
mongodb+srv://ashutosh7355vns:CYTWM2k2UDaCdFDI@cluster0.nr5vm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
*/