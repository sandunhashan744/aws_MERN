import React from 'react';
import { FaSignal,FaLongArrowAltRight } from 'react-icons/fa';
import img from '../../assets/img/user.png';
import { Link } from 'react-router-dom';

const Channel = ( { channel } ) => {
  return (
    <>
    <div className="max-w-xs p-3 rounded-lg  bg-gray-800 border-gray-700 shadow-md shadow-blue-400">
        <div className='flex'>
            <img className="w-10 h-10 mb-3 rounded-full shadow-lg" src={channel.profile || img} alt="profile"/>
            <>
                <h5 className="ml-3 mt-3 text-base md:text-xl font-bold tracking-tight capitalize
                text-gray-900 dark:text-white">{channel.channelName}</h5>
            </>
        </div>

        <div className='flex'>
            {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mr-5">
                subscribers  <samp>: </samp>
                {channel.acuracy || ''}
            </p> */}
        <div className='flex '>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Accuracy  <samp>: </samp></p>
            <FaSignal className='w-5 h-5 ml-2 text-green-500' />
        </div>
        
        </div>
        
        <Link to={`/provider/1`} className="inline-flex items-center px-3 py-2 text-sm font-medium 
        text-center text-white focus:ring-4 focus:outline-none border-2 border-blue-600 hover:bg-blue-700
        focus:ring-blue-800 animate-pulse rounded-xl">
            Subscribe
            <FaLongArrowAltRight className='ml-1' />
        </Link>
    </div>
    </>
  )
}

export default Channel