import React from 'react';
import { useNavigate } from 'react-router-dom';


//mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { Hidden } from '@mui/material';

export default function ButtonAppBar() {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  function handleLogin() {
    
    if (!token) {
      navigate('/login');
    } else {
      if (role == 1) {
        navigate('/subscriber');
      } else if (role == 2 || role == 22) {
        navigate('/provider');
      } else if (role == 3) {
        navigate('/admin');
      } else if (role == 4) {
        navigate('/superUser');
      }else if (role == 5) {
        navigate('/admin');
      }else {
        console.log('Invalid user role');
      }
    }

  }

  function handleRegister(){
    if (!token) {
      navigate('/register');
    } else {
      if (role == 1) {
        navigate('/subscriber');
      } else if (role == 2 || role == 22) {
        navigate('/provider');
      } else if (role == 3) {
        navigate('/admin');
      } else if (role == 4) {
        navigate('/superUser');
      }else if (role == 5) {
        navigate('/admin');
      }else {
        console.log('Invalid user role');
      }
    }
  }

  return (
    //#161f32
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ backgroundColor: '#e5e7eb' }}>
        <Toolbar style={{color:"black"}}>
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1}}>
            Cloud Copier
          </Typography>

          <Hidden smDown>
            <Button onClick={handleLogin} sx={{borderRadius:3}} color="inherit" className='pr-3'>Login</Button>  
            <Button onClick={handleRegister} variant='contained' sx={{borderRadius:3}} color="primary">Signup</Button>
          </Hidden>
          <Hidden mdUp>
            <LoginIcon onClick={handleLogin} className='cursor-pointer' />
          </Hidden>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}