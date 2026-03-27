import mongoose from "mongoose";

const bookschema=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre:{type:String,required:true},
    year:{type:Number,required:true},
    description:{type:String,required:true},
    image:{type:String},
    cloudinary_id:{type:String}
},{timestamps:true});

export default mongoose.model('Book',bookschema);