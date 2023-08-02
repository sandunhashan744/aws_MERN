import React,{ useState, useEffect, useRef } from 'react';
//user Formik
import { useFormik } from 'formik';
// tostMessage
import toast,{Toaster} from 'react-hot-toast';
// react-Icons
import { MdOutlinePayments } from 'react-icons/md';
import { RxCross2  } from 'react-icons/rx';
import { FaSignal } from 'react-icons/fa';

// mui 
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// import { red } from '@mui/material/colors';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Height } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

//style
import styles from './styles/style.module.css';
//import the axios function
import { getChannels, getuserName, createTrader, getSubchannel, unsubscribeChannel } from '../authModule/helper/helper';
//nav-bar
import Navbar from './Navbar';
import img from '../../assets/img/user.png';
// import { act } from 'react-dom/test-utils';

// sweet alert
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
//import { Button } from '@mui/material';

//number of cards in the page
const PageSize = 12;


const Subscriber = () => {

  const [email, setEmail] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [channels, setChannel] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // payment popup
  const [subscribe, setSubscribe] = useState([]); //subscribeChannels

  const [subscribedData, setSubscribedData] = useState(null);

   // paginaton
   const [currentPage, setCurrentPage] = useState(1);
   const totalPages = Math.ceil(data.length / PageSize);
   const startIndex = (currentPage - 1) * PageSize;
   const endIndex = Math.min(startIndex + PageSize, data.length);
 
   //Next and previous
   const handlePreviousPage = () => {
     if (currentPage > 1) {
       setCurrentPage((prevPage) => prevPage - 1);
     }
   };
 
   const handleNextPage = () => {
     if (currentPage < totalPages) {
       setCurrentPage((prevPage) => prevPage + 1);
     }
   };
  
  //userEffect-onload
  useEffect(() => {
    getUserEmail()
    async function fetchData() {
      try {
        const response = await getChannels();
        const channels = response.data;
        setData(channels);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [subscribedData]);

  // Payment Popup
  const togglePopup = (channel) => {
    setIsOpen(!isOpen);
    setChannel(channel);
   //console.log(channel.account)
  };

  //outside click
  const refPay = useRef(null);

  //outside click
  useEffect(() => {
    // Function to handle outside click
    function handleClickOutside(event) {
      if (refPay.current && !refPay.current.contains(event.target)) {
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

  //get the user email
  function getUserEmail(){
    getuserName().then(result => {
      const userEmail = result.username;
      //console.log(userEmail)
      setEmail(userEmail);
      subChannels(userEmail)

    })
  }

  //get the subscribe channels
  function subChannels(email){
    getSubchannel(email)
    .then((response) => {
      const subscribed = response.data.map((sub) => sub.channelName);
      setSubscribedData(subscribed);
    });
  }

  //unsubscribe the channel
  function unsubscribe(chanels) {
    Swal.fire({
      title: 'Do you want to unsubscribe?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass:{
        popup:'my-popup-class'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        let data = { chanels, email };
        unsubscribeChannel(data);
      } else {
        console.log('Unsubscribe canceled.');
      }
    });
  }
  
  const {values, handleBlur, handleChange, handleSubmit, resetForm} = useFormik({
    initialValues : {
      account : '',
      channelName: '',
      channelId: '',
      email : ''
    },
   // validationSchema : registerSchema,
    onSubmit : async values => {  
      const updatedValues = Object.assign({}, values, {
        email,
        channelId: channels.account,
        channelName: channels.channelName,
      } );

      //console.log(updatedValues)
      
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
          const errMsg = error?.response?.data?.error ?? 'An error occurred';
          toast.error(<b>{errMsg}</b>); 
        })
    }
  })

  return (
    <div>
      <Navbar />  
      <div className='container'>                     
        {/* toast message */}
        <Toaster position='top-center' reverseOrder={false} />
        <div className='grid grid-cols-1'>

          {/** this is the edit profile **/}
          <div className=' md:row-span-2 md:px-16 px-5 rounded-xl '>
            <div className='grid md:grid-cols-4 grid-cols-1 gap-5 md:my-10'>
              {isLoading ? (  
                <div>Loading...</div>
                ) : (
                  data.slice(startIndex, endIndex).map((chanels) => (
                  <div key={chanels._id}>
                    
                    <Card sx={{ maxWidth: 345, borderRadius:3 }} className='cursor-pointer '>
                      <CardHeader
                        avatar={
                          <Avatar src={chanels.logo || img} aria-label="recipe" ></Avatar>
                        }
                        action={
                          <Stack direction="row" >
                            <Chip label="Risk" color="success" />
                          </Stack>
                        }
                        title={
                          <Typography variant="h6" component="h3" style={{ fontWeight: 'bold' }}>
                            {chanels.channelName}
                          </Typography>
                        }
                        subheader="High achive"
                      />
                      
                      <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1, marginRight: '10px' }}>
                          <Typography variant="body1" color="text.primary">
                            Gain
                          </Typography>
                          <Typography variant="body2" color="green" style={{ fontWeight: 'bold', alignItems: 'center' }}>
                            +12.5%
                          </Typography>
                        </div>
                        <div style={{ flex: 1, margin: '0 10px' }}>
                          <Typography variant="body1" color="text.primary">
                            Copiers
                          </Typography>
                          <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold', alignItems: 'center' }}>
                            510
                          </Typography>
                        </div>
                        <div style={{ flex: 1, marginLeft: '10px' }}>
                          <Typography variant="body1" color="text.primary">
                            Commission
                          </Typography>
                          <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold' }}>
                          10%
                          </Typography>
                        </div>
                      </CardContent>

                      {/* acctions */}
                      <CardActions sx={{ justifyContent: 'flex-end' }}>
                        {
                          subscribedData && subscribedData.includes(chanels.channelName) ? (
                            <Button 
                            onClick={() => unsubscribe(chanels.channelName)}
                            variant='outlined' 
                            sx={{borderRadius:3}} 
                            color='primary'>Unsubscribe</Button>
                          ):(
                            <Button 
                            onClick={() => togglePopup(chanels)}
                            variant='contained' 
                            sx={{borderRadius:3}} 
                            color='primary'>Subscribe</Button>
                          )
                        }
                      </CardActions>

                    </Card>
                  </div>
                ))
              )}
            </div>

            {/* pagination btn */}
            <div className="flex justify-end my-3 ">
              <div className="pagination">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-1 py-1 cursor-pointer rounded-md ${
                    currentPage === 1 ? 'bg-gray-400' : 'bg-blue-500'
                  }`}
                >
                  <NavigateBeforeIcon />
                </button>
                <span className="px-2 py-2">{`${currentPage} / ${totalPages}`}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-1 py-1 cursor-pointer rounded-md ${
                    currentPage === totalPages ? 'bg-gray-400' : 'bg-blue-500'
                  }`}
                >
                  <NavigateNextIcon /> 
                </button>
              </div>
            </div> 
          </div>

          {/* Payment Popup */}
          {
          isOpen && (
            <div className='bg-opacity-100 opacity-100 fixed inset-0 z-20'>
              <div className="fixed inset-0 backdrop-blur-sm" />
              <div ref={refPay} className="flex h-screen justify-center items-center">
                <div className='bg-slate-200 md:px-16 px-5 rounded-xl shadow-md shadow-sky-900 row-span-1 z-40 md:w-1/4 w-3/4 '>
          
                  <div className='flex justify-center items-center'>
                    <h2 className='md:text-xl text-lg font-bold my-2'>Pay Here</h2>          
                  </div>

                  <form autoComplete='off' onSubmit={handleSubmit} >

                    {/* text-box */}
                    <div className='grid md:gap-8 gap-4 items-center mt-8 '>

                      <div>
                        {/* <label className='text-slate-500'>Account Id *</label>
                        <input 
                        type='text' 
                        id='account'
                        required
                        onChange={handleChange}
                        value={values.account}
                        onBlur={handleBlur}
                        className={styles.textBox}
                        /> */}
                        <FormControl sx={{ m: 1, width: '25ch'}} variant="standard">
                          <InputLabel htmlFor="standard-adornment-password " >Account Id</InputLabel>
                            <Input
                            type='text' 
                            id='account'
                            required
                            onChange={handleChange}
                            value={values.account}
                            onBlur={handleBlur}
                            //className={styles.textBox}
                            />
                          </FormControl>


                      </div>

                      {/* <div>
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
                      </div> */}
                      
                    </div>

                    {/* buttons */}
                    <div className='flex justify-center items-end my-5 pt-3'>
                    {/* <button 
                    className='flex items-center py-2 px-3 md:text-base text-sm border-2
                    border-red-600 hover:bg-red-600 text-slate-50 rounded-2xl mx-2'
                    onClick={togglePopup} > 
                    cancel <RxCross2 className='ml-2'/>
                    </button>  */}

                    {/* <button 
                    className='flex items-center py-2 px-3 md:text-base text-sm border-2
                    border-green-600 hover:bg-green-600 text-slate-50 rounded-2xl' 
                    type='submit'> confirm <MdOutlinePayments className='ml-2'/>
                    </button>  */}

                    <Button 
                      type='submit' 
                      color='success' 
                      sx={{borderRadius:3}}  
                      variant='contained'>
                      confirm
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
    </div>
  )
}

export default Subscriber