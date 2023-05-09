import React,{useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//footer+navbar
import Footer from "./component/footer/footer";
// import NavBar from './component/navbar/navBar';

//home
import HomeScreen from './component/home/HomeScreen';
//signal Provider
import SignalProviders from "./component/signalProvider/signalProviders";
import DetailsView from './component/signalProvider/details/DetailsView';
//subscriber
import Subscribers from './component/subscriber/Subscribers';
//chanals
import Chanals from './component/chanal/Chanals';
//review
// import Testimonial from './component/testimonial/Testimonial';

// ** loarding **
import PropagateLoader from "react-spinners/PropagateLoader";

//Auth Modules
import Login from './component/authModule/Login'
import Register from './component/authModule/Register';
import OTPVerify from './component/authModule/OTPVerify';
import Reset from './component/authModule/Reset';
import Profile from './component/subscriber/profile/Profile';

// auth middleware 
import { AuthorizeUser } from './component/authModule/middleware/auth-route';

//signalProvider
import ProviderProfile from './component/signalProvider/profile/ProviderProfile';

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
        <PropagateLoader color="#aeddd4" />
      </div>    
    ):(
      <BrowserRouter>

      {/* <NavBar/> */}
        <Routes>
          <Route path = '/' element = { <HomeScreen /> } />
          <Route path = '/provider' element = { <SignalProviders /> } />
          <Route path = '/provider/1' element = { <DetailsView /> } /> 
          <Route path = '/subscriber' element = { <Subscribers /> } />   
          <Route path = '/chanal' element = { <Chanals /> } />

          {/* Auth routes */}
          <Route path = '/login' element = { <Login /> } />
          <Route path = '/register' element = { <Register /> } />
          <Route path = '/get-otp' element = { <OTPVerify /> } />
          <Route path = '/reset' element = { <Reset /> } />
          
          {/* Profile */}
          <Route path = '/profile' element = { <AuthorizeUser> <Profile /> </AuthorizeUser> } />
          <Route path = '/provider-profile' element = { <AuthorizeUser> <ProviderProfile /> </AuthorizeUser> } />

          {/* secure */}
          <Route path = '/provider/id' element = {<AuthorizeUser> <DetailsView /> </AuthorizeUser> } />
      
        </Routes>
        <Footer />
      </BrowserRouter>
    )
    }
    </div>
  );
}

export default App;
