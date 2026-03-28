import React from 'react'
import img from '../images/bookbg2.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const apiurl=import.meta.env.VITE_BACKEND_URL;


const Signup = () => {
  const navigate=useNavigate();
    const[showpassword,setshowpassword]=useState(false);
    const[showconfirmpassword,setshowconfirmpassword]=useState(false);

    const[formdata,setformdata]=useState({
    name:'',
    email:'',
    password:'',
    confirmpassword:''
  })

   const handlechange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value});
   }

   const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post(`${apiurl}/api/users/signup`,formdata);
      alert(response.data.message);
      navigate('/');
    }catch(error){
      alert(error.response?.data?.message);
    }
   }
  return (
    <div className='min-h-screen flex items-center justify-center'
    style={{backgroundImage: `url(${img})`, backgroundSize:"cover", backgroundPosition:"center"}}>
        <div className='flex flex-col items-center  rounded-2xl bg-black/50  w-[95%] sm:w-[500px]  h-[700px] p-6 sm:p-10'>
            <h1 className='text-white text-3xl text-center font-bold' style={{marginTop:'20px'}}>Sign Up</h1>
            <form onSubmit={handlesubmit} className='flex flex-col mt-[50px] w-full '>
                <label className='text-white text-lg'>Name</label>
                <input type="text" name='name' value={formdata.name} onChange={handlechange} placeholder="Enter your name" className='bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc143c] rounded-xl   h-[50px] px-4 mb-4'/>
                <label className='text-white text-lg'>Email</label>
                <input type="text"name='email' value={formdata.email} onChange={handlechange} placeholder="Enter your email" className='bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc143c] rounded-xl   h-[50px] px-4 mb-4'/>
                <label className='text-white text-lg'>Password</label>
                <div className='relative w-full flex items-center'>
                <input type={showpassword?"text":"password"} name='password' value={formdata.password} onChange={handlechange} placeholder="Enter your password" className='bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc143c] rounded-xl h-[50px] px-4 w-full'/>
                <button type='button' onClick={()=> setshowpassword(!showpassword)} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white'>
                  {showpassword?<IoEyeOffOutline size={22}/>:<IoEyeOutline size={22}/>}
                </button>
                </div>    
                <div className='mb-4'></div>          
                <label className='text-white text-lg'>Confirm Password</label>
                <div className='relative w-full flex items-center'>
                <input type={showconfirmpassword?"text":"password"} name='confirmpassword' value={formdata.confirmpassword} onChange={handlechange} placeholder="Confirm your password" className='bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc143c] rounded-xl h-[50px] px-4 w-full'/>
                <button type='button' onClick={()=> setshowconfirmpassword(!showconfirmpassword)} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white'>
                {showconfirmpassword?<IoEyeOffOutline size={22}/>:<IoEyeOutline size={22}/>}
                </button>
                <div className='mb-4'></div>
                </div>

                <button type="submit" className='bg-[#dc143c] text-white text-xl font-bold h-[50px] px-4 rounded-xl mt-[30px]'>Sign Up</button>
            </form>
            <div className='text-center text-sm text-white/50 mt-5'>Already have an account?
            <Link to="/" >
            <span className='text-white'>Log In</span></Link>
            </div>
        </div>

    </div>
  )
}

export default Signup