import React,{ useState,useEffect } from 'react'

// tostMessage
import toast,{Toaster} from 'react-hot-toast';

// import the List of Subscriber
import SubscribeChannel from './SubscribeChannel';

//import the axios function
import { getChannels, getuserName, createTrader, getChannelById } from '../../authModule/helper/helper'

//nav-bar
import Navbar from '../Navbar';

//default user
import img from '../../../assets/img/user.png';

const Profile = () => {

 // const navigate = useNavigate();
  const [email, setEmail] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  //const [channels, setChannel] = useState(false);

  const [selectedChannel, setSelectedChannel] = useState(null); //subscribe channel details
  const [subscribe, setSubscribe] = useState([]); //subscribeChannels

  const [details, setDetails] = useState(null);

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
      const { data } = response;
      setDetails(data);

    } catch (error) {
      console.error(error);
    }
  };
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

  return (
    <>
    <Navbar/>
    <div className='container'>                     
      
      {/* toast message */}
      <Toaster position='top-center' reverseOrder={false} />

      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 '>

        {/* Add New Subscriber */}
        <div>
          {/* Subscribe Channels */}
          <SubscribeChannel subscribe={subscribe} onChannelSelect={handleChannelSelect} />
        </div>

        {/** this is the edit profile **/}
        {details && (
          <div className='md:col-span-3 md:row-span-2 bg-slate-100 md:px-16 px-6 py-10 rounded-xl shadow-2xl'>
            <div className='flex items-center mb-5 pb-2 border-b-2 border-blue-600'>
              <img className='w-14 h-14 rounded-full mr-2' src={details.logo || img} alt='logo' />
              <span className='mx-2 font-bold text-lg'>{details.data?.client?.channelName || ''}</span>
            </div>

            <div className='grid md:grid-cols-3 grid-col-1 gap-5 '>
              <>
                <div className='grid-cols-1 text-slate-600'>Account Id : 
                  <span className='mx-2 text-slate-900'>{details.data?.client?.accountID || ''}</span>
                </div>
                                  
                <div className='grid-cols-1 text-slate-600'>Provider : 
                  <span className='mx-2 text-slate-900'>{details.data?.client?.accountName || ''}</span>
                </div>

                <div className='grid-cols-1 text-slate-600'>Accuracy : 
                  <span className='mx-2 text-slate-900'>{'83%'}</span>
                </div>

                <div className='grid-cols-1 text-slate-600'>Total Subscribers : 
                  <span className='mx-2 text-slate-900'>{120}</span>
                </div>
              </>
            </div>
          </div>
        )}
        
      </div>

    </div>
    </>
  )
}

export default Profile