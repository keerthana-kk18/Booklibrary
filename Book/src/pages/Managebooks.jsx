import React, { useEffect } from 'react'
import {MdOutlineModeEdit , MdDelete, MdAdd} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import book1 from '../images/book1.jpg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

const apiurl=import.meta.env.VITE_BACKEND_URL;


export const Managebooks = ({setactive,seteditbook}) => {
    const[books,setbooks]=useState([])
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get(`${apiurl}/api/books/getall`)
                setbooks(response.data)
            }catch(error){
                console.error("fetching error",error); 
            }
        }
        fetchdata();
    },[])

    const handleedit=(book)=>{
        seteditbook(book)
        setactive('edit')
    }

    const handledelete=async(id)=>{
        try{
            await axios.delete(`${apiurl}/api/books/delete/${id}`)
            const updateddatas=books.filter((book)=>book._id!==id)
            setbooks(updateddatas)
            alert("Book deleted")
        }catch(error){
            console.error("Delete error:",error);
            alert("Deletion failed")
            
        }
    }

  return (
    <div className='p-8 min-h-screen'>
        <div className='flex justify-between items-center mb-8'>
            <button onClick={()=>setactive('add')} className='flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold '>
                <MdAdd size={20} />
                Add Book
            </button>
        </div>

        <div className='bg-white rounded-xl shadow-2xl overflow-hidden'>
            <table className='w-full text-left'>
                <thead className='border-b border-gray-800'>
                    <tr>
                        <th className='p-5 text-black'>Book</th>
                        <th className='p-5 text-black'>Author</th>
                        <th className='p-5 text-black'>Genre</th>
                        <th className='p-5 text-black'>Year</th>
                        <th className='p-5 text-black'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id} className='border-b border-gray-300'>
                            <td className='p-5 flex items-center gap-4'>
                                <img src={book.image} alt={book.title} className='w-12 h-16 '></img>
                                <span className='font-semibold text-slate-800'>{book.title}</span>
                            </td>
                            <td className='p-5 text-slate-600'>{book.author}</td>
                            <td className='p-5 text-slate-600'>{book.genre}</td>
                            <td className='p-5 text-slate-600'>{book?.year}</td>
                            <td className='p-5'>
                                <div className='flex items-center justify-center gap-4'>
                                    <button onClick={()=>handleedit(book)} className='p-2 '><MdOutlineModeEdit  size={20} /></button>
                                    <button onClick={()=>handledelete(book._id)} className='p-2 text-red-600'><RiDeleteBin6Line size={20} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Managebooks
