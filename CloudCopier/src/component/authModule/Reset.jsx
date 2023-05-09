import React from 'react'
import { RxCross2 } from 'react-icons/rx';
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import resetImg from './imgs/resetImg.png'
import { Link, useNavigate } from 'react-router-dom';
import {resetPass} from './helper/helper'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetSchema } from './validations/resetValidation';

import styles from './styles/style.module.css'

const Login = () => {
  //get Email
  const email = localStorage.getItem('email');

  const navigate = useNavigate()

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
    <div className="bg-gray-900 opacity-95 fixed inset-0 z-40 "> 
        <div className='absolute' style={{right: 0}}>
            <Link to={'/'} >
                <RxCross2  className= 'text-white text-3xl md:text-5xl m-10 animate-bounce cursor-pointer' /> 
            </Link>
        </div>
        
        <div className="flex h-screen justify-center items-center  ">
        
            <div className="flex justify-center bg-slate-900 md:py-10 py-7 md:px-8 px-1 border-2 border-sky-900 shadow-md shadow-blue-600 rounded-2xl  ">
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className="flex md:text-2xl text-xl justify-center text-zinc-100 mb-1" >Reset Password</div>
                        <span className='py-2 text-base md:text-lg justify-center flex text-center text-slate-400'>
                            Reset Your Password
                        </span>
                    
                    <div className='flex justify-center '>
                        <img className='md:h-40 h-28 w-28 md:w-40' src={resetImg} alt='register'/>                     
                    </div>

                    {/* text box */}
                    <div className='flex justify-center '>  
                        <div className='grid grid-cols gap-1 justify-items-center'>
                            <>
                            <input 
                            type='text'
                            id='password' 
                            onChange={handleChange}
                            value={values.password}
                            className={errors.password && touched.password ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur}  
                            placeholder='Password'/>
                            {errors.password && touched.password && <p className={styles.error_msg}>{errors.password}</p>}
                            </>

                            <>
                            <input 
                            type='text' 
                            id='confirm_password'
                            onChange={handleChange}
                            value={values.confirm_password}
                            className={errors.confirm_password && touched.confirm_password ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur}  
                            placeholder='Confirm Password'/>
                            {errors.confirm_password && touched.confirm_password && <p className={styles.error_msg}>{errors.confirm_password}</p>}
                            </>
                        </div>
                    </div>

                    {/* button */}
                    <div className='flex justify-center '>
                        <button className={styles.btn} type="submit">
                            Reset <IoMdCheckmarkCircleOutline size={20} className='ml-2'/> 
                            {/* this is for test */}
                            <Link  to={'/login'}/>
                        </button>
                    </div>
                </form>     
            </div>
        </div>
    </div>
    </>
  )
}

export default Login