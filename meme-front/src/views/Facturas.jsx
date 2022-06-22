import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {APIgetIdByEmail} from "../API/UsuariosAPI";
import { APIgetProductsbyID, getProductID, postProduct} from "../API/ProductosAPI";
import { APIgetFacturabyID, getFacturaID, postFactura} from "../API/FacturaAPI";
import { APIgetregistrobyID, getregistroID, postRegistro} from "../API/RegistroAPI";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Loading from '../components/Loading';
import { Button, Stack, Typography, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import "./InventarioCRUD.css";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import DetailsIcon from '@mui/icons-material/Receipt';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { deleteProductbyId } from "../API/ProductosAPI";
import { deleteFacturabyId } from "../API/FacturaAPI";

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
    const [open, setOpen] = useState(false);
    const [openELIMINAR, setOpenELIMINAR] = useState(false)
   
    const handleClose = () => setOpen(false);
    let navigate = useNavigate();
    const handleCloseELIMIN = () => setOpenELIMINAR(false);

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
        getProducts();
    });
    
    const handleInputChange= (event) => {
        
        setDatos({
            ...datos,
            [event.target.name]:event.target.value
        })
      
    }

    const idFactura = async() =>{
        let data = await getFacturaID();
        
        setProdId(data)

        
        
    }

    const handleOpen = () => {
        setDatos({...datos,
            idfactura: prodId,
            idusuario: userActID})
        setOpen(true)
        
    };
    const handlePedidos = (event) =>{
        event.preventDefault();
        navigate("/Pedidos", { replace: true });
    }
    function handleRemove(id){
        deleteFactura(id);
    }

    const deleteFactura = async(idDeFactura) =>{
        deleteFacturabyId(idDeFactura)
        setOpenELIMINAR(true)
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

    const getProducts = async() => {
        let x = 0
        await APIgetIdByEmail(user.email).then(result =>{
            x = result
            setUserActID(x)
            setDatos({...datos,
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
            setDatos({...datos,
                idusuario: userActID})
        })
    };    
    const postingProduct = async(d) =>{
        setDatos({...datos,
            nombre: "",
            idusuario: 0,
            stock: 0,
            imagen: ""
           })
        
        await postProduct(d)
    } 

    const handleSubmit= (event) => {
        
        if(datos.idfactura === 0 ||  datos.nombre === "" || datos.idusuario === 0 || datos.stock === 0 || datos.idusuario === 0){
            alert("PORFAVOR RELLENA TODOS LOS CAMPOS")
            
        }else{
            let d = datos;
            setDatos({...datos,
                nombre: "",
                idusuario: 0,
                stock: 0,
                imagen: ""
            })

            postingProduct(d);
            setOpen(false);
            getFacturas();
            getRegistros();


            
        }
    } 


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
                                            {/* {registros.map((it) => (
                                                return (
                                                    <tr key={item.id}>
                                                    <td>{item}</td>
                                                    </tr>
                                                    );    
                                            ))} */}

                                            
                                        <Grid container spacing = {1}>
                                        <Grid item xs = {9}>
                                            <Button size ="small" variant= "outlined" startIcon={<DetailsIcon /> }> Detalles </Button>
                                            
                                        </Grid>
                                        <Grid item xs = {5}>
                                            
                                            {/* <Button  size ="medium" variant= "contained" color = "error" startIcon = {<DeleteIcon />} onClick = {()=>handleRemove(it.idfactura)}></Button> */}
                                        </Grid>
                                        </Grid>
                                    </Stack>
                                </Paper>
                            ))


                        
                        
                        }
                    </div>
                    
                </Item>
              </Grid>
            </Grid>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx ={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                Registra tu producto
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Acontinuacion llena los campos requeridos
            </Typography>
                <Stack spacing={2}>
                    <TextField
                        disabled
                        name="idfactura"
                        label="Id del Producto"
                        value = {datos.idfactura}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        sx = {{width: 300}}
                        
                        />
                        <TextField
                        required
                        name="nombre"
                        label="Nombre del Producto"
                        
                        variant="filled"
                        sx = {{width: 300}}
                        onChange = {handleInputChange}
                        />
                        <TextField
                        required
                        name="preciounidad"
                        label="Precio Unidad"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        sx = {{width: 300}}
                        onChange = {handleInputChange}
                        />
                        <TextField
                        required
                        name="stock"
                        label="Stock"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        sx = {{width: 300}}
                        onChange = {handleInputChange}
                        />
                        <TextField
                        required
                        name="imagen"
                        label="Imagen"
                        
                        variant="filled"
                        sx = {{width: 300}}
                        onChange = {handleInputChange}
                        />
                        <TextField
                        disabled
                        name="idusuario"
                        label="IdUser"
                        value = {datos.idusuario}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        sx = {{width: 300}}
                        
                        />
                    <Button variant="contained" onClick= {handlePedidos}>Nueva factura</Button>
                </Stack>

            </Box>
            </Modal>

            <Modal
                open={openELIMINAR}
                onClose={handleCloseELIMIN}
                aria-labelledby="modal-modal-title">
                <Box sx ={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h3">
                        Tu producto ha sido Eliminado
                </Typography>
                </Box>
            </Modal>
            </Box>

        
        
        );

};
export default Facturas;