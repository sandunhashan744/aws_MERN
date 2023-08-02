import React, { useEffect, useState, useRef } from 'react';
import {MdVerifiedUser} from 'react-icons/md';
import OTPImg from './imgs/OTPImg.png';
import { Link, useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
import { generateOTP, verifyOTP } from './helper/helper'
import styles from './styles/style.module.css'

///mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//video
import videoBg from '../../assets/bgVideo/forex.mp4';

const OTPVerify = () => {
    
    const refOtp = useRef(null);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        // Function to handle outside click
        function handleClickOutside(event) {
          if (refOtp.current && !refOtp.current.contains(event.target)) {
            //setIsClickedOutside(true);
            navigate('/login')
          } else {
            //setIsClickedOutside(false);
          }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
    
        // Clean up the event listener when the component is unmounted
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

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
    <video src={videoBg} autoPlay loop muted className='h-screen' />
    <div className="bg-transparent opacity-95 fixed inset-0 z-40 "> 

      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex h-screen justify-center items-center  ">
          <div ref={refOtp} className="flex justify-center bg-slate-200 md:py-10 py-5 md:px-8 px-4 border border-sky-900 shadow-md shadow-blue-600 rounded-2xl  ">
              <form onSubmit={onSubmit} autoComplete='off'>
                  <div className="flex md:text-2xl text-xl justify-center mb-1" >OTP Verification</div>
                      <span className='py-2 text-base md:text-lg justify-center flex text-center text-slate-700'>
                          Enter OTP to Reset Your Password
                      </span>
                  {/* image */}
                  <div className='flex justify-center '>
                      <img className='md:h-40 h-28 w-36 md:w-48' src={OTPImg} alt='register'/>                     
                  </div>

                  {/* text box */}
                  <div className='flex justify-center '>
                    <div className='grid grid-cols gap-1 justify-items-center'>
                      <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                          <InputLabel htmlFor="standard-adornment-password ">OTP Code</InputLabel>
                          <Input
                              type='text' 
                              //id='firstName'
                              //inputProps={{ style: { color: 'white'  } }}  
                              className={styles.textBox} 
                              onChange={(e) => setOTP(e.target.value) }
                          />
                      </FormControl>
                    </div>
                  </div>
              
                  {/* button */}
                  <div className='flex justify-center '>
                    <Button type='submit' variant="contained" sx={{ mt: 1, width: '25ch', borderRadius:3}}>Verify</Button>
                  </div>

                  {/* re-send otp */}
                  <div className='flex justify-center mt-5'>
                    <span className='text-gray-900'>Can't Get OTP :<span> </span>
                      <Link onClick={resendOTP} className='text-green-600 hover:font-bold text-lg cursor-pointer '>Re-send</Link>
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