import React from 'react';
import img from '../../assets/img/user.png';

const subscribe = ( { subscriber } ) => {
  return (
    <>
    <div className="max-w-xs p-4 rounded-lg bg-gray-800 border-gray-700 shadow-md shadow-blue-400">
        <div className='flex'>
            <img className="w-10 h-10 md:w-14 md:h-14 mb-3 rounded-full shadow-lg" src={subscriber.profile || img } alt="profile" />
            <>
                <h5 className="ml-3 mt-3 text-base md:text-xl font-bold tracking-tight capitalize
                text-gray-900 dark:text-white">{subscriber.firstName +' '+ subscriber.lastName}</h5>
            </>
        </div>

        <div className='flex'>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mr-5">
                Telegram  <samp>: </samp>
                {subscriber.telegram}
            </p>
        </div>
    </div>
    </>
  )
}

export default subscribe