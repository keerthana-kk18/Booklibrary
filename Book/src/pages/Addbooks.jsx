import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Managebooks from './Managebooks'

const Addbooks = ({setactive}) => {
    const navigate=useNavigate();
    const[file,setfile]=useState(null);
    const[books,setbooks]=useState({
        title:'',
        author:'',
        genre:'',
        year:'',
        description:''
    })
    const handlechange=(e)=>{
        setbooks({...books,[e.target.name]:e.target.value});
    };

    const handlefile=(e)=>{
        setfile(e.target.files[0])
    }

    const handlesubmit=async(e)=>{
        e.preventDefault();
        const data=new FormData();
        data.append('title', books.title)
        data.append('author', books.author)
        data.append('genre', books.genre)
        data.append('year', books.year)
        data.append('description', books.description)

        if(file){
            data.append('image',file)
        }
        try{
            const response=await axios.post('http://localhost:4000/api/books/add',data,{
               headers:{'Content-Type':'multipart/form-data'}
            })
            console.log("Success",response.data);
            alert("Book added successfully")
            navigate('/dashboard')
        }catch(error){
            console.error("add failed",error);
            
            alert(error.response?.data?.message || "Failed to add book" )
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
        <div className='bg-white p-8 rounded-2xl shadow-2xl w-full max-w-7xl  mb-[200px]'>
            <form onSubmit={handlesubmit} className='space-y-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Book Name</label>
                        <input type='text' name='title' value={books.title} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Author</label>
                        <input type='text' name='author'  value={books.author} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></input>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Genre</label>
                        <input type='text' name='genre'  value={books.genre} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></input>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Publication Year</label>
                        <input type='number' name='year'  value={books.year} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></input>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Description</label>
                        <textarea  name='description'  value={books.description} onChange={handlechange} required className='text-black rounded-xl p-3 border border-gray-400'></textarea>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-black text-lg mb-2 ml-3'>Book Image</label>
                        <input type='file' accept='image/*' onChange={handlefile} required className='text-black rounded-xl p-3 border border-gray-400'></input>
                    </div>
                </div>
                <div className='flex flex-row gap-4'>
                    <button type='submit' className='w-[200px] bg-blue-600 text-white py-3 rounded-xl'>Add</button>
                    <button type='button' onClick={()=>setactive('manage')} className='w-[200px] bg-gray-200 text-black py-3 px-8 rounded-xl'>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Addbooks