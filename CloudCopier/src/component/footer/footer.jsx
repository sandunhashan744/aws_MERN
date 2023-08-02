import React from 'react';

// social meadia icons
//import { BsWhatsapp, BsTelegram, BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'

const footer = () => {
  return (
    <>
    <footer className="py-7 px-6 md:px-16 bg-gray-200 w-full border-t-2  border-slate-100">
        <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-black sm:text-center ">© 2023 <a href="https://flowbite.com/" className="hover:underline">TradeCopier™</a>. All Rights Reserved.
            </span>
            {/* <div className="flex mt-4 space-x-6 justify-center sm:mt-0 text-slate-400 ">

              <BsTelegram className='hover:scale-150 cursor-pointer'/>
              <BsWhatsapp className='hover:scale-150 cursor-pointer'/>
              <BsFacebook className='hover:scale-150 cursor-pointer'/>
              <BsInstagram className='hover:scale-150 cursor-pointer' />
              <BsTwitter className='hover:scale-150 cursor-pointer'/>
                
            </div> */}
        </div>
    </footer>
    </>
  )
}

export default footer