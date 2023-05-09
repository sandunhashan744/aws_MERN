import React,{ useState } from 'react';
import logo from '../../assets/logo.png';
import { GoThreeBars } from 'react-icons/go';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import navStyle from './css/navstyle.module.css';
import { NavLink, Link } from "react-router-dom";

import img from './img/user.png';

const NavBar = () => {

  const [nav, setNav] = useState(false);

  const [showModal, setShowModal] = useState(false);

  // check the user is login
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
 
  const Links=[
      {id : 1, name : 'Home', href : '/' },
      {id : 2, name : 'Providers', href : '/provider' },
      {id : 3, name : 'Subscribers', href : '/subscriber' },
      {id : 4, name : 'Chanals', href : '/chanal' },
      {id : 6, name : 'Testimonial', href : '/testimonial' },
  ];

  //log-out
  const hangelLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }
  
  //login
  const hangelLogin = () => {
    setShowModal(!showModal);
  }

  return (
    <>
    <nav className="px-4 md:px-16 py-1 md:py-2 bg-gray-900 fixed w-full z-10 border-b-2 rounded-b-3xl md:rounded-b-full border-slate-300">
      <div className='flex items-center cursor-pointer justify-between'>
        <a href="/">
          <div className='flex items-center cursor-pointer'>
            
            {/* logo */}
            <div className='h-14 w-14 '>
              <img src={logo} alt="logo" />
            </div>

            {/* company Name */}
            <div className='px-2 text-slate-200 text-sm md:text-xl font-semibold'>
              <h2>Trade Copier</h2>
            </div>
          </div>
        </a>
      
        {/* links */}
        <ul className={navStyle.test}>
          {
            Links.map((links) =>(
              <NavLink 
                key={links.id} 
                to={links.href}
                className={ ({ isActive }) => (!isActive ? navStyle.link : navStyle.link_active ) }
                onClick={ () => setShowModal(false) }  
              > 
                {links.name}
              </NavLink>      
            ))
          }
        </ul>

      <div className='flex items-center'>
        {/* User */}
        <div onClick={hangelLogin} className='overflow-hidden  text-slate-300  px-2 py-1 justify-items-end'>
          
          <img src={ img  } className={navStyle.user} alt='default'/>

        </div> 

        {/* hamberg Icon*/}
        <div onClick={() => setNav(!nav) } className='cursor-pointer md:hidden text-slate-200 mx-1 z-10'>  
          {nav ? <RxCross2 size={30} /> : <GoThreeBars size={30} /> }
        </div>

      </div>

        {/* mobile hamberg menu */}
        {nav && (
          <ul className='md:hidden flex flex-col justify-center items-center w-full
              top-0 left-0 h-screen absolute bg-slate-800 text-slate-100'>
              {
                Links.map((links) =>(
                  <NavLink 
                  key={links.id} 
                  to={links.href}
                  className={ ({ isActive }) => (!isActive ? navStyle.link : navStyle.link_active ) }
                  onClick={ () => setNav(!nav) }
                  > 
                  {links.name} 
                  </NavLink>
                ))
              }
              
          </ul>
        )}
        
      </div>
   
        {/* drop-down model*/}
        {showModal ? ( 
        <div className="fixed inset-3 mt-14" onClick={hangelLogin} > 
          <div className="flex justify-end my-2 mr-10 items-start">
            <div className="justify-center bg-slate-900 py-3 px-3  border border-slate-300 shadow-md rounded-b-3xl">
              <div className='grid grid-col-1 justify-center text-slate-200 gap-4 '>
                
                {/* check user-roll */}
                {/* profile */}
                {role==='2' ?
                  (<div className='flex justify-start items-center hover:text-green-500'>
                    <FaRegUserCircle size={20} />
                    <Link to={'/provider-profile'}  onClick={hangelLogin} className='ml-2'>Profile</Link>
                  </div>)
                :
                  (<div className='flex justify-start items-center hover:text-green-500'>
                    <FaRegUserCircle size={20} />
                    <Link to={'/profile'}  onClick={hangelLogin} className='ml-2'>Profile</Link>
                  </div>)
                }

                {/* login - logout */}
                {!token ? (
                  <div className='flex justify-start items-center hover:text-blue-500 '>
                  <AiOutlineLogin size={20} />
                  <Link to={'/login'} onClick={hangelLogin} className='ml-2'>Log In</Link>
                </div>
                ):(
                  <div className='flex justify-start items-center hover:text-red-500 '>
                  <AiOutlineLogout size={20} />
                  <Link to={'/'} onClick={hangelLogOut} className='ml-2'>Log Out</Link>
                </div>
                )}
              </div> 
            </div>
          </div>
        </div>
        ) : null}
    </nav>
    </>
  )
}

export default NavBar