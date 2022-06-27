import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {APIgetIdByEmail} from "../API/UsuariosAPI";
import { APIgetFacturabyID, getFacturaID, } from "../API/FacturaAPI";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Loading from '../components/Loading';
import {Typography, Grid, Button, Modal } from "@mui/material";
import { blue } from "@mui/material/colors";

import DetailsIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { useNavigate } from "react-router-dom";
import "./VerFacturas.css"

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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '25px'
  };

const VerFacturas =()=>{
    const [facturas, setFacturas] = useState([])
    const [prodId, setProdId] = useState(0);
    const [userActID, setUserActID] = useState(0);
    const [isLoading, setLoading] = useState(true)
    const [isEmpty, setisEmpty] = useState(true)
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    let navigate = useNavigate();

    const { user} = useAuth0();

    useEffect(() => { //
        idFactura();
        getFacturas();
       
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

            console.log(result)
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
                                            <Button variant="outlined" onClick={handleOpen}><DetailsIcon></DetailsIcon>Detalles</Button>
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
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>

                <PDFDownloadLink document={<MyDocument datos= {JSON.stringify(facturas)}/>} fileName={"factura"}> 
                    <button> Download </button> 
                </PDFDownloadLink> 
                </Box>
            </Modal>
            </Box>

        
        
        );

};
export default VerFacturas;