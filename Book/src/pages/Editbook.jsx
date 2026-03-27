import React, { useState } from 'react'
import axios from 'axios'

export const Editbook = ({book,setactive}) => {
    const[bookdata,setbookdata]=useState({
        title:book.title,
        author:book.author,
        genre:book.genre,
        year:book.year,
        description:book.description
    })
    const[file,setfile]=useState(null)
    const[img,setimg]=useState(book.image)

    const handlechange=(e)=>{
        setbookdata({...bookdata,[e.target.name]:e.target.value})
    }

    const handlefile=(e)=>{
        const selected=e.target.files[0]
        setfile(selected)
        setimg(URL.createObjectURL(selected))
    }

    const handleedit=async(e)=>{
        e.preventDefault()
        const data=new FormData();
        data.append('title',bookdata.title);
        data.append('author',bookdata.author);
        data.append('genre',bookdata.genre);
        data.append('year',bookdata.year);
        data.append('description',bookdata.description);
        if(file)data.append('image',file);
        console.log("Updating book ID:",book._id);
        
            try{
                const response=await axios.put(`http://localhost:4000/api/books/update/${book._id}`,data)
                alert("updated successfully")
                setactive('manage')
            }catch(error){
                console.error("server error details:",error.response?.data);
                const errormessage=error.response?.data?.message||error.message;
                
            alert("Updation failed:"+errormessage) //actual code
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-white p-8 rounded-2xl w-full max-w-7xl mb-[200px]'>
            <form onSubmit={handleedit} className='space-y-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Book Name</label>
                        <input type='text' name='title' value={bookdata.title} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Author</label>
                        <input type='text' name='author' value={bookdata.author} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></input>
                    </div>
                </div>
                 <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Genre</label>
                        <input type='text' name='genre' value={bookdata.genre} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Publication Year</label>
                        <input type='number' name='year' value={bookdata.year} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></input>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Description</label>
                        <textarea name='description' value={bookdata.description} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></textarea>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Book Image</label>
                        <div className='flex items-center gap-4 p-3 border border-gray-400 rounded-xl'>
                            <img src={img} alt='current image' className='w-16 h-20 object-cover rounded shadow-md'></img>
                            <div className='flex flex-col gap-1'>
                                <input type='file' accept='image/*' onChange={handlefile}  className='text-black rounded-xl p-3 border border-gray-400'></input>
                            </div>

                        </div>
                    </div>
                </div>
               <div className='flex flex-row gap-4'>
                    <button type='submit' className='w-[200px] bg-blue-600 text-white py-3 rounded-xl'>Update</button>
                    <button type='button' onClick={()=>setactive('manage')} className='w-[200px] bg-gray-200 text-black py-3 px-8 rounded-xl'>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}
