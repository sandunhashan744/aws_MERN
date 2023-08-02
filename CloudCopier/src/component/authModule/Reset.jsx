import React, { useEffect, useRef, useState }  from 'react'
// import { RxCross2 } from 'react-icons/rx';
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import resetImg from './imgs/resetImg.png'
import { Link, useNavigate } from 'react-router-dom';
import {resetPass} from './helper/helper'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetSchema } from './validations/resetValidation';
//video
import videoBg from '../../assets/bgVideo/forex.mp4';

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

const Reset = () => {
  //get Email
  const email = localStorage.getItem('email');

  const navigate = useNavigate()
  const refReset = useRef(null);

  useEffect(() => {
    // Function to handle outside click
    function handleClickOutside(event) {
      if (refReset.current && !refReset.current.contains(event.target)) {
        //setIsClickedOutside(true);
        navigate('/get-otp')
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

  //password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //formik form submit
  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues : {
      password : '',
      confirm_password : ''
    },
    validationSchema : resetSchema,
    onSubmit : async values => {
      let resetPromise = resetPass({ email, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });
       navigate('/login')
    }
  })

  return (
    <>
    <video src={videoBg} autoPlay loop muted className='h-screen' />
    <div className="bg-transparent opacity-95 fixed inset-0 z-40 "> 

        <div className="flex h-screen justify-center items-center  ">    
            <div ref={refReset} className="flex justify-center bg-slate-200 md:py-10 py-7 md:px-8 px-4 border border-sky-900 shadow-md shadow-blue-600 rounded-2xl  ">
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className="flex md:text-2xl text-xl justify-center mb-1" >Reset Password</div>
                        <span className='py-2 text-base md:text-lg justify-center flex text-center text-slate-700'>
                            Reset Your Password
                        </span>
                    
                    <div className='flex justify-center '>
                        <img className='md:h-40 h-28 w-28 md:w-40' src={resetImg} alt='register'/>                     
                    </div>

                    {/* text box */}
                    <div className='flex justify-center '>  
                      <div className='grid grid-cols gap-1 justify-items-center'>
                        <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password ">Password</InputLabel>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                       // sx={{ color: 'white' }}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                // id='password'
                                //inputProps={{ style: { color: 'white'  } }}  
                                onChange={handleChange}
                                value={values.password}
                                className={errors.password && touched.password ? `${styles.input_error}` : `${styles.textBox}`}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password && <p className={styles.error_msg}>{errors.password}</p>}
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                          <InputLabel htmlFor="standard-adornment-password ">Confirm Password</InputLabel>
                            <Input
                                id="confirm_password"
                                type={showPassword ? 'text' : 'password'}
                               // inputProps={{ style: { color: 'white'  } }}  
                                onChange={handleChange}
                                value={values.confirm_password}
                                className={errors.confirm_password && touched.confirm_password ? `${styles.input_error}` : `${styles.textBox}`}
                                onBlur={handleBlur}
                            />
                            {errors.confirm_password && touched.confirm_password && <p className={styles.error_msg}>{errors.confirm_password}</p>}
                        </FormControl>
                        </div>
                    </div>

                    {/* button */}
                    <div className='flex justify-center '>
                      <Button type='submit' variant="contained" sx={{ mt: 1, width: '25ch', borderRadius:3}}>
                        Reset
                        <Link  to={'/login'}/>
                      </Button>
                    </div>
                </form>     
            </div>
        </div>
    </div>
    </>
  )
}

export default Reset