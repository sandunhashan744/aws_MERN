import React from 'react'
import Navbar from './Navbar'

// react-Icons
//import { AiOutlineDownload } from 'react-icons/ai';

//MUI
import Button from '@mui/material/Button';

import sub1 from '../../assets/setUpImg/sub1.jpg'
import sub2 from '../../assets/setUpImg/sub2.png';
import sub3 from '../../assets/setUpImg/sub3.jpg';

const Setup = () => {
    //download function
    function download() {
        const fileId = '1_Wy13Ux5gYwzdzQJ4GD9hBMekfNfnjVx';
        const fileUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        window.location.href = fileUrl;
    }
  return (

    <div>
        <Navbar/>
        <div className='container'>
            <div className='float-right'>
                {/* <button onClick={download} className='bg-blue-600 p-2 rounded-xl flex items-center'>
                    Download Set-Up 
                    <AiOutlineDownload className='ml-2 text-xl font-bold animate-bounce'/> 
                </button> */}
                <Button 
                onClick={download}
                variant='contained' 
                sx={{borderRadius:3}} 
                color='primary'> 
                    Download Set-up
                </Button>
            </div>
            <div className='md:mt-16 mt-12 bg-slate-100 rounded-2xl p-5'>
                <h3 className='flex justify-center md:text-3xl text-xl md:pt-5'>Setting up MT4 Client EA</h3>
                <div className='md:p-10 p-2'>
                    <p className='md:text-lg'>EA capabilities can be improved and enhanced by external servers. 
                        External servers can be used for below services.</p>
                    <div className='flex md:py-4 py-1'>
                        <ul>
                            <li>automated for signals.</li>
                            <li>make sensitive forex news.</li>
                            <li>authenticate clients.</li>
                            <li>motiterting purposes.</li>
                            <li>copy trades.</li>
                        </ul>    
                    </div>
                    <p className='mb-2 md:text-lg'>If you use an external server for your EA, you need to set it up in MT4.</p>

                    <li>{'Go to the below window, Tools->Options->Expert Advisors as below windows.'}</li>
                    
                    <div class="flex justify-center items-center mb-5">
                        <img src={sub1} alt="sub1" className='w-3/4'/>
                    </div>
                    <div class="flex justify-center items-center mb-5">
                        <img src={sub2} alt="sub2" className='w-3/4'/>
                    </div>

                    <li>Now enable 
                        <span className='bg-cyan-500 text-black mx-1'>Allow webRequest for listed URL</span> 
                        and click<span className='bg-cyan-500 text-black mx-1'>add new URL</span> 
                        and add server url
                    </li>

                    <p className='my-4 md:text-lg md:pb-5'>Above server url should be configured in your MT4 account. 
                        You can do this by referring to the server url section.</p>
                    <hr/>
                    
                    {/* CONNECTING TO BRIDGE */}

                    <h3 className='flex justify-center md:text-3xl text-xl pt-5'>Connecting to the Bridge</h3>
                    <p className='my-4 md:text-lg'>
                    {`Add your server url (http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/) in to the
                    MT4 Tools > Options > Expert Advisors > Allow WebRequest for listed URL (Tick the checkbox)`}
                    </p>
                    <div class="flex justify-center items-center">
                        <img src={sub3} alt="sub3" className='w-3/4' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Setup