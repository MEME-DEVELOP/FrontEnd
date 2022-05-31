import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Avatar, Grid } from "@mui/material";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';


const ButtonSett = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[700]),
    backgroundColor: blue[650],
    '&:hover': {
        backgroundColor: blue[900],
    },
}));

const LeftNavBar = () =>{

    const { user, isAuthenticated } = useAuth0();
    let state = {
        imgEmpresa: "",
        nombreEmpresa: ""

    }

    const getUserInfo = (async() => {
        state.imgEmpresa = "https://picsum.photos/id/237/200/300";
    })()

    
    return(
        isAuthenticated && (
        <div class = "h-100 p-3  bg-primary shadow-lg rounded-3 position-relative ">
            <Stack spacing={3} justifyContent="center" >
                <h1>{}</h1>
                <Avatar alt = "MEME"
                        sx = {{width: 100, height: 100, alignSelf: "center"}}
                         src = {state.imgEmpresa}></Avatar>
                <Button variant = 'contained' >Inventario</Button>
                <Button variant="contained" >Pedidos</Button>
                
            </Stack>
            <div class = 'position-absolute bottom-0 start-0 m-4'>
                <Grid container spacing={2} alignItems = "center">
                    <Grid item xs={12}>
                        <h6 class = "text-white">{user.name}</h6>
                    </Grid>
                    <Grid item xs={6}>
                        <Avatar sx = {{width: 56, height: 56}}
                         src = {user.picture} 
                         ></Avatar>
                    </Grid>
                    <Grid item xs = {6}>
                        <ButtonSett startIcon={<SettingsIcon />} size = "large"></ButtonSett>
                    </Grid>
                    <Grid item xs = {12} >
                        <LogoutButton />
                    </Grid>
                </Grid>
            </div>
        </div>
        )
    );
};
export default LeftNavBar;