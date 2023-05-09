import React from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai'

const Chanals = () => {
  return (
    <div className='container h-screen'>      
      <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between py-3 bg-gray-900">
              <div >
                  <button id="dropdownActionButton" 
                  className="inline-flex items-center text-gray-400 font-medium rounded-lg
                  text-sm px-3 py-1.5 mx-3  bg-gray-800 border-gray-600 hover:bg-gray-700
                   hover:border-gray-600 focus:ring-gray-700" type="button">
                      <span class="sr-only">Action button</span>
                      Action
                      <MdOutlineKeyboardArrowDown />
                  </button>
                 
              </div>
              <label for="table-search" className="sr-only">Search</label>
              <div className="relative mx-3">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AiOutlineSearch />
                  </div>
                  <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
              </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Subscribers
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Accuracy
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                      
                      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="pl-3">
                              <div className="text-base font-semibold">TTC_1</div>
                              <div className="font-normal text-gray-500">Free for testing perpose</div>
                          </div>  
                      </th>
                      <td className="px-6 py-4">
                          900 qty
                      </td>
                      <td className="px-6 py-4">
                          59%
                      </td>
                      <td className="px-6 py-4">
                          <div className="flex items-center">
                              <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2 "></div> Available
                          </div>
                      </td>
                      <td className="px-4 py-4">
                        <button className='flex font-medium bg-blue-700 text-slate-200 rounded-xl px-3 py-2'>
                          Subscribe
                          <MdOutlineKeyboardArrowDown size={20} className='animate-bounce' />
                        </button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
  )
}

export default Chanals