import React, { useState } from 'react'
import { MdLocalLibrary, MdDashboard, MdAutoStories } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link } from 'react-router-dom';
import  {Managebooks}  from './Managebooks';
import Addbooks from './Addbooks';
import { Editbook } from './Editbook';


const Dashboard = () => {
    const[active, setactive] = useState('Dashboard');
    const[editbook,seteditbook]=useState(null);

    const handlelogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        alert("logged out")
        navigate('/')
    }

    return (
    <div className='flex min-h-screen '>
        <aside className='w-64 bg-blue-700 text-white flex flex-col'>
            <div className='p-6 border-b border-white/50'>
                <h2 className='text-2xl font-bold flex items-center gap-2'>
                    <MdLocalLibrary size={30} className='text-white'/>
                    <span>BookNova</span>
                </h2>
            </div>
            <nav className='flex-1 p-4 mt-4'>
                <ul className='space-y-2'>
                    <li>
                        <button className='flex items-center gap-3 w-full p-3 text-lg'>
                            <MdDashboard size={20} />
                            <span>Dashboard</span>
                            </button>
                            </li>
                    <li>
                        
                        <button onClick={()=> setactive('manage')} className={`flex items-center gap-3 w-full p-3 text-lg rounded-2xl ${active === 'manage' ? 'bg-white text-blue-600' : ''}`}>
                            <MdAutoStories size={20} />
                            <span>Manage Books</span>
                        </button>
                        
                    </li>
                </ul>
            </nav>
            <div className='p-4 border-t border-white/20'>
                <button onClick={handlelogout} className='flex items-center gap-3 w-full p-3 text-lg text-red-600 bg-white rounded-xl'>
                    <LuLogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
        <div className='flex-1 flex flex-col'>
            <header className='flex items-center justify-center h-16 bg-white shadow-xl px-10'>

                <div className='flex gap-8'>
                    <div className='flex gap-5 items-center'>
                        <Link to='/viewbooks'>
                    <button className='text-slate-600 font-medium text-lg'>Library</button>
                </Link>
                <Link to='/dashboard'>
                    <button className='text-slate-600 font-medium text-lg'>Dashboard</button>
                </Link>
                    </div>
                </div>
            </header> 

            <main className='p-10 flex-1'>
                {active==='manage' && <Managebooks setactive={setactive} seteditbook={seteditbook}/>}
                {active==='add' && <Addbooks setactive={setactive}/>}
                {active==='edit' && editbook &&(<Editbook book={editbook} setactive={setactive}/>)}
            </main>
        </div>
    </div>
  )
}

export default Dashboard