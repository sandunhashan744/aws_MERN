import React, { useEffect, useState, useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import {MdVerifiedUser} from 'react-icons/md';
import OTPImg from './imgs/OTPImg.png';
import { Link, useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
import { generateOTP, verifyOTP } from './helper/helper'
import styles from './styles/style.module.css'

const OTPVerify = () => {

    const dataFetchedRef = useRef(false);

    //  Get the email
    const email = localStorage.getItem('email');

    const [OTP, setOTP] = useState();
    const navigate = useNavigate();
  
    useEffect(() => {
  
      if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      resendOTP();
  
    }, [])

    //OTP Submit
    async function onSubmit(e){
        e.preventDefault();
        try {
          let { status } = await verifyOTP({ email : email, code : OTP })
          if(status === 201){
            toast.success('Verify Successfully!')
            return navigate('/reset')
          }  
        } catch (error) {
          return toast.error('Wrong OTP! Check email again!')
        }
    }
    
    // handler of resend OTP
    function resendOTP(){

        let sentPromise = generateOTP(email);

        toast.promise(sentPromise ,
        {
            loading: 'Sending...',
            success: <b>OTP has been send to your email!</b>,
            error: <b>Could not Send it!</b>,
        }
        );

        sentPromise.then((OTP) => {
        console.log(OTP)
        });
        
    }

  return (
    <>
    <div className="bg-gray-900 opacity-95 fixed inset-0 z-40 "> 
        <div className='absolute' style={{right: 0}}>
            <Link to={'/'} >
                <RxCross2  className= 'text-white text-3xl md:text-5xl m-10 animate-bounce cursor-pointer' /> 
            </Link>    
        </div>
        
        {/* toast message */}
        <Toaster position='top-center' reverseOrder={false} />

        <div className="flex h-screen justify-center items-center  ">
            <div className="flex justify-center bg-slate-900 md:py-10 py-5 md:px-8 px-1 border-2 border-sky-900 shadow-md shadow-blue-600 rounded-2xl  ">
                <form onSubmit={onSubmit} autoComplete='off'>
                    <div className="flex md:text-2xl text-xl justify-center text-zinc-100 mb-1" >OTP verification</div>
                        <span className='py-2 text-base md:text-lg justify-center flex text-center text-slate-400'>
                            Enter OTP to Reset Your Password
                        </span>
                    {/* image */}
                    <div className='flex justify-center '>
                        <img className='md:h-40 h-28 w-36 md:w-48' src={OTPImg} alt='register'/>                     
                    </div>

                    {/* text box */}
                    <div className='flex justify-center '>
                        <div className='grid grid-cols gap-1 justify-items-center'>
                            <input 
                            type='text' 
                            className={styles.textBox} 
                            onChange={(e) => setOTP(e.target.value) }
                            placeholder='OTP Code'
                            name="otp" 
                            />
                        </div>
                    </div>
               
                    {/* button */}
                    <div className='flex justify-center '>
                        <button className={styles.btn} type="submit">
                            Verify OTP <MdVerifiedUser size={20} className='ml-2'/> 
                        </button>
                    </div>

                    {/* re-send otp */}
                    <div className='flex justify-center mt-5'>
                        <span className='text-gray-100'>Can't Get OTP :<span> </span>
                            <Link onClick={resendOTP} className='text-green-400 hover:font-bold text-lg cursor-pointer '>Re-send</Link>
                        </span>
                    </div>

                </form>     
            </div>
        </div>
    </div>
    </>
  )
}

export default OTPVerify