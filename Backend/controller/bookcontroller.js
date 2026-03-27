import Book from '../models/books.js'
import cloudinary from '../config/cloudinary.js'

export const addbook=async(req,res)=>{
    if(!req.file){
        console.error("Upload error: no file found");
        return res.status(400).json({message:"Please upload an image"});
        
    }
    try{
        const{title,author,genre,year,description}=req.body;
        const newbook=new Book({title,author,genre,year,description,
            image:req.file.path,
            cloudinary_id:req.file.filename })

            await newbook.save();
            res.status(201).json({message:"Book added",book: newbook});
        }catch(error){
            console.error("Add book failed:",error);
            
            res.status(500).json({message:error.message});
        }
}

export const getbooks=async (req,res)=>{
    try{
        const books= await Book.find().sort({createdAt:-1});
        // console.log("Books found:",books.length);
        
        res.json(books);
    }catch(error){
        // console.error("get books error:",error.message);
        
        res.status(500).json({message:error.message});
    }
    
}

export const singlebook=async(req,res)=>{
    const {id}=req.params;
    try{
        const book=await Book.findById(id)
        if(!book){
            return res.status(404).json({message:"Book not found"});
        }
        res.json(book);
        }catch(error){
            res.status(500).json({message:error.message});

    }
}

export const editbook=async(req,res)=>{
    const{id}=req.params;
    try{
        const book=await Book.findById(id)
        const title=req.body.title;
        const author=req.body.author;
        const genre=req.body.genre;
        const year=Number(req.body.year);
        const description=req.body.description;
        let updatedata={
            title:title,
            author:author,
            genre:genre,
            year:year,
            description:description
        }

        if(req.file){
            updatedata.image=req.file.path;
            updatedata.cloudinary_id=req.file.filename;
        }
        const result=await Book.findByIdAndUpdate(id,updatedata,{new:true})
        if(result){
            res.status(200).json({message:"Updated successfully",book:result})
        }else{
            res.status(404).json({message:"Book not found"})
        }
    }catch(error){
        console.error("Update error:",error);
        res.status(500).json({message:"Server error occured"})
        
    }
} 

export const deletebook=async(req,res)=>{
    const id=req.params.id;
    try{
        const book=await Book.findById(id)
        if(!book){
            return res.status(404).json({message:"Book doesn't exist"})
        }
        if(book.cloudinary_id){
            await cloudinary.uploader.destroy(book.cloudinary_id)
            console.log("image removed from cloudinary");
        }
        await Book.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"Book deleted successfully"})
    }catch(error){
        console.error("delete error",error);
        res.status(500).json({message:"failed to delete the book"})
        
    }
}