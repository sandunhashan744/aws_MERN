import React from 'react'
import { RxCross2 } from 'react-icons/rx';
import {AiOutlineLogout} from 'react-icons/ai';
import registerImg from './imgs/register.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from './validations/registerValidation';
import styles from './styles/style.module.css';
import toast, {Toaster} from 'react-hot-toast';
import { registerUser } from './helper/helper';

const Register = () => {
    
    const navigate = useNavigate();

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
    <div className="bg-gray-900 opacity-95 absolute h-max inset-0 z-40 "> 
        <div className='absolute' style={{right: 0}}>
            <Link to={'/'} >
                <RxCross2  className= 'text-white text-3xl md:text-5xl m-10 animate-bounce cursor-pointer' /> 
            </Link>
        </div>

        {/* toast message */}
        <Toaster position='top-center' reverseOrder={false} />

        <div className="flex my-16 h-screen justify-center items-center  ">
            <div className="flex justify-center bg-slate-900 md:py-10 py-5 md:px-4 px-2 border-2 border-sky-900 shadow-md shadow-blue-600 rounded-2xl  ">
                <form autoComplete='off' onSubmit={handleSubmit} >
                    <div className="flex md:text-2xl text-xl justify-center text-zinc-100 mb-1" >Register Here</div>
                        <span className='py-2 text-base md:text-lg justify-center flex text-center text-slate-400'>
                            Happy to Join with us
                        </span>
                    
                    <div className='flex justify-center '>
                        <img className='md:h-40 h-28 w-28 md:w-40' src={registerImg} alt='register' />                     
                    </div>

                    {/* text box */}
                    <div className='flex justify-center '>
                        <div className='grid grid-cols md:grid-cols-2  justify-items-center'>
                            <div className={styles.reg_err_handle}>
                            <input 
                            type='text' 
                            id="firstName" 
                            onChange={handleChange}
                            value={values.firstName}
                            className={errors.firstName && touched.firstName ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur}
                            placeholder='First Name'/>

                            {errors.firstName && touched.firstName && <p className={styles.error_msg}>{errors.firstName}</p>}
                            </div>

                            <div className={styles.reg_err_handle}>
                            <input 
                            type='text'
                            id="lastName" 
                            onChange={handleChange}
                            value={values.lastName}
                            className={errors.lastName && touched.lastName ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur} 
                            placeholder='Last Name'/>
                            {errors.lastName && touched.lastName && <p className={styles.error_msg}>{errors.lastName}</p>}
                            </div>
                            <div className={styles.reg_err_handle}>
                            <input 
                            type='text'
                            id="telegram" 
                            onChange={handleChange}
                            value={values.telegram}
                            className={errors.telegram && touched.telegram ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur} 
                            placeholder='Telegrame No'/>
                            {errors.telegram && touched.telegram && <p className={styles.error_msg}>{errors.telegram}</p>}
                            </div>
                            <div className={styles.reg_err_handle}>
                            <input 
                            type='email'
                            id='email'
                            onChange={handleChange}
                            value={values.email}
                            className={errors.email && touched.email ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur} 
                            placeholder='Email'/>
                            {errors.email && touched.email && <p className={styles.error_msg}>{errors.email}</p>}
                            </div>
                            <div className={styles.reg_err_handle}>
                            <input 
                            type='text'
                            id='password' 
                            onChange={handleChange}
                            value={values.password}
                            className={errors.password && touched.password ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur}  
                            placeholder='Password'/>
                            {errors.password && touched.password && <p className={styles.error_msg}>{errors.password}</p>}
                            </div>
                            <div className={styles.reg_err_handle}>
                            <input 
                            type='text' 
                            id='confirm_password'
                            onChange={handleChange}
                            value={values.confirm_password}
                            className={errors.confirm_password && touched.confirm_password ? `${styles.input_error}` : `${styles.textBox}`}
                            onBlur={handleBlur}  
                            placeholder='Confirm Password'/>
                            {errors.confirm_password && touched.confirm_password && <p className={styles.error_msg}>{errors.confirm_password}</p>}
                            </div>
                        </div>
                    </div>    
                    
                    {/* button */}
                    <div className='flex justify-center '>
                        <button type='submit' className={styles.btn} >
                            Rgister <AiOutlineLogout size={20} className='ml-2'/> 
                        </button>
                    </div>

                    <div className='flex justify-center mt-5'>
                        <span className='text-gray-100'>Alredy User :<span> </span>
                            <Link className='text-green-400 hover:font-bold text-lg cursor-pointer' to="/login">Login Now</Link>
                        </span>
                    </div>

                </form>     
            </div>
        </div>
    </div>
    </>
  )
}

export default Register