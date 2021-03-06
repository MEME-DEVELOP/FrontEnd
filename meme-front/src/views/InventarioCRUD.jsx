import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {APIgetIdByEmail} from "../API/UsuariosAPI";
import { APIgetProductsbyID, getProductID, postProduct, APIPutProduct} from "../API/ProductosAPI";
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
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

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


const InventarioCRUD =()=>{

    const [products, setProducts] = useState([]);
    const [prodId, setProdId] = useState(0);
    const [userActID, setUserActID] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [isEmpty, setisEmpty] = useState(true);
    const [open, setOpen] = useState(false);
    const [openELIMINAR, setOpenELIMINAR] = useState(false);
    const [openPUT, setOpenPUT] = useState(false);

    const [actualPRODUCT, setActualPRODUCT] = useState({
        idproducto: 0,
        nombre: "",
        preciounidad: 0,
        stock: 0,
        imagen: "",
        idusuario: 0
    });
   
    const [datos, setDatos] = useState({
        idproducto: 0,
        nombre: "",
        preciounidad: 0,
        stock: 0,
        imagen: "",
        idusuario: 0
    });

    const handleClose = () => setOpen(false);

    const handleCloseELIMIN = () => setOpenELIMINAR(false);

    const handleClosePUT = () => setOpenPUT(false);

    const { user} = useAuth0();

    

    useEffect(() => { 
        idProducto();
        getProducts();
    }, [actualPRODUCT, datos ]);
    
    const handleInputChange= (event) => {
        
        setDatos({
            ...datos,
            [event.target.name]:event.target.value
        })
      
    }

    const handleInputChangEDIT= (event) => {
        
        setActualPRODUCT({
            ...actualPRODUCT,
            [event.target.name]:event.target.value
        })
      
    }

    const idProducto = async() =>{
        let data = await getProductID();
        
        setProdId(data)

        
        
    }

    const handleOpen = () => {
        setDatos({...datos,
            idproducto: prodId,
            idusuario: userActID})
        setOpen(true)
        
    };

    const handleOpenEDIT = (idP, Nomb, precio, st, img) => {
        let x = precio.replace('$', '').replace(',', '')
        x = x.slice(0, -3)
        

        setActualPRODUCT({...actualPRODUCT,
            idproducto: idP,
            nombre: Nomb,
            preciounidad: x,
            stock: st,
            imagen: img,
            idusuario: userActID})

        setOpenPUT(true)
        
    };

    function handleRemove(id){
        deletProduct(id);
    }

    const deletProduct = async(idDelProducto) =>{
        deleteProductbyId(idDelProducto)
        getProducts();
        setOpenELIMINAR(true)
    } 

    const getProducts = async() => {
        var x;
        await APIgetIdByEmail(user.email).then(result =>{
            x = result
            setUserActID(result)
        })
        await APIgetProductsbyID(x).then(result =>{
            if (result === undefined){
                setisEmpty(false)
            }else{
                setisEmpty(true)
            }
            setProducts(result)
            setLoading(false)
            
        })

        
    };
    
    const postingProduct = async(d) =>{
        setDatos({...datos,
            nombre: "",
            preciounidad: 0,
            stock: 0,
            imagen: ""
           })
        
        await postProduct(d)
    } 

    const handleSubmit= (event) => {
        
        if(datos.idproducto === 0 ||  datos.nombre === "" || datos.preciounidad === 0 || datos.stock === 0 || datos.idusuario === 0){
            alert("PORFAVOR RELLENA TODOS LOS CAMPOS")
            
        }else{
            let d = datos;
            setDatos({...datos,
                nombre: "",
                preciounidad: 0,
                stock: 0,
                imagen: ""
            })

            postingProduct(d);
            setOpen(false);
            getProducts();


            
        }
    } 

    const handleEdit = (event) =>{
        APIPutProduct(actualPRODUCT.idproducto, actualPRODUCT)
        getProducts();
        handleClosePUT()
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
                        <Fab variant="extended" color="primary" aria-label="add" onClick={handleOpen}>
                            <AddIcon  sx={{ mr: 1 }} />
                            Agregar
                        </Fab>
                        </Grid>
                    </Grid>
                    <div className="contain">
                        {
                            isEmpty && products.map((it) => (
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
                                        <Grid container spacing = {1}>
                                        <Grid item xs = {5}>
                                            <Button size ="medium" variant= "outlined" startIcon={<ModeEditIcon /> } onClick = {() => handleOpenEDIT(it.idproducto, it.nombre, it.preciounidad, it.stock, it.imagen)}></Button>
                                            
                                        </Grid>
                                        <Grid item xs = {5}>
                                            
                                            <Button  size ="medium" variant= "contained" color = "error" startIcon = {<DeleteIcon />} onClick = {()=>handleRemove(it.idproducto)}></Button>
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
                        name="idproducto"
                        label="Id del Producto"
                        value = {datos.idproducto}
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
                    <Button variant="contained" onClick= {handleSubmit}>AGREGAR</Button>
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
            

            <Modal
            open={openPUT}
            onClose={handleClosePUT}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx ={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                Modifar el producto {actualPRODUCT.nombre}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Cambia los datos que desees
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        disabled
                        name="idproducto"
                        label="Id del Producto"
                        value = {actualPRODUCT.idproducto}
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
                        value = {actualPRODUCT.nombre}
                        variant="filled"
                        sx = {{width: 300}}
                        onChange = {handleInputChangEDIT}
                        />
                        <TextField
                        required
                        name="preciounidad"
                        label="Precio Unidad"
                        type="number"
                        value = {actualPRODUCT.preciounidad}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        sx = {{width: 300}}
                        onChange = {handleInputChangEDIT}
                        />
                        <TextField
                        required
                        name="stock"
                        label="Stock"
                        type="number"
                        value = {actualPRODUCT.stock}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        sx = {{width: 300}}
                        onChange = {handleInputChangEDIT}
                        />
                        <TextField
                        required
                        name="imagen"
                        label="Imagen"
                        value = {actualPRODUCT.imagen}
                        variant="filled"
                        sx = {{width: 300}}
                        onChange = {handleInputChangEDIT}
                        />
                        <TextField
                        disabled
                        name="idusuario"
                        label="IdUser"
                        value = {actualPRODUCT.idusuario}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                        sx = {{width: 300}}
                        
                        />
                    <Button variant="contained" onClick= {handleEdit}>EDITAR</Button>
                </Stack>

                </Box>
            </Modal>
        
            </Box>
        
        );

};
export default InventarioCRUD;