import React,{useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//footer+navbar
import Footer from "./component/footer/footer";
// import NavBar from './component/navbar/navBar';

//home
import HomeScreen from './component/home/HomeScreen';

// ** loarding **
import PropagateLoader from "react-spinners/PropagateLoader";

//Auth Modules
import Login from './component/authModule/Login'
import Register from './component/authModule/Register';
import OTPVerify from './component/authModule/OTPVerify';
import Reset from './component/authModule/Reset';

// auth middleware 
import { AuthorizeUser } from './component/authModule/middleware/auth-route';

//provider
import Provider from './component/signalProvider/Provider'
import Subscriber from './component/subscriber/Subscriber';

//Subscriber
import SubscriberSetUp from './component/subscriber/Setup';
import ProviderSetUp from './component/signalProvider/Setup';
import MyChannels from './component/subscriber/profile/MyChannels';

// Administrator
import Administrator from './component/administrator/Administrator'

//super-user
import SuperUser from './component/superUser/SuperUser';

// ************************ Permission *******************
import {isAllowed} from './component/permManager/ManagePerm'
//---------------------------------------------------------

function App() {

const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true)

  setTimeout(() => {
    setLoading(false)  
  }, 6000);

}, []);

  return (
    <div>
    {loading ? (
      <div className='loading'>      
        <PropagateLoader color="black" />
      </div>    
    ):(
      <BrowserRouter>

      {/* <NavBar/> */}
        <Routes>
          <Route path = '/' element = { <HomeScreen /> } />

          {/* Auth routes */}
          <Route path = '/login' element = { <Login /> } />
          <Route path = '/register' element = { <Register /> } />
          <Route path = '/get-otp' element = { <OTPVerify /> } />
          <Route path = '/reset' element = { <Reset /> } />

          {/* Povider/master */}
          <Route path = '/provider' 
          element = { <AuthorizeUser allowedRoles={['2','22']}> 
            <Provider showCreate={isAllowed('CHANNEL_CREATE')} channelDelete={isAllowed('CHANNEL_DELETE')} /> 
          </AuthorizeUser> } />  

          <Route path = '/provider-setup' element = { <AuthorizeUser allowedRoles={['2','22']}> <ProviderSetUp /> </AuthorizeUser> } />
          
          {/* Subscriber/ */}          
          <Route path = '/subscriber' element = { <AuthorizeUser allowedRoles={['1']}> <Subscriber /> </AuthorizeUser> } />
          <Route path = '/my-channels' element = { <AuthorizeUser allowedRoles={['1']}> <MyChannels /> </AuthorizeUser> } />
          <Route path = '/subscriber-setup' element = { <AuthorizeUser allowedRoles={['1']}> <SubscriberSetUp /> </AuthorizeUser> } />

          {/* Administrator */}
          <Route path = '/admin' 
          element = {<AuthorizeUser allowedRoles={['3','4','5']}> 
          <Administrator showDelete={isAllowed('USER_DELETE')} /> 
          </AuthorizeUser>} />

           {/* Super User  */}
           <Route path = '/superUser' element = {<AuthorizeUser allowedRoles={['4']}><SuperUser /></AuthorizeUser>  } />

        </Routes>
        <Footer />
      </BrowserRouter>
    )
    }
    </div>
  );
}

export default App;
