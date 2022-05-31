import React from "react";
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',

}));
class RegisteringSite extends React.Component {

    

    
    render(){
        return(
            <div class = "p-5">
                <Item elevation = {24} sx = {{alignSelf:"center"}} >

                    <h1>Bienvenido a MEME</h1>
                    <h3>Debido a que es tu primera vez en la applicacion te solicitaremos algunos datos</h3>
                    <Grid container spacing= {3} justifyContent="center" alignItems = "center"  sx = {{paddingTop:4}}>
                        <Grid item>
                        <Stack spacing= {3} justifyContent="center" alignItems = "center"  sx = {{p:4 }}>

                            <TextField
                            required
                            id="outlined-required"
                            label="ID"
                            defaultValue="Hello World"
                            variant="filled"
                            sx = {{width: 500}}
                            />
                            <TextField
                            disabled
                            id="outlined-disabled"
                            label="Nombre de Usuario"
                            defaultValue="Hello World"
                            variant="filled"
                            sx = {{width: 500}}
                            />

                            <TextField
                            id="outlined-number"
                            label="Documento"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            sx = {{width: 500}}
                            />

                            <TextField
                            id="outlined-read-only-input"
                            label="Nombre Empresa"
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            sx = {{width: 500}}
                            />

                            <TextField
                            id="outlined-read-only-input"
                            label="Correo"
                            defaultValue="Hello World"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                            sx = {{width: 500}}
                            />

                            <TextField
                            id="filled-helperText"
                            label="Imagen de Empresa"
                            defaultValue="Default Value"
                            helperText="Aqui deja el link a la imagen que quieres que usemos para tu empresa"
                            variant="filled"
                            sx = {{width: 500}}
                            />

                        </Stack>
                    </Grid>
                    <Divider orientation="vertical" flexItem > <DoubleArrowIcon /></Divider>
                    <Grid item>
                        <Stack spacing = {4}>
                        <h6>Para traer imagenes para tu logo te <br></br>recomendamos el siguiente recurso</h6>
                        <Button variant="text" startIcon = {<AddPhotoAlternateIcon/>}><Link href="https://picsum.photos" underline="none" target = "_blank ">Ingresa Aqui</Link></Button>
                        <Button variant="contained">REGISTRARSE <br></br>EN MEME</Button>
                        </Stack>
                    </Grid>
                    </Grid>
                </Item>
            </div>
        );
    }
    
};
export default RegisteringSite;