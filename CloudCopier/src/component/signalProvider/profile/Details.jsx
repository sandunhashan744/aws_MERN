import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import avatar from '../../../assets/img/user.png';
import { AiOutlineLogout } from 'react-icons/ai';
import { RxUpdate } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import styles from '../../subscriber/styles/style.module.css';

// new
import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import convetBase64 from '../../authModule/helper/convert';
import useFetch from '../../authModule/hook/featch-hook';
import {updateUser} from '../../authModule/helper/helper';

import ClockLoader  from "react-spinners/ClockLoader";

const ProviderProfile = () => {

  const navigate = useNavigate();

  //image-upload
  const [file, setFile] = useState();

  // log-out
  const removeToken = () => {
    localStorage.clear('token');
    navigate('/')
  }

  // back to page
  const backtoPage = () => {
    navigate('/')
  }

  // for image upload
  const onUpload = async e =>{
    const base64 = await convetBase64(e.target.files[0]);
    setFile(base64); 
  }
  
  // load data from DB
  const [{ isLoading, apiData, serverError }] = useFetch();
  //formik
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '' ,
      lastName : apiData?.lastName || '',
      // platform : apiData?.providers[0]?.platform || '',
      // tenant : apiData?.providers[0]?.tenant || '',
      email : apiData?.email || ''
    },
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, {profile: file || apiData?.profile || ''})

      let udateUserPromise =  updateUser(values);

      toast.promise(udateUserPromise,{
        loading : 'Updating...',
        success : <b>Update Successful..🙂👍</b>,
        error : <b>Updating Error...😟👎</b>
      });
    }
  })

  if(isLoading) return <div className='loading'><ClockLoader color="#aeddd4" /></div>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className='md:w-1/4 w-5/6'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

        {/** this is the edit profile **/}
        <div className=' bg-transparent p-5 rounded-xl shadow-md shadow-sky-900 relative'>
          
          <>
            <RxCross2  className= 'text-white text-3xl float-right cursor-pointer' onClick={backtoPage}/> 
          </>
          
          {/* profile pic */}
          <div className='flex justify-center items-center'>
            <div className='border rounded-full p-1 m-2 '>
              <label htmlFor="profile">
                <img src={file || apiData?.profile || avatar} className='h-20 w-20 rounded-full cursor-pointer' alt="avatar"/>
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile' hidden />
            </div> 
          </div>

          <form autoComplete='off' onSubmit={formik.handleSubmit} >
            <div className='md:px-10'>
              {/* text-box */}
              <div className='grid gap-4 items-center mt-8 '>
                <div>
                  <label className='text-slate-500'>First Name</label>
                  <input 
                  type='text' 
                  id="firstName"   
                  {...formik.getFieldProps('firstName')} 
                  className={styles.textBox}
                  />
                </div>

                <div>
                  <label className='text-slate-500'>Last Name</label>
                <input 
                type='text'
                id="lastName"   
                {...formik.getFieldProps('lastName')}                        
                className={styles.textBox}
                />
                </div>
                
                <div>
                  <label className='text-slate-500'>Email</label>
                <input 
                type='email'
                id='email'
                {...formik.getFieldProps('email')} 
                className={styles.textBox}
                readOnly
                />
                </div>
              </div>

              {/* buttons */}
              <div className='flex justify-center items-end my-4 gap-3 pt-3'>
                <button 
                className='flex items-center py-2 px-4 border-2 md:text-base text-sm border-blue-700 hover:bg-blue-700 text-slate-50 rounded-2xl'
                type='submit'>
                  Update <RxUpdate className='ml-2'/>
                </button> 

                <button 
                className='flex items-center py-2 px-4 border-2 md:text-base text-sm border-red-600 hover:bg-red-600 text-slate-50 rounded-2xl'
                onClick={removeToken}>
                  log out <AiOutlineLogout className='ml-2'/>
                </button> 
              </div>

            </div>

          </form>
        </div>
    </div>
  )
}

export default ProviderProfile