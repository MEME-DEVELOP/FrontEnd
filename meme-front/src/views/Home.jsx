import React from "react";
import "./Home.css";
import LeftNavBar from "../components/LeftNavBar";
import Tablas from "../components/Tablas";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import APIgetInventario from "../API/APIgetInventarios";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
}));




class Home extends React.Component{

   

    render(){
        return(
        <Box class ="m-3 p-1 h-100" mx={{ flexGrow: 1 }} >
            <Grid container spacing={2} className = 'hola'>
              <Grid item md={2}>
                
                    <LeftNavBar />
                
              </Grid>
              <Grid item md={10} >
                <Item>
                    <APIgetInventario></APIgetInventario>
                </Item>
              </Grid>
            </Grid>
        </Box>
        )
    };
}export default Home;