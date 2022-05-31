import React from 'react';
import {APIgetUserEmail} from "../API/UsuariosAPI";

class UserSettings extends React.Component{

    state = {
        user : []

    }

    getUserInfo = async() =>{
        let data = await APIgetUserEmail("gamo@gmail.com");
        this.setState({user : data});
    }

    componentDidMount() {
        this.getUserInfo()
    }


    render(){

        return (
        <p> 
            {JSON.stringify(this.state.user)}
        </p>
        );
    }
    
};

export default UserSettings;