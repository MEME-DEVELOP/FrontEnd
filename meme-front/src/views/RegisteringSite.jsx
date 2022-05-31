import React,  { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Link from '@mui/material/Link';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {getUserID} from "../API/UsuariosAPI";
import { useAuth0 } from "@auth0/auth0-react";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',

}));

const RegisteringSite = () => {
    const { user} = useAuth0();

    const [userId, setUserId] = useState(0);
    const [datos, setDatos] = useState({
        id: userId,
        nombreUser: user.name,
        documento: 0,
        nombreEmpresa: "",
        correo: user.email,
        logo: ""
    });

    const idUser = async() =>{
        let data = await getUserID();
        setUserId(data);
        
    }

    useEffect(() => {
        idUser();
    }, []);

    const handleInputChange= (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }
    const handleSubmit= (event) => {
        if(datos.documento === "" ||  datos.nombreEmpresa === "" || datos.id === 0){
            setDatos({...datos,
                id: userId})
            alert("PORFAVOR RELLENA TODOS LOS CAMPOS")
        }else{
            alert(JSON.stringify(datos))
        }
    } 


        return(
            <div class = "p-5">
                <Item elevation = {24} sx = {{alignSelf:"center"}} >

                    <h1>Bienvenido a MEME</h1>
                    <h3>Debido a que es tu primera vez en la applicacion te solicitaremos algunos datos</h3>
                    <Grid container spacing= {3} justifyContent="center" alignItems = "center"  sx = {{paddingTop:4}}>
                        <Grid item>
                        <Stack spacing= {3} justifyContent="center" alignItems = "center"  sx = {{p:4 }}>

                            <TextField
                            disabled
                            name="id"
                            label="ID"
                            value= {userId}
                            variant="filled"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx = {{width: 500}}
                            onChange = {handleInputChange}
                            />

                            <TextField
                            disabled
                            name="nombreUser"
                            label="Nombre de Usuario"
                            value={user.name}
                            variant="filled"
                            sx = {{width: 500}}
                            onChange = {handleInputChange}
                            />

                            <TextField
                            required
                            name="documento"
                            label="Documento"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            sx = {{width: 500}}
                            onChange = {handleInputChange}
                            />

                            <TextField
                            required
                            name="nombreEmpresa"
                            label="Nombre Empresa"
                            variant="filled"
                            sx = {{width: 500}}
                            onChange = {handleInputChange}
                            />

                            <TextField
                            disabled
                            name="correo"
                            label="Correo"
                            value={user.email}
                            variant="filled"
                            sx = {{width: 500}}
                            onChange = {handleInputChange}
                            />

                            <TextField
                            name="logo"
                            label="Imagen de Empresa"
                            helperText="Aqui deja el link a la imagen que quieres que usemos para tu empresa"
                            variant="filled"
                            sx = {{width: 500}}
                            onChange = {handleInputChange}
                            />

                        </Stack>
                    </Grid>
                    <Divider orientation="vertical" flexItem > <DoubleArrowIcon /></Divider>
                    <Grid item>
                        <Stack spacing = {4}>
                        <h6>Para traer imagenes para tu logo te <br></br>recomendamos el siguiente recurso</h6>
                        <Button variant="text" startIcon = {<AddPhotoAlternateIcon/>}><Link href="https://picsum.photos" underline="none" target = "_blank ">Ingresa Aqui</Link></Button>
                        <Button variant="contained" onClick={handleSubmit}>REGISTRARSE <br></br>EN MEME</Button>
                        </Stack>
                    </Grid>
                    </Grid>
                </Item>
            </div>
        );
};
export default RegisteringSite;