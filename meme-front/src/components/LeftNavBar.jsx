import React from "react";
import "./LeftNavBar.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Avatar, Grid } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';


class LeftNavBar extends React.Component{


    render(){
        return(
            <div class = " h-100 p-3 bg-primary shadow-lg rounded-3">
                <Stack spacing={2}>
                    <Button variant = 'contained' >Inventario</Button>
                    <Button variant="contained" >Productos</Button>
                    <Button variant="contained" >Contained</Button>

                    <Grid container>
                        <Grid item>
                            <Avatar></Avatar>
                        </Grid>
                        <Grid item>
                            <LogoutIcon />
                        </Grid>
                    </Grid>
                </Stack>
                
                
            </div>

        )
    };
}export default LeftNavBar;