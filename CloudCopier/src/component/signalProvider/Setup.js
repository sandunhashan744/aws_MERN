import React from 'react'
import Navbar from './Navbar'

// react-Icons
//import { AiOutlineDownload } from 'react-icons/ai';

//MUI
import Button from '@mui/material/Button';

//css
import styles from './css/style.module.css';

//images
import sp1 from '../../assets/setUpImg/sp1.png'
import sp2 from '../../assets/setUpImg/sp2.png';
import sp3 from '../../assets/setUpImg/sub3.jpg';
import sub3 from '../../assets/setUpImg/sub3.jpg';

const Setup = () => {
    
    function download() {
       // https://drive.google.com/file/d/1ZZoXr7l-YaSQZng_Mz3o05t5sESwFZvJ/view?usp=sharing -> provider
        const fileId = '1ZZoXr7l-YaSQZng_Mz3o05t5sESwFZvJ';
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
                <h3 className='flex justify-center md:text-3xl text-xl md:pt-5'>Setting up MT4 Server EA</h3>
                <div className='md:p-6'>
                    <div className='flex py-4'>
                        <ul>
                            <li> To work with EA, your MT4 should be up with internet throughput market open time.
                                Otherwise you might miss some of its actions. So hosting EA in virtual machines is a
                                better option for forex bots. contact us for more details</li>
                            <li> Download and install MT4 software to your local or host machine. Request the setup
                                files from your registered broker for your platform (ie windows and mac).
                            </li>

                            <li>Open Mt4 and “Auto Trading” should be enabled to work with EA as shown in below.</li>
                            <div className="flex justify-center items-center">
                                <img src={sp1} alt="sp1" className='md:w-3/4 w-full'/>
                            </div>

                            <li> EA should be attached to your EA account.</li>
                            <li className={styles.sublist}>
                                First you need to find, MT4 installed location in your local machine.
                                <div>ex:- MQL4/Experts</div>
                                <li>you can search Experts directory in your software directory.</li>
                            </li>

                            <div className="flex justify-center items-center mb-5">
                                <img src={sp2} alt="sp2" className='md:w-3/4 w-full'/>
                            </div>

                            <li className={styles.sublist}>Then copy the ex4 formatted file inside the Experts directory.</li>
                            <li className={styles.sublist}>And restart the MT4 and EA will appear in your MT4 as below.</li>
                            
                            <div className="flex justify-center items-center my-5">
                                <img src={sp3} alt="sp3" className='md:w-3/4 w-full'/>
                            </div>

                            <li className={styles.sublist}>
                                Now attach EA to the relevant forex graph or double click on it. it will be attached
                                to the primary graph automatically. Now you will see below the window and you
                                need to customise given parameters and click ok.<span className='bg-cyan-500 text-black mx-1'> These input parameters can
                                be changed during run time.</span>
                            </li>
                            <li className={styles.sublist}> Now your EA should be working.</li>

                        </ul>    
                    </div>
<hr/>
                    {/* CONNECTING TO BRIDGE */}
                    <h3 className='flex justify-center md:text-3xl text-xl md:my-10 my-5'>Connecting to the Bridge</h3>
                    <p className='my-4 md:text-lg'>
                    {`Add your server url (http://ec2-3-13-109-220.us-east-2.compute.amazonaws.com/) in to the
                    MT4 Tools > Options > Expert Advisors > Allow WebRequest for listed URL (Tick the checkbox)`}
                    </p>
                    <div className="flex justify-center items-center">
                        <img src={sub3} alt="sub3" className='md:w-3/4 w-full'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Setup