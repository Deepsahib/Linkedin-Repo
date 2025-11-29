import express from "express";
import getdb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.listen(3000,()=>{
    console.log("Server has been started bruh")
    getdb();
    hanji vbaui 
})
