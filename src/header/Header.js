import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Person } from '@mui/icons-material';
import './Header.css';

export default function Header(props) {
  const { loginDialogOpen, userName , logOut} = props;


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
       
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div className='header'>
              PicVista
            </div> 
          </Typography>
          {userName === "" ? 
          <Button  color="inherit" onClick={loginDialogOpen}><div className='button'>Login</div></Button> :
          <Button className='button' color="inherit" startIcon={<Person/>} onClick={logOut}><div className='button'>{userName}</div></Button>}
            
            
        </Toolbar>
      </AppBar>
    </Box>
  );
}

