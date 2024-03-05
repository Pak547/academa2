import React, { useState } from 'react';



//MUI IMPORTS
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Academa
          </Typography>
          <Button color="inherit" onClick={handleLoginClick}>Login</Button>
          <Button color="inherit">Signup</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
