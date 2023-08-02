import React,{useState, useEffect, useRef} from 'react';
import {AiOutlineLogout} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from './validations/registerValidation';
import styles from './styles/style.module.css';
import toast, {Toaster} from 'react-hot-toast';
import { registerUser } from './helper/helper';

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

// images
import registerImg from './imgs/register.png';
import masterImg from './imgs/master3.png';
import traderImg from './imgs/trader.png';

//video
import videoBg from '../../assets/bgVideo/forex.mp4';

const Register = () => {
    
    const navigate = useNavigate();

    const [view, setView] = useState(true);
    const [role, setRole] = useState();

    //password visibility
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const refOne = useRef(null);

    //outside click
    useEffect(() => {
        // Function to handle outside click
        function handleClickOutside(event) {
          if (refOne.current && !refOne.current.contains(event.target)) {
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

    //select the user type
    function userRole(r){
        setRole(r)
        setView(!view);
    }

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : {
          firstName : '',
          lastName : '',
          telegram : '',
          email :  '',
          password : '',
          confirm_password : ''
        },
        validationSchema : registerSchema,
        onSubmit : async values => {  
            values = await Object.assign(values, {userRole : role})
            //console.log(values)
            let registerPromise = registerUser(values);
            toast.promise(registerPromise, {
              loading : 'Creating...',
              success : <b>Register Successfully 🙂</b>,
              error : <b>Couldn't Register 😟</b>
            });
            registerPromise.catch(function(error){
              const err = (JSON.stringify(error.error.error));
              toast.error(err)
              //alert(JSON.stringify(error.error.error));
            })
            registerPromise.then(function(){ navigate('/login')});
        }
    })

  return (
    <>
    <video src={videoBg} autoPlay loop muted className='h-screen' />
    <div className="bg-transparent opacity-95 absolute h-max inset-0 z-30 "> 

        {/* toast message */}
        <Toaster position='top-center' reverseOrder={false} />
        
        { view? 
        (<div className='bg-transparent opacity-100 fixed inset-0 z-20 px-4 '>
            <div className='flex justify-center items-center h-screen'>
            <div ref={refOne} className=' bg-slate-200 md:w-3/6 border border-sky-900 shadow-md shadow-blue-600 rounded-2xl'>
                <div className='p-10'>
                    
                    <h1 className='flex justify-center md:text-2xl font-semibold'>Type of Your Account</h1>
                    <p className='flex justify-center md:my-4 md:px-12 my-3 text-slate-700 md:text-xl text-center'>
                        Select whether you are Registering here as a Signal Provider or a Subscriber. 
                    </p>

                    <div className='flex flex-col items-center md:flex-row md:justify-center md:gap-10 gap-5 md:my-14 my-5'>
                        <div onClick={() => { userRole(2) }} className='border border-slate-400 rounded-3xl cursor-pointer md:w-1/4 w-2/3 h-fit hover:bg-slate-400'>
                            <span className='flex justify-center py-2 md:text-lg font-semibold'>Provider</span>
                            <img src={masterImg} alt="provider" className='w-full h-auto object-cover' style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div onClick={() => { userRole(1) }} className='border border-slate-400 rounded-3xl cursor-pointer md:w-1/4 w-2/3 h-fit hover:bg-slate-400'>
                            <span className='flex justify-center py-2 md:text-lg font-semibold'>Subscriber</span>
                            <img src={traderImg} alt="subscriber" className='w-full h-auto object-cover' style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>

                    <div className='flex justify-center '>
                        <span className='md:text-base'>Have an Account :<span> </span>
                            <Link className='text-green-600 hover:font-bold md:text-xl cursor-pointer' to="/login">Log In</Link>
                        </span>
                    </div>
                    </div>
                </div>
            </div>
        </div>) : 
        (       
        <div className="flex h-screen  justify-center items-center  ">
            
            <div ref={refOne} className="flex justify-center bg-slate-300 md:py-10 py-5 px-4 border border-sky-900 shadow-md shadow-blue-600 rounded-2xl ">
                <div className="flex justify-between w-full">
                    
                    <form autoComplete='off' onSubmit={handleSubmit} >
                        <div className="flex flex-col md:text-2xl text-xl justify-center  mb-1" >
                            {/* <div className='flex justify-start'>
                                <button className='text-white' onClick={()=>{setView(!view)}} >b</button>
                            </div> */}
                            <div className="text-center">Register Here</div>
                            {/* <div className='grid grid-cols-12'>
                                <div className="justify-self-start col-span-1">
                                    <button className='text-white' onClick={() => setView(!view)}>
                                        <AiOutlineArrowLeft />
                                    </button>
                                </div>
                                <div className="text-center col-span-11">
                                Register Here
                                </div>
                            </div> */}
                        </div>
                        <span className='py-2 text-base md:text-lg justify-center flex text-center'>
                            Happy to Join with us
                        </span>

                        <div className='flex justify-center '>
                            <img className='md:h-40 h-20 w-20 md:w-40' src={registerImg} alt='register' />                     
                        </div>

                        {/* text box */}
                        <div className='flex justify-center '>
                            <div className='grid grid-cols md:grid-cols-2 justify-items-center'>
                                <div className={styles.reg_err_handle}>
                                    <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password " >First Name</InputLabel>
                                    <Input
                                        type='text' 
                                        id='firstName'
                                         
                                        onChange={handleChange}
                                        value={values.firstName}
                                        className={errors.firstName && touched.firstName ? `${styles.input_error}` : `${styles.textBox}`}
                                        onBlur={handleBlur}
                                    />
                                    {errors.firstName && touched.firstName && <p className={styles.error_msg}>{errors.firstName}</p>}
                                    </FormControl>
                                </div>

                                <div className={styles.reg_err_handle}>
                                    <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password " >Last Name</InputLabel>
                                        <Input
                                            type='text'
                                            id="lastName" 
                                            onChange={handleChange}
                                            value={values.lastName}
                                            className={errors.lastName && touched.lastName ? `${styles.input_error}` : `${styles.textBox}`}
                                            onBlur={handleBlur} 
                                        />
                                        {errors.lastName && touched.lastName && <p className={styles.error_msg}>{errors.lastName}</p>}
                                    </FormControl>
                                </div>
                                <div className={styles.reg_err_handle}>
                                    <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                                        <InputLabel htmlFor="standard-adornment-password " >Telegram</InputLabel>
                                        <Input
                                        type='text'
                                        id="telegram" 
                                        onChange={handleChange}
                                        value={values.telegram}
                                        className={errors.telegram && touched.telegram ? `${styles.input_error}` : `${styles.textBox}`}
                                        onBlur={handleBlur}
                                        />
                                        {errors.telegram && touched.telegram && <p className={styles.error_msg}>{errors.telegram}</p>}
                                    </FormControl>
                                </div>
                                <div className={styles.reg_err_handle}>
                                 <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password " >Email</InputLabel>
                                    <Input
                                        type='email'
                                        id='email'
                                        onChange={handleChange}
                                        value={values.email}
                                        className={errors.email && touched.email ? `${styles.input_error}` : `${styles.textBox}`}
                                        onBlur={handleBlur} 
                                    />
                                    {errors.email && touched.email && <p className={styles.error_msg}>{errors.email}</p>}
                                </FormControl>
                                </div>
                                <div className={styles.reg_err_handle}>
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
                                         
                                        onChange={handleChange}
                                        value={values.password}
                                        className={errors.password && touched.password ? `${styles.input_error}` : `${styles.textBox}`}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched.password && <p className={styles.error_msg}>{errors.password}</p>}
                                    </FormControl>
                                </div>

                                <div className={styles.reg_err_handle}>
                                <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password " >Confirm Password</InputLabel>
                                <Input
                                     id='confirm_password'
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            //sx={{ color: 'white' }}
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={handleChange}
                                    value={values.confirm_password}
                                    className={errors.confirm_password && touched.confirm_password ? `${styles.input_error}` : `${styles.textBox}`}
                                    onBlur={handleBlur} 
                                />
                                   {errors.confirm_password && touched.confirm_password && <p className={styles.error_msg}>{errors.confirm_password}</p>}
                                </FormControl>
                                
                                </div>
                            </div>
                        </div>    
                        
                        {/* button */}
                        <div className='flex justify-center '>
                            {/* <button type='submit' className={styles.btn} >
                                Rgister <AiOutlineLogout size={20} className='ml-2'/> 
                            </button> */}
                            <Button type='submit' variant="contained" sx={{ mt: 1, width: '25ch', borderRadius:3}}>Sign Up</Button>
                        </div>

                        <div className='grid grid-rows-2 justify-center mt-5'>
                            <span className='text-gray-900'>Alredy User :<span> </span>
                                <Link className='text-green-600 hover:font-bold text-lg cursor-pointer' to="/login">Log In</Link>
                            </span>

                            <span 
                            onClick={()=>{setView(!view)}}
                            className='text-red-600 hover:font-bold text-center text-lg mt-1 cursor-pointer'>Go Back </span>
                        </div>
                    </form>   
                </div> 
  
            </div>
            {/* <button onClick={()=>{setView(!view)}}>click</button> */}
        </div>
        )
        }
    </div>
    </>
  )
}

export default Register