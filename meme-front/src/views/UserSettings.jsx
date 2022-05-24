import React from 'react';
import {APIgetUsuarios} from "../API/UsuariosAPI";

class UserSettings extends React.Component{

    state = {
        inventarios : []

    }
    componentDidMount() {
        x = APIgetUsuarios();

        this.setState({inventarios : x});

    }


    render(){

        return (
        <p> 
            {JSON.stringify(this.state.inventarios)} 
        </p>
        );
    }
    
};

export default UserSettings;