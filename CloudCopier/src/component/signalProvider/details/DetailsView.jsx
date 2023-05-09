import React from 'react';
import { Link } from 'react-router-dom';
import img2 from '../../../assets/img/img2.jpg';
import Details from './details'
//import { AiOutlineUserAdd } from 'react-icons/ai'

const DetailsView = () => {
  return (
    <>
    <div className='container text-center '>
      <div className="w-full rounded-3xl md:px-5 bg-gray-800 border-gray-700">
        <div className="grid grid-cols-1 gap-5 md:gap-2 md:grid-cols-4 items-center pb-5 md:pb-10 pt-5 md:pt-10">
            {/* subscriber pimary detail */}
            <div className=' border-2 border-gray-500 rounded-3xl py-5 mx-5  md:col-span-1'>
              <div className='flex flex-col items-center'>
                <img className="w-24 h-24 mb-3 items-center rounded-full shadow-lg" src={img2} alt="testimage"/>
              </div>
                
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                  
                  <div className=" mt-4 space-x-3 md:mt-6">
                      <Link  to={'/'}  className="inline-flex items-center px-4 py-2 text-sm 
                      font-medium text-center text-white border-2 border-blue-700 rounded-lg hover:bg-blue-800
                      focus:ring-4 focus:outline-none">Friend</Link>
                      
                      <Link to={'/'} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center
                      text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100
                      focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white
                      dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Back</Link>
                  </div>
            </div>

            {/* Provider Details */}
            <div className='border-2 border-gray-500 rounded-3xl py-5 mx-5 md:col-span-3 md:row-span-2'>
              <Details />
            </div>

        </div> 
      </div>
    </div>
    </>
  )
}

export default DetailsView