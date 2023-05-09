import React, { useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';
import {AiOutlineLogin} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from './imgs/login.png';
import styles from './styles/style.module.css';
import { useFormik } from 'formik';
import { loginSchema } from './validations/loginValidation';
import toast, { Toaster} from 'react-hot-toast'; 
import { login, getUser } from './helper/helper';

const Login = () => {

    const navigate = useNavigate();

    const inputRef = useRef(null);

    //email check
    const handleClick = () => {
        const email = inputRef.current.value; 
        if(!email){
            toast.error('Email must be Required..!');
            inputRef.current.focus()

        }else{
            getUser({email})
            .then((user) => {
                if(user.status===404){
                toast.error('User Email is Invalied..!');
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
                error : <b>Login Error...😟</b>
            });

            loginPromise.then(res => {
                let {token, email} = res.data;
               
                localStorage.setItem('token', token);

                //check the user roll
                getUser({email})
                .then(res =>{
                    let {userRoles} = res.data

                    localStorage.setItem('userRole', userRoles);

                    if(userRoles === 2 ){
                        navigate('/provider-profile');
                    }else{
                        navigate('/profile');
                    }
                })
            });
        }
    })
    
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
        
        <div className="flex h-screen justify-center items-center">
            <div className="justify-center bg-slate-900 md:py-10 py-5 md:px-8 px-2 border-2 border-sky-900 shadow-md shadow-blue-600 rounded-2xl">
                <form autoComplete='off' onSubmit={handleSubmit} >
                    <div className="flex md:text-2xl text-xl justify-center text-zinc-100 mb-1" >welcome</div>
                        <span className='py-2 text-base md:text-lg justify-center flex text-center text-slate-400'>
                            Explore More by connecting with us
                        </span>

                    {/* image */}
                    <div className='flex justify-center '>
                        <img className='md:h-40 h-28 w-28 md:w-40' src={loginImg} alt='register'/>                     
                    </div>

                    {/* text box */}
                    <div className='flex justify-center '>
                        <div className='grid grid-cols gap-1 justify-items-center'>
                            <>
                            <input 
                            type='email' 
                            id='email'
                            onChange={handleChange}
                            value={values.email}
                            className={errors.email && touched.email ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur}
                            ref={inputRef}
                            placeholder='Email'/>
                            {errors.email && touched.email && <p className={styles.error_msg}>{errors.email}</p>}
                            </>
                            <>
                            <input 
                            type='password' 
                            id='password'
                            onChange={handleChange}
                            value={values.password}
                            className={errors.password && touched.password ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur}
                            placeholder='Password'/>
                            {errors.password && touched.password && <p className={styles.error_msg}>{errors.password}</p>}                 
                            </>
                        </div>
                    </div>

                    {/* button */}
                    <div className='flex justify-center '>
                        <button type='submit' className={styles.btn} >
                            Login <AiOutlineLogin size={20} className='ml-2'/> 
                        </button>
                    </div>

                    <div className='flex justify-center mt-5'>
                        <span className='text-gray-100'>Not a Member :<span> </span>
                            <Link className='text-green-400 hover:font-bold text-lg cursor-pointer '  to="/register">Register Now</Link>
                        </span>
                    </div>

                </form> 

                {/* forget password */}
                <div className='flex justify-center'>
                    <div className='flex justify-center'>
                        <button onClick={handleClick} className='text-red-500 hover:font-bold pt-3'>Forget Password</button>
                    </div>
                </div> 
            </div>
        </div>
    </div>
    </>
  )
}

export default Login