import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {APIgetIdByEmail} from "../API/UsuariosAPI";
import { APIgetProductsbyID } from "../API/ProductosAPI";
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./Pedidos.css"
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


const Pedidos = ()  => {
  const [products, setProducts] = useState([])
    const [prodId, setProdId] = useState(0);
    const [userActID, setUserActID] = useState(0);
    const [isLoading, setLoading] = useState(true)
    const [isEmpty, setisEmpty] = useState(true)
    
    const { user} = useAuth0();
    const [datos, setDatos] = useState({
          idproducto: prodId,
          nombre: "",
          preciounidad: 0,
          stock: 0,
          imagen: "",
          idusuario: userActID
    });


    useEffect(() => { //
      getProductsPedidos();
  }, []);

  const getProductsPedidos = async() => {
    let x = 0
    
    await APIgetIdByEmail(user.email).then(result =>{
        x = result
        setUserActID(x)
        
        setDatos({...products,
            idusuario: userActID})
            
    })
    
    await APIgetProductsbyID(x).then(result =>{
        if (result === undefined){
            setisEmpty(false)
        }else{
            setisEmpty(true)
        }
        setProducts(result)
        setLoading(false)
        setDatos({products,
            idusuario: userActID})
        console.log(products)    
    })
};
    // 
   
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
            <Grid container spacing={2} className = 'hola' >
              <Grid item md={2}>
                
                    <LeftNavBar />
                
              </Grid>
              
              <Grid item md={10} >
                
                <Item >
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col">
                <div  >
                  <div className="card text-center m-3">
                  <h1 className="card-header">Carrito de compras</h1>
                  <div className="card-body" ><BasketCart onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} ></BasketCart></div>
                  </div>
                </div>
                </div>
                <div class="col">
                <div class="card text-center m-3">
                  <h1 class="card-header" > Agregar productos al carrito</h1>
                  
                  <div class="card-body">
                    <div className="scrollear">
                      <MainCart  onAdd={onAdd} products ={products}></MainCart>
                    </div>
                  </div>
                  </div>
                  </div>

             
                </div>
                </div>
                </Item>
              </Grid>
              
            </Grid>
        </Box>
            
            
        )

    

};
export default Pedidos;