import React,{useState, useRef, useEffect} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

// get Subscriber image
import fetchUserAvatar from '../authModule/hook/featch-hook';
//user-details
//import UserDetails from '../subscriber/profile/UserDetails';
import UserDetails from '../navbar/userProfile/UserDetails'

// react-Icons
import { GoThreeBars } from 'react-icons/go';
//import { AiOutlineHome  } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';

//import avatar
import avatar from '../../assets/img/user.png';
//import style
import styles from './styles/style.module.css';

const Navbar = () => {

  const refUser = useRef(null);
  //outside click
  useEffect(() => {
    // Function to handle outside click
    function handleClickOutside(event) {
      if (refUser.current && !refUser.current.contains(event.target)) {
        //setIsClickedOutside(true);
        //navigate()
        setUserOpen(false)
      } else {
        //setIsClickedOutside(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [userOpen, setUserOpen] = useState(false); //user detail popup

  const navigate = useNavigate();

  const [nav, setNav] = useState(false);

  //back Function
  // function getBack(){
  //   setUserOpen(!userOpen);
  // }

  // function goBack(){
  //   navigate('/')
  // }

  // user Profile
  const userPopup = () => {
    setUserOpen(!userOpen);
  };
  
  // load profile Img
  const [{  apiData }] = fetchUserAvatar();

  return (
    <>
      <div className='p-3 items-center  flex justify-between cursor-pointer bg-slate-100 border-b-2 border-slate-400 md:px-28' >
        {/* <AiOutlineHome size={30}  className='cursor-pointer' onClick={goBack}/> */}
        <span className='text-xl font-extrabold'>Trade Copier</span>
        <div className={styles.test}>
          <NavLink
          to={'/subscriber'}
          className={ ({ isActive }) => (!isActive ? styles.link : styles.link_active) }
          >Add New</NavLink>
          <NavLink
          to={'/my-channels'}
          className={ ({ isActive }) => (!isActive ? styles.link : styles.link_active ) }
          >My channel </NavLink>
          <NavLink
          to={'/subscriber-setup'}
          className={ ({ isActive }) => (!isActive ? styles.link : styles.link_active ) }
          >How to setUp</NavLink>

        </div>

        <div className='flex items-center gap-1'>
        
          {/* avatar */}
          <div className='border rounded-full  '>
            <label htmlFor="profile">
            <img src={apiData?.profile || avatar} 
            className='h-8 w-8 rounded-full cursor-pointer' alt="avatar" 
            onClick={userPopup} />
            </label>
          </div>

          {/* hamberg Icon*/}
          <div onClick={() => setNav(!nav) } className='cursor-pointer md:hidden mx-1 z-20'>  
            {nav ? <RxCross2 size={30} /> : <GoThreeBars size={30} /> }
          </div>

        </div>

        {/* mobile hamberg menu */}
        {nav && (
          <ul className='md:hidden flex flex-col justify-center items-center w-full
          top-0 left-0 h-screen absolute bg-slate-200 z-10 '>    
            <NavLink
            to={'/subscriber'}
            className={ ({ isActive }) => (!isActive ? styles.link : styles.link_active) }
            >Add New</NavLink>
            <NavLink
            to={'/my-channels'}
            className={ ({ isActive }) => (!isActive ? styles.link : styles.link_active ) }
            >My channel </NavLink>
            <NavLink
            to={'/subscriber-setup'}
            className={ ({ isActive }) => (!isActive ? styles.link : styles.link_active ) }
            >How to setUp</NavLink>
          </ul>
        )}
        
      </div>

      {/* this is for user Profile */}
      {
        userOpen && (
          <div className='bg-opacity-100 fixed inset-0 z-50'>
          <div className="fixed inset-0 backdrop-blur-sm" />
          <div ref={refUser} className="flex h-screen justify-center items-center">
              <UserDetails/>
          </div>
          </div>
        )
      }
    </>
  )
}

export default Navbar