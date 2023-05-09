import React,{useEffect, useState} from 'react'
import Subscribe from './subsribe';
import { AiOutlineSearch } from 'react-icons/ai';

//import the axios function
import { getSubscriber } from '../authModule/helper/helper'

//page loading
import ClockLoader  from "react-spinners/ClockLoader";

const Subscribers = () => {
    
    const [getData, setData] = useState([])

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await getSubscriber();
          const subscriber = response.data;
          setData(subscriber);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
    }, []);


  return (
    <>
    <div className='container'>
        <div className='flex items-center justify-end pt-4 md:pt-0 pb-8 px-2 w-auto '>
            <input className='bg-transparent border-b-2 p-1 outline-none animate-pulse' placeholder="Search Here" />
            <AiOutlineSearch size={20}  className='absolute text-slate-400 mr-2' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-5 py-4 px-1' style={{ alignItems: 'center' }}>
            {isLoading ? (
                <div className='loading'>
                <ClockLoader color="#aeddd4" />
                </div>
            ) : (
                getData.map((subscriber) => (
                <div key={subscriber._id}>
                    <Subscribe subscriber={subscriber} />
                </div>
                ))
            )}
        </div>

    </div>
    </>
  )
}

export default Subscribers