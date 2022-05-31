import React from "react";
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HeaderCart from "../components/Cart/HeaderCart";
import MainCart from "../components/Cart/MainCart";
import BasketCart from "../components/Cart/BasketCart";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
}));


class Pedidos extends React.Component {
    render() {
        return (
            <Box class ="m-3 p-1 h-100" mx={{ flexGrow: 1 }} >
            <Grid container spacing={2} className = 'hola'>
              <Grid item md={2}>
                
                    <LeftNavBar />
                
              </Grid>
              <Grid item md={10} >
                <Item>
                <div><h1>Carrito de compra</h1></div>
                <HeaderCart></HeaderCart>
                <div><MainCart></MainCart>
                <BasketCart></BasketCart>
                    </div>
                
                </Item>
              </Grid>
            </Grid>
        </Box>
            
            
        )

    }

}export default Pedidos;