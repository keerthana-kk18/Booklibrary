import Users from "../models/users.js";
import bcrypt from "bcrypt";

export const signup=async(req,res)=>{
    try{
        const{name,email,password,confirmpassword}=req.body;
        if(!name||!email||!password||!confirmpassword){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password!==confirmpassword){
            return res.status(400).json({message:"passwords does not match"});
        }
        const userexist=await Users.findOne({email});
        if(userexist){
            return res.status(400).json({message:"user already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser=new Users({name,email,password:hashedpassword});
        await newuser.save();
        res.status(201).json({message:"user signup successfully"});
    } catch (error) {
        res.status(500).json({message:"signup error",error:error.message});
    }
}

export const login=async(req,res)=>{
    try{  
        const{email,password}=req.body;
        const user=await Users.findOne({email});
        if(!user){
            return res.status(401).json({message:"invalid email or password"});
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({message:"invalid email or password"});
        } 
         res.status(200).json({message:"Login successful",user:{id:user._id,name:user.name,email:user.email}});
    } catch(error){
        res.status(500).json({message:"Login error"});
    }
}