import React from 'react';
import { useNavigate } from 'react-router-dom';
import videoBg from '../../assets/bgVideo/forex.mp4';
import Typewriter from 'typewriter-effect';
import { AiOutlineLogin} from 'react-icons/ai';
import { CgChevronDoubleDown} from 'react-icons/cg';

const Hero = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  function handleLogin() {
    
    if (!token) {
      navigate('/login');
    } else {
      
      if (role === '1') {
        navigate('/profile');

      } else {
       
        navigate('/provider-profile');
      }
    }
    

  }

  //scroll down
  function handleClick() {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  return (
    <div className=' mt-0'>
      {/* User Login */}
      <div className='absolute z-20 md:px-10 px-5 py-7' style={{right: 0}} >
        <div onClick={handleLogin} className='border-2 border-slate-300  px-2 py-2 md:px-3  text-slate-100 items-center flex rounded-3xl cursor-pointer'> 
          <button  className='mx-1 text-base md:text-lg'>Login</button>
          <AiOutlineLogin size={20} className='animate-pulse' />
        </div>
      </div>

      <div className='absolute flex justify-center md:items-baseline items-center mt-44 md:h-screen md:w-full text-cyan-100 '>
        <div className='grid grid-cols-1 mx-5'>
        
          <h3 className='md:text-4xl text-2xl mb-7 '>Welcome to</h3>
          <h1 className='mb-10 text-4xl md:text-7xl font-bold md:py-4'>
          Tradecopier Cloud Trading  
          </h1>
          <div className='md:text-5xl text-2xl font-semibold text-cyan-200 md:ml-3 ml-1'>
            <Typewriter
              options={{
                strings: [
                  ' Make Passive Income', 
                  ' Real Time Trading', 
                  ' Don`t Miss Any Signal', 
                  ' Maximize Your Profit'
                ],
                autoStart: true,
                loop: true,
                delaySpeed:900
              }}
            />
          </div>

          <div onClick={handleClick} className='pt-32 md:text-2xl font-bold text-xl md:ml-3 flex justify-center items-end cursor-pointer'>
           <div className='animate-bounce md:text-7xl text-6xl ml-2'>< CgChevronDoubleDown/> </div>
          </div>
        </div>
      </div>
      <video src={videoBg} autoPlay loop muted className='h-screen' />

    </div>
  )
}

export default Hero