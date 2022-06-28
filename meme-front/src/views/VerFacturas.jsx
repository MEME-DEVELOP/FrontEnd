import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {APIgetIdByEmail} from "../API/UsuariosAPI";
import { APIgetFacturabyID } from "../API/FacturaAPI";
import { getRegbyFactID } from "../API/RegistroAPI";
import { APIgetEspecific } from "../API/ProductosAPI";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Loading from '../components/Loading';
import {Typography, Grid, Button, Modal, Stack } from "@mui/material";
import { blue } from "@mui/material/colors";
import DetailsIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useNavigate } from "react-router-dom";
import "./VerFacturas.css"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MyDocument from "../components/FactDetails/Document";
import { PDFDownloadLink} from '@react-pdf/renderer';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
    overflow: "hidden"

}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '25px'
  };

const VerFacturas =()=>{
    const [facturas, setFacturas] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [isEmpty, setisEmpty] = useState(true)
    const [isEmptyFact, setisEmptyFact] = useState(true)
    const [open, setOpen] = useState(false);
    const [actualFactura, setActualFactura] = useState({
        idFactura : 0,
        fecha: ""
    })

    const [registros, setRegistros] = useState([])

    const [nombRegProd, setNombRegProd] = useState([])

    const handleOpen = async(idFact, fechaFact) => {
        setActualFactura({
            idFactura : idFact,
            fecha: fechaFact
        })
        await getRegbyFactID(idFact).then(result =>{
            if (result === undefined){
                setisEmptyFact(false)
            }else{
                result.forEach(funcionNombres)
                setisEmptyFact(true)
            }
            
            setRegistros(result)
            
            
        })
      
        
    }
    
    const funcionNombres = (value, indice, arr) =>{

        APIgetEspecific(value.productod_idproducto).then(result =>{
                let x  = nombRegProd
                x.push(result.nombre)
                setNombRegProd(x)
                if (indice+1 === arr.length){
                    setOpen(true);
                }
        })
        
    }
    
    const handleClose = () => setOpen(false);
    
    let navigate = useNavigate();

    const { user} = useAuth0();

   
    useEffect(() => { //
        getFacturas();
       
    }, [isLoading]);

    


    const handlePedidos = (event) =>{
        event.preventDefault();
        navigate("/Pedidos", { replace: true });
    }

 


    const getFacturas = async() => {
        var x;
        await APIgetIdByEmail(user.email).then(result =>{
            x = result
            
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
                                            <Button variant="outlined" onClick={() => handleOpen(it.idfactura, it.fecha)}><DetailsIcon></DetailsIcon>Detalles</Button>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            ))}              
                    </div>
                </Item>
              </Grid>
            </Grid>


                        
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" sx={{color: blue[700],alignSelf:"center"}}>
                    TU FACTURA 
                </Typography>
                <Typography id="modal-modal-description" variant="h5" sx={{ mt: 2 }}>
                    Fecha : {actualFactura.fecha}
                </Typography>
                <div class = "row">
                        <div class = "col">
                            
                            <div class = "row">
                            <Typography variant="h7" sx={{ mt: 2 }}>
                                Precio sin IVA: 
                            </Typography>
                            </div>
                            <div clas = "row">
                            {2}
                            </div>
                        </div>
                        <div class = "col">
                        <div class = "row">
                            <Typography variant="h7" sx={{ mt: 2 }}>
                                Precio no IVA y No Envio: 
                            </Typography>
                            </div>
                            <div clas = "row">
                            {2}
                            </div>
                        
                        </div>
                        <div class = "col">
                        <div class = "row">
                            <Typography variant="h7" sx={{ mt: 2 }}>
                                Precio IVA y envio: 
                            </Typography>
                            </div>
                            <div clas = "row">
                            {2}
                            </div>
                        
                        </div>
                        <div class = "col">
                            <div class = "row">
                            <Typography variant="h7" sx={{ mt: 2 }}>
                                Precio Completo: 
                            </Typography>
                            </div>
                            <div clas = "row">
                            {2}
                            </div>
                        
                        </div>
                    </div>
                <Stack spacing={2}>
                    <div className="scrollProdu">
                    {
                    isEmptyFact && registros.map((it, indice) => {

                        return (
                            
                            <div key= {it.idregister} class= "row  mx-2 mb-4 shadow rounded-3 p-3 w-100">
                                <div class= "col">
                                    Nombre:
                                    {"    " + nombRegProd[indice]}
                                </div>
                                <div class= "col">
                                    Cantidad:
                                    {"   " + it.cantidad}
                                </div>
                                <div class= "col">
                                    Costo Total Producto:
                                    {"    " + it.constot}
                                </div>
                            </div>    
                        )}
                        )
                    }
                    </div>
                    
                    <PDFDownloadLink document={<MyDocument datos= {JSON.stringify({fecha: actualFactura.fecha,reg: registros, nombres: nombRegProd})} />} fileName={"factura"} style = {{width:"50%", alignSelf:"center",textDecoration: 'none', color: '#ff1428'}}>
                        <Button variant="outlined" color="error" >
                            <PictureAsPdfIcon/>{" - "}Imprimir
                        </Button>
                    </PDFDownloadLink>
                    

                </Stack>
                </Box>
            </Modal>
            </Box>

        
        
        );

};
export default VerFacturas;