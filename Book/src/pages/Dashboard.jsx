import React, { useState } from 'react'
import { MdLocalLibrary, MdDashboard, MdAutoStories, MdClose, MdMenu } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link,useNavigate } from 'react-router-dom';
import  {Managebooks}  from './Managebooks';
import Addbooks from './Addbooks';
import { Editbook } from './Editbook';


const Dashboard = () => {
    const navigate=useNavigate();
    const[active, setactive] = useState('Dashboard');
    const[editbook,seteditbook]=useState(null);
    const[sidebar,setsidebar]=useState(false);

    const handlelogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        alert("logged out")
        navigate('/')
    }

    return (
    <div className='flex min-h-screen '>
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#dc143c] text-white flex flex-col transition-transform duration-300 ease-in-out transform
        ${sidebar?'translate-x-0':'-translate-x-full'} md:relative md:translate-x-0 md:flex`}>
            <div className='p-6 border-b border-white/50'>
                <h2 className='text-2xl font-bold flex items-center gap-2'>
                    <MdLocalLibrary size={30} className='text-white'/>
                    <span>BookNova</span>
                </h2>
                <button className='md:hidden' onClick={()=>setsidebar(false)}><MdClose size={28}/></button>
            </div>
            <nav className='flex-1 p-4 mt-4'>
                <ul className='space-y-2'>
                    {/* <li>
                        <button className='flex items-center gap-3 w-full p-3 text-lg'>
                            <MdDashboard size={20} />
                            <span>Dashboard</span>
                            </button>
                            </li> */}
                    <li>
                        
                        <button onClick={()=> setactive('manage')} className={`flex items-center gap-3 w-full p-3 text-lg rounded-2xl ${active === 'manage' ? 'bg-white text-[#dc143c]' : ''}`}>
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
        {sidebar && (
            <div className='fixed inset-0 bg-black/50 z-40 md:hidden' onClick={()=>setsidebar(false)}></div>
        )}
        <div className='flex-1 flex flex-col'>
            <header className='flex items-center justify-center h-16 bg-white shadow-xl px-10'>
                <div className='flex-1 md:hidden'>
                <button className=' text-[#dc143c]' onClick={()=>setsidebar(true)}><MdMenu size={32}/></button>
                </div>

                <div className='flex gap-8'>
                    <div className='flex gap-5 md:gap-8 items-center'>
                       <Link to='/viewbooks'>
                            <button className={` font-medium text-lg ${location.pathname==='/viewbooks'?'text-black':'text-slate-500'}`}>Library</button>
                        </Link>
                        <Link to='/dashboard'>
                            <button className={` font-medium text-lg ${location.pathname==='/dashboard'?'text-black':'text-slate-500'}`}>Dashboard</button>
                        </Link>
                    </div>
                </div>
                <div className='w-8 md:hidden'></div>
            </header> 

            <main className='p-4 md:p-10 flex-1 bg-amber-50'>
                {active==='manage' && <Managebooks setactive={setactive} seteditbook={seteditbook}/>}
                {active==='add' && <Addbooks setactive={setactive}/>}
                {active==='edit' && editbook &&(<Editbook book={editbook} setactive={setactive}/>)}
            </main>
        </div>
    </div>
  )
}

export default Dashboard