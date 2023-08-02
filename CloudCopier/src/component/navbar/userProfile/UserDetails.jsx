import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import avatar from '../../../assets/img/user.png';
// import { AiOutlineLogout } from 'react-icons/ai';
// import { RxUpdate } from 'react-icons/rx';
import styles from '../styles/style.module.css';

///mui
// import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

// new
import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import convetBase64 from '../../authModule/helper/convert';
import useFetch from '../../authModule/hook/featch-hook';
import {updateUser} from '../../authModule/helper/helper';

import ClockLoader  from "react-spinners/ClockLoader";
  
const UserDetails = () => {
    
  const navigate = useNavigate();
  
  //image-upload
  const [file, setFile] = useState();

  // log-out
  const removeToken = () => {
    localStorage.clear('token');
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
    //   platform : apiData?.providers[0]?.platform || '',
    //   tenant : apiData?.providers[0]?.tenant || '',
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

  if(isLoading) return <div className='loading'><ClockLoader color="black" /></div>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className='md:w-1/4 w-5/6'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

        {/** this is the edit profile **/}
        <div className=' bg-slate-200 p-5 rounded-xl shadow-md shadow-sky-900 relative'>
          
          {/* <>
            <RxCross2  className= 'text-white text-3xl float-right cursor-pointer' onClick={backtoPage}/> 
          </> */}
          
          {/* profile pic */}
          <div className='flex justify-center items-center'>
            <div className='border border-slate-900 rounded-full p-1 m-2 '>
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
                <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password " >First Name</InputLabel>
                  <Input
                     type='text' 
                     id="firstName"   
                     {...formik.getFieldProps('firstName')} 
                     className={styles.textBox}
                    //  
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password " >Last Name</InputLabel>
                  <Input
                     type='text' 
                     id="lastName"   
                     {...formik.getFieldProps('lastName')} 
                     className={styles.textBox}
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password " >Email</InputLabel>
                  <Input
                    type='email' 
                    id="email"   
                    {...formik.getFieldProps('email')} 
                    className={styles.textBox}
                    readOnly
                  />
                </FormControl>
              </div>

              {/* buttons */}
              <div className='flex justify-center items-end my-5 gap-3'>
                {/* <button 
                className='flex items-center py-2 px-4 border-2 md:text-base text-sm border-blue-700 hover:bg-blue-700 text-slate-50 rounded-2xl'
                type='submit'>
                  Update <RxUpdate className='ml-2'/>
                </button>  */}
                <Button 
                  type="submit" 
                  //className='flex items-center py-2 px-4 border-2 md:text-base text-sm border-blue-700 hover:bg-blue-700 text-slate-50 rounded-2xl'
                  variant="contained"
                  sx={{borderRadius:3}}
                  color='primary'>
                  update
                </Button>
                <Button
                  variant='contained'
                  sx={{borderRadius:3}}
                  color='error'
                  onClick={removeToken}>
                  log out
                </Button>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default UserDetails