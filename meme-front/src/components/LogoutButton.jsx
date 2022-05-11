
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';


const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
      
        
      <button class="btn btn-danger " onClick={() =>
            logout({
            returnTo: window.location.origin,
            })
        }>

        <LogoutIcon/>
        Log Out
        
      </button>
      
     
  );
};

export default LogoutButton;