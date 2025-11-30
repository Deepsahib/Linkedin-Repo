import express from "express";
import getdb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
const app=express();
app.use(express.json());
app.use(cookieParser());
import authrouter from './routes/authroutes.js'
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/api/auth",authrouter)
app.listen(3000,()=>{
    console.log("Server has been started bruh")
    getdb();
     
})
