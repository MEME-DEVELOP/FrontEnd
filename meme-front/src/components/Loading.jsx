import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';
import "./Loading.css";

const Loading = () => {
  
  return (
    <div className='box'>
            <Stack className = "it">
                <h1>Loading ...</h1>
                <CircularProgress size="10rem" color="success" />
            </Stack>
        
    </div>
  );
};

export default Loading;