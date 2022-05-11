import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';

const Loading = () => {
  
  return (
    <div class = "m-0 vh-100 row justify-content-center align-items-center">
            <Stack class = "col-auto">
                <h1>Loading ...</h1>
                <CircularProgress size="10rem" color="success" />
            </Stack>
        
    </div>
  );
};

export default Loading;