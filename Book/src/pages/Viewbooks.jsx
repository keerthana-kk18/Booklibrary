import React, { useEffect, useState } from 'react'
import { MdLocalLibrary,MdSearch } from "react-icons/md";
import imgg from '../images/viewbg3.png'
import { LuLogOut } from "react-icons/lu";
import book1 from '../images/book1.jpg'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'

const Viewbooks = () => {
    const navigate=useNavigate();
    const[books,setbooks]=useState([]);
    const[search,setsearch]=useState("")
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get('http://localhost:4000/api/books/getall')
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

            <button onClick={handlelogout} className="flex items-center gap-1 font-semibold text-red-600"
            style={{marginRight:'80px'}}>
              <LuLogOut size={20} />
              <span>Logout</span>
            </button>

        </nav>
        <div className='w-full h-[400px] flex items-center justify-center' style={{backgroundImage:  `url(${imgg})`, backgroundSize: 'cover'}}>
            <h2 className='text-white font-bold text-6xl text-center '><i>EXPLORE<br></br> THE WORLD OF BOOKS</i></h2>
        </div>
        <div className='flex justify-center mt-[50px] z-10 relative'>
        <div className='relative w-full max-w-2xl'>
            <MdSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={24}/>
            <input type='text' placeholder='Search by name or author' className='w-full pl-10 pr-4 py-3 rounded-xl shadow-2xl text-black border border-gray-500' value={search} onChange={(e)=>setsearch(e.target.value)}></input>
        </div>
        </div>
        <div className='max-w-8xl mx-auto py-16 lg:px-20'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-16 justify-items-center'>
                {searchbooks.map((book) => (
                    <div key={book._id} className='bg-white rounded-lg shadow-2xl overflow-hidden hover:scale-105 duration-300 flex flex-col '>
                        <div className='h-70 w-full overflow-hidden flex justify-center py-4'>
                            <img src={book.image} alt={book.title} className='w-[150px] h-full  object-contain mt-4'/>
                        </div>
                        <div className='p-6 flex flex-col text-center'>
                            <h3 className='text-xl font-bold text-black mb-1'>{book.title}</h3>
                            <p className='text-gray-600 italic mb-6 text-sm'>{book.author}</p>
                            <button onClick={()=>navigate(`/viewdetails/${book._id}`)} className='mt-auto bg-blue-500 text-white px-16 py-2 rounded-xl'>View Details</button>
                        </div>
                   </div>
                ))}
            </div>
       </div>
    </div>
  )
}

export default Viewbooks