import React,{ useState, useEffect, useRef } from 'react'
// react Icons
import { MdAddTask } from 'react-icons/md';
//import { RxCross2  } from 'react-icons/rx';

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
import Button from '@mui/material/Button';

import styles from '../subscriber/styles/style.module.css';
import toast,{Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { createChannel, getChannelById, getuserName } from '../authModule/helper/helper';

//default user
import img from '../../assets/img/user.png';

import ChannelList from './ChannelList'

//import base-64
import convetBase64 from '../authModule/helper/convert';

import Navbar from './Navbar';

const ProviderProfile = (props) => {

  const {channelDelete} = props;
  //console.log(channelDelete)

  const [email, setEmail] = useState('');
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  // create channel popup
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(null);

  //image-upload
  const [file, setFile] = useState();

  // setDetail
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getUserEmail();

    const fetchData = async () => {
      try {
        const response = await getChannelById(selectedChannel);
        //console.log(response)
        const { data } = response;
        setDetails(data);
       // console.log(details)
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedChannel) {
      fetchData();
    }

  },[selectedChannel]);

  //outside click
  const refUser = useRef(null);
  //outside click
  useEffect(() => {
    // Function to handle outside click
    function handleClickOutside(event) {
      if (refUser.current && !refUser.current.contains(event.target)) {
        setIsOpen(false)
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

  // for image upload
  const onUpload = async e =>{
    const base64 = await convetBase64(e.target.files[0]);
    setFile(base64); 
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

      const updatedValues = Object.assign({}, values, { email }, {logo: file});

        let newChannel = createChannel(updatedValues);
        toast.promise(newChannel, {
          loading : 'Creating...',
          success : <b>Added Successfully 🙂</b>,
          error : <b>Faild to Create 😟</b>
        });
        newChannel
        .then(() => {
          setChannels([...channels, newChannel]); 
          resetForm(); // reset form after successful submission
          togglePopup()
        })
        .catch(function(error){
          
          //const errMsg = error.response && error.response.data && error.response.data.error ? error.response.data.error : 'An error occurred';
          const errMsg = error?.response?.data?.error ?? 'An error occurred';
         // const errMsg = error.response.data.error;
          toast.error(<b>{errMsg}</b>); 
        }
      )
    }
  })
  
  return (
    <>
    <Navbar/>
    <div className='container'>
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

      <div className='grid grid-cols-1 md:grid-cols-3 md:gap-10'>

        {/** this is the create Channel **/}
        <div>
          <>
          {props.showCreate ? ( 
            <div className='flex pb-3'>
              {/* <button 
              onClick={togglePopup}
              className='flex items-center py-2 px-4 md:text-base text-sm border-2
              border-blue-600 hover:bg-blue-600 text-slate-50 rounded-2xl'> 
               New Channel 
              </button>  */}
              <Button 
              onClick={togglePopup} 
              style={{color:"white"}}
              sx={{borderRadius:3}} 
              variant='contained'>
                New Channel
              </Button>
            </div>
          ) : null }
          </>

          {/** this is Channel List **/}
          <div className='row-span-2'>
            <ChannelList channels={channels} onChannelSelect={handleChannelSelect} deleteChannel={channelDelete} />
          </div>
        </div>        
        
        {/** this is Channel Details **/}
        {details && (
          <div className='col-span-2 row-span-1 bg-slate-100 rounded-lg shadow-2xl capitalize'>
            <div className='mx-10 my-5 justify-center'>
              <div className='flex items-center mb-5 pb-2 border-b-2 border-blue-600'>
                <img className='w-14 h-14 rounded-full mr-2' src={details.logo || img} alt="avatar" />
                <span className='mx-2 font-bold text-lg'>{details.data?.client?.channelName || ''}</span>
              </div>
              
              <div className='grid md:grid-cols-3 grid-col-1 gap-5 '>
                <>
                  <div className='grid-cols-1 text-slate-600'>Account Id : 
                    <span className='mx-2 text-slate-900'>{details.data?.client?.accountID || ''}</span>
                  </div>
                          
                  <div className='grid-cols-1 text-slate-600'>Platform : 
                    <span className='mx-2 text-slate-900'>{details.data?.client?.platform}</span>
                  </div>

                  <div className='grid-cols-1 text-slate-600'>Subscriber Count : 
                    <span className='mx-2 text-slate-900'>{details.data?.client?.tenant}</span>
                  </div>
                </>
              </div>
            </div>      
          </div>
        ) }

        {/* create New Channel popup */}
        {
          isOpen && (

            <div className='bg-opacity-100 opacity-100 fixed inset-0 z-20'>
              <div className="fixed inset-0 backdrop-blur-sm" />
              <div ref={refUser} className="flex h-screen justify-center items-center">
                <div className='bg-slate-200 md:px-16 px-5 rounded-xl shadow-md shadow-sky-900 row-span-1 z-40 md:w-1/4 w-3/4 '>
                    
                  <div className='flex justify-center items-center'>
                    <h2 className='md:text-xl text-lg font-bold my-4'>Create New Channel</h2>          
                  </div>
                  
                  <form autoComplete='off' onSubmit={handleSubmit}  >

                    {/* text-box */}
                    <div className='grid md:gap-8 gap-4 items-center'>
          
                      {/* <div>
                        <label6for="cName" className='text-slate-900'>Channel Name</label>
                        <i9put 
                        type='text' 
                        id='channelName'
                        onChange={handleChange}
                        value={values.channelName}
                        onBlur={handleBlur}
                        className={styles.textBox}
                        required
                        />
                      </div> */}

                      <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password " >Channel Name</InputLabel>
                        <Input
                          type='text' 
                          id='channelName'
                          onChange={handleChange}
                          value={values.channelName}
                          onBlur={handleBlur}
                          className={styles.textBox}
                          //style={{color:"white"}}
                          required
                        />
                      </FormControl>

                      <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password " >Source Type</InputLabel>
                        <Input
                          type='text'
                          id="source" 
                          onChange={handleChange}
                          value={values.source}
                          onBlur={handleBlur}
                          className={styles.textBox}
                          //style={{color:"white"}}
                          required
                        />
                      </FormControl>

                      <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password " >Account Id</InputLabel>
                        <Input
                          type='text' 
                          id='accountID'
                          onChange={handleChange}
                          value={values.accountID}
                          onBlur={handleBlur}
                          className={styles.textBox}
                          //style={{color:"white"}}
                          required
                        />
                      </FormControl>

                      <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password " >Select Logo</InputLabel>
                        <Input
                          type='file' 
                          className='cursor-pointer ' 
                          onChange={onUpload}
                          //style={{color:"white", cursor: "pointer"}}
                          required
                        />
                      </FormControl>

                      {/* <div>
                        <label for="type" className='text-slate-500'>Source Type</label>
                        <input 
                        type='text'
                        id="source" 
                        onChange={handleChange}
                        value={values.source}
                        onBlur={handleBlur}
                        className={styles.textBox}
                        required
                        />
                      </div> */}

                      {/* <div>
                        <label for="acId" className='text-slate-500 '>Account Id</label>
                        <input 
                        type='text' 
                        id='accountID'
                        onChange={handleChange}
                        value={values.accountID}
                        onBlur={handleBlur}
                        className={styles.textBox}
                        required
                        />
                      </div> */}

                      {/* <div>
                        <label for="logo"  className='text-slate-500'>Select Logo</label>
                        <input type="file" 
                        className='cursor-pointer mt-5' 
                        onChange={onUpload} required />
                      </div> */}
                    </div>

                    {/* buttons */}
                    <div className='flex justify-center my-5 mt-2'>
                      {/* <button 
                      className='flex items-center py-2 px-3 md:text-base text-sm border-2
                      border-red-600 hover:bg-red-600 text-slate-50 rounded-2xl mx-2' 
                      onClick={togglePopup} > cancel <RxCross2 className='ml-2'/>
                      </button>  */}

                      {/* <button 
                      className='flex items-center py-2 px-3 md:text-base text-sm border-2
                      border-green-600 hover:bg-green-600 text-slate-50 rounded-2xl' 
                      type='submit'> Create <MdAddTask className='ml-2'/>
                      </button>  */}
                      <Button 
                      type='submit' 
                      color='success'
                      sx={{borderRadius:3}} 
                      variant='contained'>
                        Create
                      </Button>
                    </div>

                  </form>

                </div> 
              </div>
            </div>       
          ) 
        }
      </div>
    </div>
    </>
  )
}

export default ProviderProfile