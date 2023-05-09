import React,{ useState, useEffect } from 'react'
// react Icons
import { MdAddTask } from 'react-icons/md';
import { HiPlus } from 'react-icons/hi';
import { SlArrowLeftCircle  } from 'react-icons/sl';
import { RxCross2  } from 'react-icons/rx';

import styles from '../../subscriber/styles/style.module.css';

import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { createChannel, getChannelById } from '../../authModule/helper/helper';

//load provider Details component
import EditProfile from './Details'
import ChannelList from './ChannelList'

import { getuserName } from '../../authModule/helper/helper'

// get profile image
import fetchUserAvatar from '../../authModule/hook/featch-hook';

//navigation
import { useNavigate } from 'react-router-dom';

import avatar from '../../../assets/img/user.png';

const ProviderProfile = () => {

  const navigate = useNavigate();

  // load profile Img
  const [{  apiData }] = fetchUserAvatar();

  const [email, setEmail] = useState('');
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  // create channel popup
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [userOpen, setUserOpen] = useState(false);

  // setDetail
  const togglePopup = () => {
    setIsOpen(!isOpen);
   // console.log(isOpen)
  };

  // user Profile
  const userPopup = () => {
    setUserOpen(!userOpen);
  };

  useEffect(() => {
    getUserEmail();

    const fetchData = async () => {
      try {
        const response = await getChannelById(selectedChannel);
        //console.log(response)
        setDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedChannel) {
      fetchData();
    }

  },[selectedChannel]);

  // select the Channel
  async function handleChannelSelect(channel) {
    setSelectedChannel(channel);
  }

  //get the email
  function getUserEmail(){
    getuserName().then(result => {
      const email = result.username;
      setEmail(email)
      //console.log(email)
    })
  }

  //back Function
  function goBack(){
    navigate('/')
  }

  const {values, handleBlur, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues : {
      channelName : '',
      source : 'MT4',
      accountID : '',
      email : ''
    },
   // validationSchema : registerSchema,
    onSubmit : async values => {  

      const updatedValues = Object.assign({}, values, { email });

        let newChannel = createChannel(updatedValues);
        toast.promise(newChannel, {
          loading : 'Creating...',
          success : <b>Added Successfully 🙂</b>,
          error : <b>Added Faild 😟</b>
        });
        newChannel
        .then(() => {
          setChannels([...channels, newChannel]); 
          resetForm(); // reset form after successful submission
          togglePopup()
        })
        .catch(function(error){
          const err = (JSON.stringify(error.error.error));
          toast.error(err)
        })
    }
  
  })
  
  return (
    <div className='container'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

      <div className='pb-8 flex justify-between ' >
        <SlArrowLeftCircle size={40}  className='cursor-pointer' onClick={goBack}/>
        <>
          <div className='border rounded-full  '>
            <label htmlFor="profile">
              <img src={apiData?.profile || avatar} className='h-10 w-10 rounded-full cursor-pointer'  alt="avatar" onClick={userPopup} />
            </label>
          </div> 
        </>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 md:gap-10'>

        {/** this is the create Channel **/}
        <div>
          <>
            <div className='flex pb-3'>
              <button 
              onClick={togglePopup}
              className='flex items-center py-2 px-4 md:text-base text-sm border-2
              border-green-600 hover:bg-green-600 text-slate-50 rounded-2xl'> 
                Channel <HiPlus className='ml-2'/>
              </button> 
            </div>
          </>

          {/** this is Channel List **/}
          <div className='row-span-2'>
            <ChannelList channels={channels} onChannelSelect={handleChannelSelect} />
          </div>

        </div>        
        
        {/* channel Details */}
        <div className='col-span-2 row-span-1 bg-transparent rounded-lg shadow-2xl capitalize'>
          <div className='flex justify-center items-center'>
            <h2 className='md:text-xl text-lg font-bold text-slate-400 my-4'>Channel Details</h2>
          </div>

          <div className='flex mx-10 my-5 justify-center'>
              
            {details && (
              <div className='grid md:grid-cols-3 grid-col-1 gap-5 '>
              <>
                <div className='grid-cols-1 text-slate-500'>Account Id : 
                  <span className='mx-2 text-slate-100'>{details.client.accountID || ''}</span>
                </div>
                            
                <div className='grid-cols-1 text-slate-500'>Account Name : 
                  <span className='mx-2 text-slate-100'>{details.client.accountName || ''}</span>
                </div>

                <div className='grid-cols-1 text-slate-500'>Channel : 
                  <span className='mx-2 text-slate-100'>{details.client.channelName || ''}</span>
                </div>

                <div className='grid-cols-1 text-slate-500'>Platform : 
                  <span className='mx-2 text-slate-100'>{details.client.platform}</span>
                </div>

                <div className='grid-cols-1 text-slate-500'>Tenant : 
                  <span className='mx-2 text-slate-100'>{details.client.tenant}</span>
                </div>

              </>
              </div>
            ) }

          </div>      
        </div>

        {/* this is the popup */}
        {
          isOpen && (

            <div className='bg-slate-800 opacity-95 fixed inset-0 z-20'>
              <div className="flex h-screen justify-center items-center">
                <div className='bg-transparent md:px-16 px-5 rounded-xl shadow-md shadow-sky-900 row-span-1 z-40 md:w-1/4 w-3/4 '>
                    
                  <div className='flex justify-center items-center'>
                    <h2 className='md:text-xl text-lg font-bold text-slate-400 my-2'>Create New Channel</h2>          
                  </div>
                  <form autoComplete='off' onSubmit={handleSubmit} >

                    {/* text-box */}
                    <div className='grid md:gap-8 gap-4 items-center mt-8 '>
          
                      <div>
                        <label className='text-slate-500'>Channel Name</label>
                      <input 
                      type='text' 
                      id='channelName'
                      onChange={handleChange}
                      value={values.channelName}
                      onBlur={handleBlur}
                      className={styles.textBox}
                      />
                      </div>

                      <div>
                        <label className='text-slate-500'>Source Type</label>
                      <input 
                      type='text'
                      id="source" 
                      onChange={handleChange}
                      value={values.source}
                      onBlur={handleBlur}
                      className={styles.textBox}
                      />
                      </div>

                      <div>
                          <label className='text-slate-500 '>Account Id</label>
                        <input 
                        type='text' 
                        id='accountID'
                        onChange={handleChange}
                        value={values.accountID}
                        onBlur={handleBlur}
                        className={styles.textBox}
                        />
                      </div>
                    </div>

                    {/* buttons */}
                    <div className='flex justify-end items-end my-5 pt-3'>
                      
                    <button 
                      className='flex items-center py-2 px-3 md:text-base text-sm border-2
                      border-red-600 hover:bg-red-600 text-slate-50 rounded-2xl mx-2' 
                      onClick={togglePopup} > cancel <RxCross2 className='ml-2'/>
                      </button> 

                      <button 
                      className='flex items-center py-2 px-3 md:text-base text-sm border-2
                      border-green-600 hover:bg-green-600 text-slate-50 rounded-2xl' 
                      type='submit'> Create <MdAddTask className='ml-2'/>
                      </button> 
                    </div>
                  </form>

                </div> 
              </div>
            </div>       
          ) 
        }

        {/* this is for user Profile */}
        {
          userOpen && (
            <div className='bg-slate-800 opacity-95 fixed inset-0 z-20'>
              <div className="flex h-screen justify-center items-center">
                <EditProfile />
              </div>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default ProviderProfile