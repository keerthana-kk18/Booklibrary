import React, { useEffect, useState } from 'react'
import book1 from '../images/book1.jpg'
import { MdLocalLibrary,MdMenu,MdClose } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'

const apiurl=import.meta.env.VITE_BACKEND_URL;


const Viewdetails = () => {
    const navigate=useNavigate();
    const{id}=useParams();
    const [book,setbook]=useState(null);
    const[loading,setloading]=useState(true);
    const[open,setopen]=useState(false);
    useEffect(()=>{
        const fetchdetails=async()=>{
            try{
                const response=await axios.get(`${apiurl}/api/books/get/${id}`)
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
         <nav className='flex items-center justify-between h-16 bg-white shadow-2xl px-6 lg:px-20 relative z-50'>
                    <div className='flex items-center gap-2'>
                        <MdLocalLibrary size={30} />
                        <span className='text-2xl font-bold '>BookNova</span>
                    </div>
                    <div className='hidden md:flex items-center gap-10'>
                        <Link to='/viewbooks'>
                            <button className={` font-medium text-lg ${location.pathname==='/viewbooks'?'text-black':'text-slate-500'}`}>Library</button>
                        </Link>
                        <Link to='/dashboard'>
                            <button className={` font-medium text-lg ${location.pathname==='/dashboard'?'text-black':'text-slate-500'}`}>Dashboard</button>
                        </Link>
                    </div>
        
                    <button onClick={handlelogout} className="hidden md:flex items-center gap-1 font-semibold text-red-600 ml-4">
                      <LuLogOut size={20} />
                      <span>Logout</span>
                    </button>
        
                    <div className='md:hidden'>
                        <button onClick={()=>setopen(!open)} className='text-slate-800 focus:outline-none'>
                            {open?<MdClose size={32}/>:<MdMenu size={32}/>}
                        </button>
                    </div>
                </nav>
        
                {open && (
                    <div className='absolute top-16 right-6 w-64 bg-white shadow-2xl rounded-xl z-50 p-5 md:hidden flex flex-col gap-4 mt-4'>
                        <Link to='/viewbooks' onClick={()=>setopen(false)} className='text-lg font-medium text-slate-800  pb-2'>Library</Link>
                        <Link to='/dashboard' onClick={()=>setopen(false)} className='text-lg font-medium text-slate-800  pb-2'>Dashboard</Link>
                        <button onClick={handlelogout} className='flex items-center gap-2 font-bold text-red-600 pt-1'>
                            <LuLogOut size={20}/>
                            <span>Logout</span>
                        </button>
                        </div>
                )}
        <div className='bg-amber-50 min-h-screen md:py-12 py-8 px-4'>
        <div className='max-w-5xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden my-8 md:my-[50px]'>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/3 flex justify-center'> 
                    <img src={book.image} alt={book.title} className='w-48 h-auto md:w-full md:h-full object-contain p-6  md:ml-[50px] md:mt-[50px]'/>
                </div> 
                <div className='w-full md:w-2/3 p-6 md:p-36 flex flex-col justify-center md:ml[100px]'>
                    <h1 className='text-3xl md:text-4xl font-bold text-black mb-4 text-center md:text-left'>{book.title}</h1>
                    <div className='space-y-4 text-center md:text-left'>
                        <p className='text-lg md:text-xl text-gray-600'>
                            <span className='font-bold text-slate-700'>Author:</span> {book.author}
                        </p>
                        <p className='text-lg md:text-xl text-gray-600'>
                            <span className='font-bold text-slate-700'>Genre:</span> {book.genre}
                        </p>
                        <p className='text-lg md:text-xl text-gray-600'>
                            <span className='font-bold text-slate-700'>Published Year:</span> {book.year}
                        </p>
                    </div>
                    </div>
        </div>
        <div className='p-6 md:p-14'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>Description</h2>
            <p className='text-lg text-gray-600'>{book.description}</p>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Viewdetails