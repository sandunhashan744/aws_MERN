import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import avatar from '../../../assets/img/user.png';
//user Formik
import { useFormik } from 'formik';
// tostMessage
import toast,{Toaster} from 'react-hot-toast';

// react-Icons
import { SlArrowLeftCircle  } from 'react-icons/sl';
import { HiPlus } from 'react-icons/hi';
import { MdOutlinePayments } from 'react-icons/md';
import { RxCross2  } from 'react-icons/rx';

import styles from '../styles/style.module.css';

// import the List of Subscriber
import SubscribeChannel from './SubscribeChannel';
import UserDetails from './UserDetails';
//import the axios function
import { getChannels, getuserName, createTrader, getChannelById } from '../../authModule/helper/helper'

// get profile image
import fetchUserAvatar from '../../authModule/hook/featch-hook';

const Profile = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [channels, setChannel] = useState(false);
  const [userOpen, setUserOpen] = useState(false); //user detail popup
  const [isOpen, setIsOpen] = useState(false); // payment popup
  const [selectedChannel, setSelectedChannel] = useState(null); //subscribe channel details
  const [subscribe, setSubscribe] = useState([]); //subscribeChannels

  const [details, setDetails] = useState(null);

  // load profile Img
  const [{  apiData }] = fetchUserAvatar();

  useEffect(() => {

    getUserEmail()
    async function fetchData() {
      try {
        const response = await getChannels();
        const channels = response.data;
       // console.log(channels)
        setData(channels);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    //getchannel Details
    if (selectedChannel) {
      channelDetails();
    }

  }, [selectedChannel]);


  const channelDetails = async () => {
    try {
      const response = await getChannelById(selectedChannel);
      setDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // user Profile
  const userPopup = () => {
    setUserOpen(!userOpen);
  };

  // Payment Popup
  const togglePopup = (channel) => {
    setIsOpen(!isOpen);
    setChannel(channel);
   //console.log(channel.account)
  };

  //back Function
  function goBack(){
    navigate('/')
  }

  // load all channel
  function allChannel(){
    setDetails(null)
  }

  //get the user email
  function getUserEmail(){
    getuserName().then(result => {
      const userEmail = result.username;
      setEmail(userEmail)
    })
  }

  // select the Channel
  async function handleChannelSelect(channel) {
    //console.log(channel)
    setSelectedChannel(channel);
  }

  const {values, handleBlur, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues : {
      account : '',
      channelName: '',
      channelId: '',
      // cardNumber : '',
      // expiry : '',
      // csv : '',
      email : ''
    },
   // validationSchema : registerSchema,
    onSubmit : async values => {  
      const updatedValues = Object.assign({}, values, {
        email,
        channelId: channels.account,
        channelName: channels.channelName,
      } );

        let newTrader = createTrader(updatedValues);
        toast.promise(newTrader, {
          loading : 'Creating...',
          success : <b>Added Successfully 🙂</b>,
          error : <b>Added Faild 😟</b>
        });
        newTrader
        .then(() => {
          setSubscribe([...subscribe, newTrader]); 
          resetForm(); // reset form after successful submission
          togglePopup(); //close the popup
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
              <img src={apiData?.profile || avatar} 
              className='h-10 w-10 rounded-full cursor-pointer' alt="avatar" 
              onClick={userPopup} />
            </label>
          </div> 
        </>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 '>

        {/* Add New Subscriber */}
        <div>
          <>
            <div className='flex pb-3'>
              <button 
              onClick={allChannel}
              className='flex items-center py-2 px-3 md:text-base text-sm border-2
              border-green-600 hover:bg-green-600 text-slate-50 rounded-2xl'> 
                Subscribe <HiPlus className='ml-2'/>
              </button> 
            </div>
          </>
          {/* Subscribe Channels */}
          <SubscribeChannel subscribe={subscribe} onChannelSelect={handleChannelSelect} />
        </div>

        {/** this is the edit profile **/}
        <div className='md:col-span-3 md:row-span-2 bg-transparent md:px-16 px-5 rounded-xl shadow-2xl '>
          <div className='flex justify-center items-center'>
            <h2 className='text-lg font-bold text-slate-400 my-3 pb-5'>Channel Details</h2>          
          </div>

          {details && selectedChannel ? (
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
          ) : (
            <div className='grid md:grid-cols-5 grid-cols-2 gap-5 mb-10'>
              {isLoading ? (  
                <div>Loading..</div>
              ) : (
                data.map((chanels) => (
                  <div key={chanels._id}>
                    <div className='shadow-md shadow-sky-800 bg-slate-800 rounded-xl p-3'>
                      <div className='capitalize relative text-lg'>
                        <div className=''>{chanels.channelName}</div>
                      </div>
                      <div className='my-1 pt-3 text-right'>
                        <button 
                          onClick={() =>togglePopup(chanels)}
                          className='bg-blue-600 py-1 px-2 rounded-xl'>
                          subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}


        </div>

        {/* Payment Popup */}
        {
          isOpen && (
        
            <div className='bg-slate-900 opacity-100 fixed inset-0 z-20'>
              <div className="flex h-screen justify-center items-center">
                <div className='bg-transparent md:px-16 px-5 rounded-xl shadow-md shadow-sky-900 row-span-1 z-40 md:w-1/4 w-3/4 '>
         
                  <div className='flex justify-center items-center'>
                    <h2 className='md:text-xl text-lg font-bold text-slate-400 my-2'>Pay Here</h2>          
                  </div>

                  <form autoComplete='off' onSubmit={handleSubmit} >

                    {/* text-box */}
                    <div className='grid md:gap-8 gap-4 items-center mt-8 '>

                      <div>
                        <label className='text-slate-500'>Account Id *</label>
                      <input 
                      type='text' 
                      id='account'
                      onChange={handleChange}
                      value={values.account}
                      onBlur={handleBlur}
                      className={styles.textBox}
                      />
                      </div>

                      <div>
                        <label className='text-slate-500'>Card Number *</label>
                      <input 
                      type='text' 
                      id='cardNumber'
                      onChange={handleChange}
                     // value={values.cardNumber}
                      onBlur={handleBlur}
                      className={styles.textBox}
                      />
                      </div>

                      <div className='hidden'>
                        {/* <input id='channelId' type="text" value={selectedChannel.account} />
                        <input id='channelName' type="text" value={selectedChannel.channelName} /> */}
                      </div>

                      <div className='grid md:grid-cols-2  gap-5'>
                        <div>
                          <label className='text-slate-500 '>Expiry *</label>
                          <input 
                          type='text' 
                          id='expiry'
                          onChange={handleChange}
                        //  value={values.expiry}
                          onBlur={handleBlur}
                          className={styles.textBox}
                          placeholder='mm/yy'
                          />
                        </div>
                        <div>
                          <label className='text-slate-500 '>CSV *</label>
                          <input 
                          type='text' 
                          id='csv'
                          onChange={handleChange}
                        //  value={values.csv}
                          onBlur={handleBlur}
                          className={styles.textBox}  
                          />
                        </div>
                      </div>
                      
                    </div>

                    {/* buttons */}
                    <div className='flex justify-end items-end my-5 pt-3'>
                      <button 
                      className='flex items-center py-2 px-3 md:text-base text-sm border-2
                      border-red-600 hover:bg-red-600 text-slate-50 rounded-2xl mx-2'
                      onClick={togglePopup} > 
                      cancel <RxCross2 className='ml-2'/>
                      </button> 

                      <button 
                      className='flex items-center py-2 px-3 md:text-base text-sm border-2
                      border-green-600 hover:bg-green-600 text-slate-50 rounded-2xl' 
                      type='submit'> confirm <MdOutlinePayments className='ml-2'/>
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
            <div className='bg-slate-900 opacity-95 fixed inset-0 z-20'>
              <div className="flex h-screen justify-center items-center">
                <UserDetails />
              </div>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Profile