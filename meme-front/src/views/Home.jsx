import React, { useEffect, useState } from "react";
import "./Home.css";
import LeftNavBar from "../components/LeftNavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UserSettings from "./UserSettings";
import {Navigate} from 'react-router-dom';
import Loading from "../components/Loading";
import {APIgetUserEmail} from "../API/UsuariosAPI";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
}));

const Home = () => {

    const { user} = useAuth0();

    const [isLoading, setLoading] = useState(true)
    const [isInDB, setIsInDB] = useState(false)

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        APIgetUserEmail(user.email).then(result =>{
            if (result === 0) {
                setIsInDB(false)
            } else{
                setIsInDB(true)
            }
            setLoading(false)
        })
    };

    if(isLoading){
        return <Loading />
    }

    if(!(isInDB)){
        return(
                <div>
                    <Navigate to="/Registering" replace={true} />
                </div>
        );
    }else{
        return(
            <Box class ="m-3 p-1 h-100" mx={{ flexGrow: 1 }} >
                <Grid container spacing={2} className = 'hola'>
                  <Grid item md={2}>
                        <LeftNavBar />
                  </Grid>
                  <Grid item md={10} >
                    <Item>
                        <p> HOla este es el home</p>
                    </Item>
                  </Grid>
                </Grid>
            </Box>
        );
    }

};
export default Home;