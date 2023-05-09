import React,{ useState } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx'

//css
import styles from '../css/style.module.css'

const Details = () => {

    const [openTab, setOpenTab] = useState(1);

    const [hamBtn, setHamBtn] = useState(false);

    const Tabs=[
        {id : 1, name : 'About' },
        {id : 2, name : 'Servise' },
        {id : 3, name : 'Risk' },
        {id : 4, name : 'Review' },
    ];

  return (
    <>
    <div className=" mx-5 bg-white  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        
        {/* change the icons */}
        <div onClick={() => setHamBtn(!hamBtn)} className='cursor-pointer md:hidden
        text-slate-500 flex justify-end my-2 mx-2 animate-pulse'>
            
            {hamBtn ? <RxCross2 size={30} /> : <HiBars3BottomRight size={30} /> }

        </div>

        {/* md:screen */}
        <ul className="hidden md:flex flex-wrap text-sm text-center text-gray-500 md:border-b border-gray-500 " >
            {
                Tabs.map((tabs) =>(
                    <li className="mr-2">
                        <button  onClick={e => {e.preventDefault(); setOpenTab( tabs.id ) }} type="button" 
                        className={openTab===(tabs.id) ? styles.tabs_active : styles.tabs}> {tabs.name} </button>
                    </li>
                ))
            }
        </ul>

        {/* mobile hamberg */}
        {hamBtn && (
            <ul className='md:hidden flex flex-col justify-center w-2/3 rounded-xl py-2 items-center
             absolute bg-slate-700 text-slate-100'>
            {
                Tabs.map((tabs) =>(
                    <li className="mr-2" onClick={() => setHamBtn(!hamBtn)}>
                        <button  onClick={e => {e.preventDefault(); setOpenTab( tabs.id ) }} type="button" 
                        className={openTab===(tabs.id) ? styles.tabs_active : styles.tabs}> {tabs.name} </button>
                    </li>
                ))
            }
            </ul>
        )}

        {/* details */}        
        <div>
            <div className={openTab === 1 ? "block" : "hidden" }>
                <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" >
                    <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Powering innovation & trust at 200,000+ companies worldwide</h2>
                    <p className="mb-3 text-gray-500 dark:text-gray-400">Empower Developers, IT Ops, and business teams to collaborate at high velocity. Respond to changes and deliver great customer and employee service experiences fast.</p>
                    <a className="inline-flex items-center font-medium text-blue-800 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                        Learn more
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    </a>
                </div>
            </div>

            <div className={openTab === 2 ? "block" : "hidden" }>
                <div className=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
                    <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">We invest in the world’s potential</h2>
                    {/* <!-- List --> */}
                    <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                        <li className="flex space-x-2">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="font-light leading-tight">Dynamic reports and dashboards</span>
                        </li>
                        <li className="flex space-x-2">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="font-light leading-tight">Templates for everyone</span>
                        </li>
                        <li className="flex space-x-2">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="font-light leading-tight">Development workflow</span>
                        </li>
                        <li className="flex space-x-2">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="font-light leading-tight">Limitless business automation</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={openTab === 3 ? "block" : "hidden" }>
                <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
                    <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                        <div className="flex flex-col">
                            <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                            <dd className="font-light text-gray-500 dark:text-gray-400">Developers</dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
                            <dd className="font-light text-gray-500 dark:text-gray-400">Public repositories</dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
                            <dd className="font-light text-gray-500 dark:text-gray-400">Open source projects</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className={openTab === 4 ? "block" : "hidden" }>
                <div className=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
                    <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">We invest in the world's potential</h2>
                    {/* <!-- List --> */}
                    <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                        <li className="flex space-x-2">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="font-light leading-tight">Dynamic reports and dashboards</span>
                        </li>
                        <li className="flex space-x-2">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="font-light leading-tight">Templates for everyone</span>
                        </li>
                        <li className="flex space-x-2">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="font-light leading-tight">Development workflow</span>
                        </li>
                        <li className="flex space-x-2">
                            {/* <!-- Icon --> */}
                            <svg className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                            <span className="font-light leading-tight">Limitless business automation</span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        
    </div>
    </>
  )
}

export default Details