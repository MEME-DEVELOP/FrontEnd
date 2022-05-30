import React from 'react';
import {APIgetUsuarios} from "../API/UsuariosAPI";

class UserSettings extends React.Component{

    state = {
        inventarios : []

    }
    componentDidMount() {
        let x = APIgetUsuarios();
        console.log("Este es un error " + x)
        this.setState({inventarios : x});
    }


    render(){

        return (
        <p> 
            Hola
        </p>
        );
    }
    
};

export default UserSettings;