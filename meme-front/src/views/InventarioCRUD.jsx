import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {APIgetIdByEmail} from "../API/UsuariosAPI";
import { APIgetProductsbyID } from "../API/ProductosAPI";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Loading from '../components/Loading';
import { Button, Stack, Typography, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import "./InventarioCRUD.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { deleteProductbyId } from "../API/ProductosAPI";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    overflow: "hidden"

}));


const InventarioCRUD =()=>{

    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)

    const { user} = useAuth0();

    useEffect(() => {
        getProducts();
       
    }, []);
    
    
    function handleRemove(id){
        console.log("entrea aqui ayudaaa")
        const newList = products.filter((item) => item.idproducto !== id);
        setProducts(newList);
        deletProduct(id);
    }

    const deletProduct = async(idDelProducto) =>{
        await deleteProductbyId(idDelProducto)
    } 

    const getProducts = async() => {
        let x = 0
        await APIgetIdByEmail(user.email).then(result =>{
            x = result
        })
        await APIgetProductsbyID(x).then(result =>{
            
            setProducts(result)
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
                    <Grid container sx={{alignSelf:"center"}}>
                        <Grid item xs={9}sx={{alignSelf:"center"}}>
                        <Typography variant="h4" sx={{color: blue[700],alignSelf:"center"}} >
                            INVENTARIO
                        </Typography>
                        <br/>
                        <Typography variant="h6" sx={{alignSelf:"center"}} >
                            Aqui se despliegan todos los productos que tienes almacenados en tu inventario
                            <br></br>
                            A tu derecha tendras un boton para agregar mas productos a tu inventario
                        </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{alignSelf:"center"}}>
                        <Fab variant="extended" color="primary" aria-label="add">
                            <AddIcon  sx={{ mr: 1 }} />
                            Agregar
                        </Fab>
                        </Grid>
                    </Grid>
                    <div className="contain">
                        {products.map((it) => (
                            <Paper key={it.idproducto} elevation={6} sx = {{width: 200, height: 250}}> 
                                <Stack spacing = {1}>
                                        <Typography variant="h5" sx={{alignSelf:"center"}} >
                                            {it.nombre}
                                        </Typography>
                                    
                                        <Avatar src = {it.imagen} sx={{ width: 100, height: 100, alignSelf:"center" }} />
                                   
                                        <Typography variant="h7" sx={{alignSelf:"center"}} >
                                            P/U: {it.preciounidad}
                                        </Typography>
                                        
                                        <Typography variant="h7" sx={{alignSelf:"center"}} >
                                            Stock: {it.stock}
                                        </Typography>
                                    
                                    <Grid item xs = {12}>
                                        <Button variant= "outlined" startIcon={<ModeEditIcon /> }></Button>
                                        <Button variant= "contained" color = "error" startIcon = {<DeleteIcon />} onClick = {()=>handleRemove(it.idproducto)}></Button>
                                    </Grid>
                                        
                                
                                </Stack>
                            </Paper>
                        ))}
                    </div>
                    
                </Item>
              </Grid>
            </Grid>
        </Box>
        );

};
export default InventarioCRUD;