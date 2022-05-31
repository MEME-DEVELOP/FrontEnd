import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {APIgetIdByEmail} from "../API/UsuariosAPI";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Loading from '../components/Loading';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
}));


const UserSettings =()=>{

    const [idUser, setIdUser] = useState(0)
    const [isLoading, setLoading] = useState(true)
    const { user} = useAuth0();

    useEffect(() => {
        getIdUser();
    }, []);

    const getIdUser = () => {
        APIgetIdByEmail(user.email).then(result =>{
            setIdUser(result)
            setLoading(false)
        })
    };
    
    if(isLoading){
        return <Loading />
    }
    return (
            <Box class ="m-3 p-1 h-100" mx={{ flexGrow: 1 }} >
            <Grid container spacing={2} className = 'hola'>
              <Grid item md={2}>
                    <LeftNavBar />
              </Grid>
              <Grid item md={10} >
                <Item>
                    <p> Hola este es UserSettings</p>
                    <h1>ESTE ES EL ID</h1>
                    <h1>{idUser}</h1>
                </Item>
              </Grid>
            </Grid>
        </Box>
        );

};
export default UserSettings;