import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {APIPutUser, APIgetUserEmail} from "../API/UsuariosAPI";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LeftNavBar from "../components/LeftNavBar";
import { styled } from '@mui/material/styles';
import Loading from '../components/Loading';
import Typography from '@mui/material/Typography';
import { blue } from "@mui/material/colors";
import TextField from '@mui/material/TextField';
import { Button} from "@mui/material";
import Modal from '@mui/material/Modal';

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
    height: '100%'
}));


const UserSettings =()=>{

    const [open, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [userData, setUserData] = useState({
        idusuario: 0,
        nombreusuario: "",
        documento: 0,
        nombreempresa: "",
        correo: "",
        logo: ""
    })
    const { user} = useAuth0();
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getIdUser();
    }, [open]);

    const getIdUser = () => {
        APIgetUserEmail(user.email).then(result =>{
            let x = result[0]
            setUserData({
                idusuario: x.idusuario,
                nombreusuario: x.nombreusuario,
                documento: x.documento,
                nombreempresa: x.nombreempresa,
                correo: x.correo,
                logo: x.logo
            })
            
            setLoading(false)
        });
    };
 
    const handleInputChange= (event) => {
        
        setUserData({
            ...userData,
            [event.target.name]:event.target.value
        })
      
    }

    const handleSubmit = (event) => {
        APIPutUser(userData.idusuario, userData)
        setOpen(true)
        window.location.reload(false);
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
                    <Typography variant="h2"  gutterBottom sx={{color: blue[700],alignSelf:"center", marginBottom: "50px"}} >
                        Ajustes de Usuario
                    </Typography>
                    
                    <Grid container spacing={5} sx ={{paddingLeft:"20%"}}>
                        <Grid item xs={2}>
                            <Typography variant="h5"  gutterBottom sx={{color: '#5376b0',alignSelf:"center"}} >
                            Nombre
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                            disabled
                            name="nombreusuario"
                            label="Tu Nombre"
                            value = {userData.nombreusuario}
                            variant="filled"
                            sx = {{width: 300}}/>
                            
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h5"  gutterBottom sx={{color: '#5376b0',alignSelf:"center"}} >
                            Documento
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                            onChange = {handleInputChange}
                            name="documento"
                            label="Tu ID"
                            value = {userData.documento}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            sx = {{width: 300}}/>
                            
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h5"  gutterBottom sx={{color: '#5376b0',alignSelf:"center"}} >
                            Nombre de Empresa
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                            onChange = {handleInputChange}
                            name="nombreempresa"
                            label="Tu Empresa"
                            value = {userData.nombreempresa}
                            variant="filled"
                            sx = {{width: 300}}/>
                            
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h5"  gutterBottom sx={{color: '#5376b0',alignSelf:"center"}} >
                            Correo
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                            disabled
                            name="correo"
                            label="Tu Correo"
                            value = {userData.correo}
                            
                            variant="filled"
                            sx = {{width: 300}}/>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h5"  gutterBottom sx={{color: '#5376b0',alignSelf:"center"}} >
                            Logo
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                            name="logo"
                            label="Tu Logo"
                            value = {userData.logo}
                            variant="filled"
                            sx = {{width: 300}}
                            onChange = {handleInputChange}/>
                        </Grid>
                        <Grid item xs={9}>
                        <Button variant="contained" onClick={handleSubmit}>EDITAR</Button>
                        </Grid>
                    </Grid>
                </Item>
              </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title">
                <Box sx ={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h3">
                        Tus datos han sido modificados
                </Typography>
                </Box>
            </Modal>
        </Box>
        );

};
export default UserSettings;