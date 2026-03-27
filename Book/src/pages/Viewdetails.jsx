import React, { useEffect, useState } from 'react'
import book1 from '../images/book1.jpg'
import { MdLocalLibrary } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

const Viewdetails = () => {
    const{id}=useParams();
    const [book,setbook]=useState(null);
    const[loading,setloading]=useState(true);
    useEffect(()=>{
        const fetchdetails=async()=>{
            try{
                const response=await axios.get(`http://localhost:4000/api/books/get/${id}`)
                setbook(response.data)
                setloading(false)
            }catch(error){
                console.error("fetching error", error);
                setloading(false)
            }
        }
        fetchdetails();
    },[id])
    if(loading){
        return(
            <div className='h-screen flex items-center justify-center text-2xl font-medium'>Loading Details</div>
        )
    }
    if(!book){
        return(
            <div className='h-screen flex items-center justify-center text-2xl font-medium'>Book not found</div>
        )
    }

    const handlelogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        alert("logged out")
        navigate('/')
    }


  return (
    <div className='min-h-screen'>
        <nav className='flex items-center justify-between h-16 bg-white shadow-2xl'>
                    <div style={{marginLeft:'80px'}}>
                        <h2 className='text-2xl font-bold flex'><MdLocalLibrary size={30}/>
                        <span>BookNova</span>
                        </h2>
                    </div>
                    <div className='flex gap-10'>
                        <Link to='/viewbooks'>
                            <button className='text-slate-600 font-medium text-lg'>Library</button>
                        </Link>
                        <Link to='/dashboard'>
                            <button className='text-slate-600 font-medium text-lg'>Dashboard</button>
                        </Link>
                    </div>
        
                    <button  onClick={handlelogout}  className="flex items-center gap-1 font-semibold text-red-600"
                    style={{marginRight:'80px'}}>
                      <LuLogOut size={20} />
                      <span>Logout</span>
                    </button>
        
                </nav>
        
        <div className='max-w-5xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden'
        style={{marginTop:'50px', marginBottom:'50px'}}>
            <div className='flex flex-col md:flex-row'>
                <div className='md:w-1/3'> 
                    <img src={book.image} alt={book.title} className='w-full h-full object-contain'
                    style={{marginLeft:'50px', marginTop:'50px'}}/>
                </div> 
                <div className='md:w-2/3 p-8 md:p-12 flex flex-col justify-center'
                style={{marginLeft:'100px'}}>
                    <h1 className='text-4xl font-bold text-black mb-4'>{book.title}</h1>
                    <div className='space-y-4'>
                        <p className='text-xl text-gray-600'>
                            <span className='font-bold text-slate-700'>Author:</span> {book.author}
                        </p>
                        <p className='text-xl text-gray-600'>
                            <span className='font-bold text-slate-700'>Genre:</span> {book.genre}
                        </p>
                        <p className='text-xl text-gray-600'>
                            <span className='font-bold text-slate-700'>Published Year:</span> {book.year}
                        </p>
                    </div>
                    </div>
        </div>
        <div className='p-8 md:p-12' style={{marginTop:'40px'}}>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Description</h2>
            <p className='text-lg text-gray-600'>{book.description}</p>
        </div>
    </div>
    </div>
  )
}

export default Viewdetails