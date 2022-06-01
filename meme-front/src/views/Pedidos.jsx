import React from "react";
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HeaderCart from "../components/Cart/HeaderCart";
import MainCart from "../components/Cart/MainCart";
import BasketCart from "../components/Cart/BasketCart";
import data from "../data";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
}));


const Pedidos = ()  => {
    
    
        const { products } = data;
        const [cartItems, setCartItems] = useState([]);
        const onAdd = (product) => {
          const exist = cartItems.find((x) => x.idproducto === product.idproducto);
          if (exist) {
            setCartItems(
              cartItems.map((x) =>
                x.idproducto === product.idproducto ? { ...exist, qty: exist.qty + 1 } : x
              )
            );
          } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
          }
        };
        const onRemove = (product) => {
          const exist = cartItems.find((x) => x.idproducto === product.idproducto);
          if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.idproducto !== product.idproducto));
          } else {
            setCartItems(
              cartItems.map((x) =>
                x.idproducto === product.idproducto ? { ...exist, qty: exist.qty - 1 } : x
              )
            );
          }
        };
        return (
            <Box class ="m-3 p-1 h-100" mx={{ flexGrow: 1 }} >
            <Grid container spacing={2} className = 'hola'>
              <Grid item md={2}>
                
                    <LeftNavBar />
                
              </Grid>
              <Grid item md={10} >
                <Item>
                <div class="row">
                <div class="column"><HeaderCart countCartItems={cartItems.length}></HeaderCart></div>
                <div class="column"><BasketCart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} ></BasketCart></div>
                </div>
                <div>
                
                
                </div>
                <div className="row" >
                    
                <MainCart onAdd={onAdd} products ={products}></MainCart>
                
                
                </div>
                </Item>
              </Grid>
            </Grid>
        </Box>
            
            
        )

    

};
export default Pedidos;