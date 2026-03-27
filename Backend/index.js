import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userroutes from './routes/userroutes.js';
import bookroutes from './routes/bookroutes.js';



dotenv.config();
const app=express();
app.use(cors());
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://booklibrary-biuu.onrender.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/users',userroutes);
app.use('/api/books',bookroutes);

const PORT=process.env.PORT||4000;
const url=process.env.url;
mongoose.connect(url).then(()=>{
    console.log("connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`server running on http://localhost:${PORT}`); 
    });  
})
.catch((err)=>{
    console.error("Database connection error:",err);
    
});