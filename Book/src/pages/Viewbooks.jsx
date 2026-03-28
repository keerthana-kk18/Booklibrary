import React, { useEffect, useState } from 'react'
import { MdLocalLibrary,MdSearch,MdMenu,MdClose } from "react-icons/md";
import imgg from '../images/viewbg3.png'
import { LuLogOut } from "react-icons/lu";
import book1 from '../images/book1.jpg'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios'

const apiurl=import.meta.env.VITE_BACKEND_URL;

const Viewbooks = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const[books,setbooks]=useState([]);
    const[search,setsearch]=useState("")
    const[open,setopen]=useState(false);
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

    const handlelogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        alert("logged out")
        navigate('/')
    }

    const searchbooks=books.filter((book)=>{
        return(
            book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())
        )
    })

  return (
    <div className='min-h-screen relative'>
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
        <div className='w-full h-[400px] flex items-center justify-center' style={{backgroundImage:  `url(${imgg})`, backgroundSize: 'cover'}}>
            <h2 className='text-white font-bold text-6xl text-center '><i>EXPLORE<br></br> THE WORLD OF BOOKS</i></h2>
        </div>
       
        <div className='max-w-8xl mx-auto py-16 lg:px-20 bg-amber-50'>
            <div className='flex justify-center mb-25 z-10 relative px-6'>
        <div className='relative w-full max-w-2xl'>
            <MdSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ' size={24}/>
            <input type='text' placeholder='Search by name or author' className='w-full pl-10 pr-4 py-3 rounded-xl shadow-2xl text-black border bg-white border-gray-500' value={search} onChange={(e)=>setsearch(e.target.value)}></input>
        </div>
        </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-16 justify-items-center'>
                {searchbooks.map((book) => (
                    <div key={book._id} className='bg-white rounded-2xl shadow-2xl overflow-hidden hover:scale-105 duration-300 flex flex-col '>
                        <div className='h-60 w-full overflow-hidden flex justify-center py-4'>
                            <img src={book.image} alt={book.title} className='w-[150px] h-full  object-contain mt-4'/>
                        </div>
                        <div className='p-6 flex flex-col text-center'>
                            <h3 className='text-xl font-bold text-black mb-1'>{book.title}</h3>
                            <p className='text-gray-600 italic mb-6 text-sm'>{book.author}</p>
                            <button onClick={()=>navigate(`/viewdetails/${book._id}`)} className='mt-auto bg-[#dc143c] text-white px-16 py-2 rounded-xl'>View Details</button>
                        </div>
                   </div>
                ))}
            </div>
       </div>
    </div>
  )
}

export default Viewbooks