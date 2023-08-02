import React,{useEffect, useState} from 'react'
import Hero from '../hero/hero';
import Channels from '../signalProvider/Channel';
import { AiOutlineSearch } from 'react-icons/ai';
import  AppBar from './appBar';

//MUI
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

//page loading
import ClockLoader  from "react-spinners/ClockLoader";


//import the axios function
import { getChannels } from '../authModule/helper/helper'

//number of cards in the page
const PageSize = 8;

const HomeScreen = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // paginaton
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(originalData.length / PageSize);
  const startIndex = (currentPage - 1) * PageSize;
  const endIndex = Math.min(startIndex + PageSize, originalData.length);

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

  useEffect(() => {
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

  //search the 
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
    <AppBar />
    <Hero />

{/* wavy line */}
    <div className='w-full md:h-full px-4 pb-2 pt-1 md:px-28 bg-transparent '>
      <div className='bg-transparent rounded-2xl px-5 my-5 justify-items-end'>    
        <div className='py-3 md:py-5 md:my-3 '>
          {/* search */}
          <div className='flex items-center justify-end md:pt-0 pb-5 px-1'>
            <input 
              className='bg-transparent border-b-2 p-1 outline-none animate-none
               text-black w-3/5 md:w-1/4 text-sm md:text-base' 
              placeholder="Search Channels" 
              value={searchTerm}
              onChange={handleSearch}
            />
            <AiOutlineSearch size={20}  className='absolute text-black mr-2' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 py-4 px-1 '>
            
            {isLoading ? (
              <div className='loading '>
                {/* <ClockLoader color="#aeddd4" /> */}
              </div>
              ) : (
                getData.slice(startIndex, endIndex).map((chanels) => (
                  <div key={chanels._id}>
                      <Channels channel={chanels} />
                  </div>
                  )
                )
              )
            }
          </div> 
          
          <div className="flex justify-end mt-5 ">
            <div className="pagination ">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-1 py-1 mx-2 cursor-pointer rounded-md ${
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
      </div>
    </div>
    </>
  )
}

export default HomeScreen