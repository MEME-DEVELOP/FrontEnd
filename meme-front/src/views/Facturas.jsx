import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {APIgetIdByEmail} from "../API/UsuariosAPI";

import { APIgetFacturabyID, getFacturaID, postFactura} from "../API/FacturaAPI";
import { APIgetregistrobyID, getregistroID, postRegistro} from "../API/RegistroAPI";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Loading from '../components/Loading';
import { Button, Typography, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import "./InventarioCRUD.css";

import DetailsIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useNavigate } from "react-router-dom";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    overflow: "hidden"

}));


const Facturas =()=>{

    const [products, setProducts] = useState([])
    const [facturas, setFacturas] = useState([])
    const [registros, setRegistros] = useState([])
    const [prodId, setProdId] = useState(0);
    const [userActID, setUserActID] = useState(0);
    const [isLoading, setLoading] = useState(true)
    const [isEmpty, setisEmpty] = useState(true)
   
    let navigate = useNavigate();

    const { user} = useAuth0();

    useEffect(() => { //
        idFactura();
        getFacturas();
        getRegistros();
     
    }, [isLoading]);
    

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
            setRegistros(result)
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
                    <div className="contain">
                        {
                            
                            isEmpty && facturas.map((it, indice) => (
                                <div class = "shadow-lg rounded-3 m-2 p-4 d-flex flex-wrap gap-2 w-100" key={it.idfactura}>
                                    <div class =" ">
                                            <Typography variant="h5" sx={{alignSelf:"center"}} >
                                                Factura #{indice+ 1}
                                            </Typography>
                                    </div>
                                    <div class = "  ">
                                            <Typography variant="h5" sx={{alignSelf:"center"}} >
                                                {it.nombre}
                                            </Typography>
                                    </div>
                                    
                                    <div class = "  ">
                                            <Typography variant="h7" sx={{alignSelf:"center"}} >
                                                Fecha factura: {it.fecha}
                                            </Typography>
                                    </div>
                                    <div  class=" ">
                                        <Button size ="large" variant= "outlined" startIcon={<DetailsIcon /> }> Detalles </Button>
                                    </div>
                                </div>
                                
                                        
                                         
                            ))}
                    </div>
                    
                </Item>
              </Grid>
            </Grid>


            
            </Box>

        
        
        );

};
export default Facturas;