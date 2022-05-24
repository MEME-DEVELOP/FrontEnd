import React from "react";
import "./LeftNavBar.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Avatar, Grid } from "@mui/material";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import SettingsIcon from '@mui/icons-material/Settings';


const LeftNavBar = () =>{

    const { user, isAuthenticated } = useAuth0();
    
    
        return(
            isAuthenticated && (
            <div class = "h-100 p-3 bg-primary shadow-lg rounded-3 position-relative">
                <Stack spacing={2}>
                    <Button variant = 'contained' >Inventario</Button>
                    <Button variant="contained" >Productos</Button>
                    <Button variant="contained" >Contained</Button>

                    
                </Stack>
                <div class = 'position-absolute bottom-0 start-0 m-4'>
                    <Grid container>
                        
                        <Grid item class ="ms-3">
                            <h6 class = "text-white">{user.name}</h6>
                            <Avatar sx = {{width: 56, height: 56}}
                             src = {user.picture} 
                             ></Avatar>
                             
                        </Grid>
                        <Grid item>
                            <Button startIcon={<SettingsIcon/>}></Button>
                        </Grid>
                        <Grid item class ="ms-3 mt-2">
                            <LogoutButton />
                        </Grid>
                    </Grid>
                </div>
            </div>
            )
        );
    
};
export default LeftNavBar;