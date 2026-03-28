import React from 'react'
import img from '../images/bookbg2.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const apiurl=import.meta.env.VITE_BACKEND_URL;


const Login = () => {
  const navigate=useNavigate();
  const[showpassword,setshowpassword]=useState(false);
  const[formdata,setformdata]=useState({
    email:'',
    password:''
  })

  const handlechange=(e)=>{
    setformdata({...formdata,[e.target.name]:e.target.value});
  }

  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post(`${apiurl}/api/users/login`,formdata);
      alert(response.data.message);
      localStorage.setItem('user',JSON.stringify(response.data.user))
      navigate('/viewbooks');
    }catch(error){
      alert(error.response?.data?.message||"Login failed");
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center'
    style={{backgroundImage: `url(${img})`, backgroundSize:"cover", backgroundPosition:"center"}}>
        <div className='flex flex-col items-center  rounded-2xl bg-black/50  w-[95%] sm:w-[500px]  h-[500px] p-6 sm:p-10'>
            <h1 className='text-white text-3xl text-center font-bold' style={{marginTop:'20px'}}>Log In</h1>
            <form onSubmit={handlesubmit} className='flex flex-col mt-[50px] w-full '>
                <label className='text-white text-lg'>Email</label>
                <input type="text" name='email' value={formdata.email} onChange={handlechange} placeholder="Enter your email" className='bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc143c] rounded-xl   h-[50px] px-4 mb-4'/>
                <label className='text-white text-lg'>Password</label>
                <div className='relative w-full flex items-center'>
                <input type={showpassword?"text":"password"} name='password' value={formdata.password} onChange={handlechange} placeholder="Enter your password" className='bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#dc143c] rounded-xl h-[50px] px-4 w-full'/>
                <button type='button' onClick={()=> setshowpassword(!showpassword)} className='absolute right-4 top-1/2 transform -translate-y-1/2 text-white'>
                  {showpassword?<IoEyeOffOutline size={22}/>:<IoEyeOutline size={22}/>}
                </button>
                </div>
                <button type="submit" className='bg-[#dc143c]  text-white font-bold h-[50px] px-4 rounded-xl mt-[50px] text-xl'>Log In</button>
            </form>
            <div className='text-center text-sm text-white/50 mt-5'>Don't have an account?
            <Link to="/signup" >
            <span className='text-white'>Sign Up</span></Link>
            </div>
        </div>

    </div>
  )
}

export default Login