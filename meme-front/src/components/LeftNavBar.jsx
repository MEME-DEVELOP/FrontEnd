import React,  { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Avatar, Grid } from "@mui/material";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { APIgetUserEmail } from "../API/UsuariosAPI";
import Loading from "./Loading";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const ButtonSett = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[700]),
    backgroundColor: blue[650],
    '&:hover': {
        backgroundColor: blue[900],
    },
}));

const LeftNavBar = () =>{

    let navigate = useNavigate();

    const [isLoading, setLoading] = useState(true)

    const { user, isAuthenticated } = useAuth0();
    const [userDatos, setUserDatos] = useState({
        nombreempresa: "",
        logo: "",
    });

    const handleUser =(event) => {
        event.preventDefault();
        navigate("/UserSettings", { replace: true });
    }

    const handleInventario = (event) =>{
        event.preventDefault();
        navigate("/Productos", { replace: true });
    }
    const handlePedidos = (event) =>{
        event.preventDefault();
        navigate("/Pedidos", { replace: true });
    }

    const handlePruebas =(event) => {
        event.preventDefault();
        navigate("/Pruebas", { replace: true });
    }

    const getUserInfo = async() => {
        APIgetUserEmail(user.email).then(result =>{
            let x = result[0]
            setUserDatos({...userDatos,
                logo: x.logo,
                nombreempresa: x.nombreempresa})
            
            setLoading(false)
        });

        
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    if (isLoading){
        return <Loading/>
    }
    return(
        isAuthenticated && (
        <div class = "h-100 p-3  bg-primary shadow-lg rounded-3 position-relative ">
            <Stack spacing={3} justifyContent="center" >
                <Typography variant="h4" sx={{color:blue[50], alignSelf:"center"}} >
                    {userDatos.nombreempresa}
                </Typography>
                <Avatar alt = {userDatos.nombreempresa}
                        sx = {{width: 100, height: 100, alignSelf: "center"}}
                         src = {userDatos.logo}></Avatar>
                <Button variant = 'contained' onClick={handleInventario}>Inventario</Button>
                <Button variant = "contained" onClick={handlePedidos} >Crear Factura</Button>
                <Button variant = "contained" > ver Factura</Button>
                
            </Stack>
            
            <div class = 'position-absolute bottom-0 start-0 m-4'>
                <Divider sx = {{paddingBottom: 2}}><ArrowDropDownCircleIcon sx ={{color:blue[50]}}/> </Divider>
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
                        <ButtonSett startIcon={<SettingsIcon />} size = "large" onClick={handleUser}></ButtonSett>
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