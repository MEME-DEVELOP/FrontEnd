import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {APIgetIdByEmail} from "../API/UsuariosAPI";
import { APIgetFacturabyID, getFacturaID, } from "../API/FacturaAPI";
import { APIgetregistrobyID} from "../API/RegistroAPI";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Loading from '../components/Loading';
import {Typography, Grid, Button } from "@mui/material";
import { blue } from "@mui/material/colors";

import DetailsIcon from '@mui/icons-material/Receipt';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useNavigate } from "react-router-dom";
import "./VerFacturas.css"


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    overflow: "hidden"

}));


const VerFacturas =()=>{
    const [facturas, setFacturas] = useState([])
    const [prodId, setProdId] = useState(0);
    const [userActID, setUserActID] = useState(0);
    const [isLoading, setLoading] = useState(true)
    const [isEmpty, setisEmpty] = useState(true)
    const [open, setOpen] = useState(false);
    
    let navigate = useNavigate();

    const { user} = useAuth0();

    const [datos, setDatos] = useState({
        idfactura: 0,
        nombre: "",
        idusuario: 0,
        stock: 0,
        imagen: "",
        idusuario: 0
    });

    useEffect(() => { //
        idFactura();
        getFacturas();
        getRegistros();
       
    }, [open]);

    

    const idFactura = async() =>{
        let data = await getFacturaID();
        
        setProdId(data)

        
        
    }


    const handlePedidos = (event) =>{
        event.preventDefault();
        navigate("/Pedidos", { replace: true });
    }

 



    const getFacturas = async() => {
        var x;
        await APIgetIdByEmail(user.email).then(result =>{
            x = result
            setUserActID(result)
        })
        await APIgetFacturabyID(x).then(result =>{
            if (result === undefined){
                setisEmpty(false)
            }else{
                setisEmpty(true)
            }
            setFacturas(result)
            setLoading(false)
            
        })

        
    };

    const getRegistros = async() => {
        var x;
        await APIgetIdByEmail(user.email).then(result =>{
            x = result
            setUserActID(result)
        })
        await APIgetregistrobyID(x).then(result =>{
            if (result === undefined){
                setisEmpty(false)
            }else{
                setisEmpty(true)
            }
            //setRegistros(result)
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
                            FACTURAS
                        </Typography>
                        <br/>
                        <Typography variant="h6" sx={{alignSelf:"center"}} >
                        Aqui se despliegan todas las facturas que tienes almacenados en tu inventario
                            <br></br>
                            A tu derecha tendrás un botón para crear una factura
                        </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{alignSelf:"center"}}>
                        <Fab variant="extended" color="primary" aria-label="add" onClick={handlePedidos}>
                            <AddIcon  sx={{ mr: 1 }} />
                            Nueva factura
                        </Fab>
                        </Grid>
                    </Grid>
                    <div className="scrollearFact ">
                        {
                            isEmpty && facturas.map((it, indice) => (

                                <div  key= {it.idfactura} class="rounded-3 p-3 mx-3 mb-4 shadow-lg ">
                                    <div class="row">
                                        <div class="col">
                                            <Typography variant="h5"  >
                                                Factura #{indice+1}
                                            </Typography>
                                        </div>
                                        <div class="col">
                                            <Typography variant="h7" sx={{alignSelf:"center"}} >
                                                Fecha factura: {it.fecha}
                                            </Typography>
                                        </div>
                                        <div class="col">
                                            <Button variant="outlined" >Detalles</Button>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            ))
                        
                            
                        }
                                                
                        {/*
                            isEmpty && facturas.map((it) => (
                                
                                <Paper key={it.idfactura} elevation={6} sx = {{width: 200, height: 250}}> 
                                    <Stack spacing = {1}>
                                            <Typography variant="h5" sx={{alignSelf:"center"}} >
                                                {it.nombre}
                                            </Typography>
                                        
                                            <Avatar src = {it.imagen} sx={{ width: 100, height: 100, alignSelf:"center" }} />
                                    
                                            <Typography variant="h7" sx={{alignSelf:"center"}} >
                                                Identificación usuario: {it.idusuario}
                                            </Typography>
                                            
                                            <Typography variant="h7" sx={{alignSelf:"center"}} >
                                                Fecha factura: {it.fecha}
                                            </Typography>
                                            

                                            
                                        <Grid container spacing = {1}>
                                        <Grid item xs = {9}>
                                            <Button size ="small" variant= "outlined" startIcon={<DetailsIcon /> }> Detalles </Button>
                                            
                                        </Grid>
                                        <Grid item xs = {5}>
                                            
                                            
                                        </Grid>
                                        </Grid>
                                    </Stack>
                                </Paper>
                                
                            ))


                        
                        
                        */}
                    </div>
                    
                </Item>
              </Grid>
            </Grid>

            </Box>

        
        
        );

};
export default VerFacturas;