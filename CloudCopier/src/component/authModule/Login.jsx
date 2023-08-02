import React, { useRef, useEffect, useState } from 'react';
import {AiOutlineLogin} from 'react-icons/ai';
import { Link, useNavigate  } from 'react-router-dom';
import loginImg from './imgs/login.png';
import styles from './styles/style.module.css';
import { useFormik } from 'formik';
import { loginSchema } from './validations/loginValidation';
import toast, { Toaster} from 'react-hot-toast'; 
import { login, getUser } from './helper/helper';
import videoBg from '../../assets/bgVideo/forex.mp4';

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

const Login = () => {

    const navigate = useNavigate();

    const inputRef = useRef(null);

    const refSign = useRef(null);

    //password visibility
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    //outside click
    useEffect(() => {
        // Function to handle outside click
        function handleClickOutside(event) {
          if (refSign.current && !refSign.current.contains(event.target)) {
            //setIsClickedOutside(true);
            navigate('/')
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

    //email check
    const handleClick = () => {
        //event.preventDefault();
        const email = inputRef.current.value; 
        console.log(email)
        if(!email){
            toast.error(<b>Email must be Required..!</b>);
            inputRef.current.focus()
        }else{
            getUser({email})
            .then((user) => {
                if(user.status===404){
                    toast.error(<b>User Email is Invalied..!</b>);
                    inputRef.current.focus() 
                }
                else{
                    localStorage.setItem('email', email);
                    navigate('/get-otp') 
                }
            })
            .catch(error =>{
                toast.error('User Not Founded..!');
            })
        }
    };
  
    //formik submit
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} =  useFormik({
        initialValues :{
            email : '',
            password : ''
        },
        validationSchema : loginSchema,
        onSubmit : async values => {
            let loginPromise = login(values);
            toast.promise(loginPromise, {
                loading : 'loding...',
                success : <b>Login Successful..🙂</b>,
                error : <b>Email or Password Incorrect❗</b>
            });

            loginPromise.then(res => {
                let {token, email} = res.data;
               //console.log(email)
                localStorage.setItem('token', token);
                //check the user roll
                getUser({email})
                .then(res =>{
                    console.log(res)
                    let {userRoles, permissions} = res.data

                    localStorage.setItem('userRole', userRoles);
                    localStorage.setItem('permission', permissions);
                   
                    if (userRoles === 1) {
                        navigate('/subscriber');
                      } else if (userRoles === 2 || userRoles === 22) {
                        window.location.href='/provider'
                      } else if (userRoles === 3 || userRoles === 5) {
                        window.location.href='/admin'
                      } else if (userRoles === 4) {
                        window.location.href='/superUser'
                      } else {
                        console.log('Invalid user role');
                      }
                })
            });
        }
    })
    
  return (
    <>
    <video src={videoBg} autoPlay loop muted className='h-screen' />
    {/* <div className="container"> */}
    <div className="bg-transparent opacity-95 fixed inset-0 z-40 "> 
        
        {/* toast message */}
        <Toaster position='top-center' reverseOrder={false} />
        
        <div className="flex h-screen justify-center items-center">
            <div ref={refSign} className="justify-center bg-slate-200 md:py-10 py-5 md:px-8 px-2 border border-sky-900 shadow-md shadow-blue-600 rounded-2xl">
                <form  onSubmit={handleSubmit} >
                    <div className="flex md:text-xl text-lg justify-center text-zinc-900 md:mb-1" >Welcome</div>
                        <span className='py-2 text-base md:text-lg justify-center flex text-center text-slate-700'>
                            Explore More by connecting with us
                        </span>

                    {/* image */}
                    <div className='flex justify-center '>
                        <img className='md:h-40 h-28 w-28 md:w-40' src={loginImg} alt='register'/>                     
                    </div>

                    {/* text box */}
                    <div className='flex justify-center '>
                        <div className='grid grid-cols gap-0 justify-items-center'>
                        
                        {/* Meterial UI */}
                            {/* email */}
                            <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password " >Email</InputLabel>
                                <Input
                                    type='email' 
                                    id='email'
                                    //ref={inputRef}
                                    inputRef={inputRef}
                                    //inputProps={{ style: { color: 'white'  } }}  
                                    onChange={handleChange}
                                    value={values.email}
                                    className={errors.email && touched.email ? `${styles.input_error}` : `${styles.textBox}`}
                                    onBlur={handleBlur}
                                />
                                 {errors.email && touched.email && <p className={styles.error_msg}>{errors.email}</p>}
                            </FormControl>

                            {/* pasword field */}
                            <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password " >Password</InputLabel>
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
                        </div>
                    </div>

                    {/* button */}
                    <div className='flex justify-center '>
                        {/* <Button type='submit' className={styles.btn} >
                            Login <AiOutlineLogin size={20} className='ml-2'/> 
                        </Button> */}
                        <Button type='submit' variant="contained" sx={{ mt: 1, width: '25ch', borderRadius:3}}>Log In</Button>
                    </div>

                    <div className='flex justify-center mt-3'>
                        <span className='text-gray-900'>Not a Member :<span> </span>
                            <Link className='text-green-600 hover:font-bold text-lg  cursor-pointer '  to="/register">Sign Up</Link>
                        </span>
                    </div>

                </form> 

                {/* forget password */}
                <div className='flex justify-center'>
                    <div className='flex justify-center'>
                        <button onClick={handleClick} className='text-red-600 hover:font-bold pt-2'>Forget Password</button>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    </>
  )
}

export default Login