import React,{useEffect, useState} from 'react'
import Hero from '../hero/hero';
import Channels from '../signalProvider/Channel';
import { AiOutlineSearch } from 'react-icons/ai';

//import the axios function
import { getChannels } from '../authModule/helper/helper'

//page loading
import ClockLoader  from "react-spinners/ClockLoader";

const HomeScreen = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    //localStorage.clear('token');
    async function fetchData() {
      try {
        const response = await getChannels();
        const channels = response.data;
        setData(channels);
        setOriginalData(channels)
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((channel) => {
    const channelName = channel.channelName;
    return channelName && channelName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getData = searchTerm ? filteredData : originalData;

  return (
    <>
    <Hero />

    <div className='w-full md:h-full px-4 pb-2 pt-1 md:px-28 bg-transparent '>
      <div className='bg-slate-900 rounded-2xl px-5 my-5 justify-items-end'>    
        <div className='py-3 md:py-5 md:my-3 '>
          <h1 className='text-slate-300  px-1 py-1 md:text-xl text-base md:font-bold'>Signal Channels</h1>
          {/* search */}
          <div className='flex items-center justify-end md:pt-0 pb-5 px-1'>
              <input 
              className='bg-transparent border-b-2 p-1 outline-none animate-pulse
               text-slate-300 w-3/5 md:w-1/4 text-sm md:text-base' 
              placeholder="Search Channels" 
              value={searchTerm}
              onChange={handleSearch}
              />
              <AiOutlineSearch size={20}  className='absolute text-slate-400 mr-2' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 py-4 px-1 '>
            
            {isLoading ? (
                  <div className='loading'>
                  <ClockLoader color="#aeddd4" />
                  </div>
              ) : (
                getData.map((chanels) => (
                  <div key={chanels._id}>
                      <Channels channel={chanels} />
                  </div>
                  ))
              )
            }

          </div>  
        </div>
      </div>
    </div>

    </>
  )
}

export default HomeScreen