import React, { useEffect, useState } from "react";
import "./Home.css";
import LeftNavBar from "../components/LeftNavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import {Navigate} from 'react-router-dom';
// import Loading from "../components/Loading";
// import {APIgetUserEmail} from "../API/UsuariosAPI";
import { APIgetAllProducts } from "../API/ProductosAPI";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
}));

const Pruebas = () => {

    useEffect(() => { //corre cuando renderiza el componente
        getAllProducts();
    }, []);

    
    const getAllProducts = async() =>{

        await APIgetAllProducts().then(result =>{
            let x = result
            console.log(x)

        })

    };
    

    return(
        <Box class ="m-3 p-1 h-100" mx={{ flexGrow: 1 }} >
            <Grid container spacing={2} className = 'hola'>
              <Grid item md={2}>
                    <LeftNavBar />
              </Grid>
              <Grid item md={10} >
                <Item>
                    <p>{}</p>
                </Item>
              </Grid>
            </Grid>
        </Box>
    );
    

};
export default Pruebas;