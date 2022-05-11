import axios from 'axios';

import React from 'react';


class APIgetInventario extends React.Component{

    state = {
        inventarios : []

    }
    componentDidMount() {
        axios.get('http://localhost:8000/inventario/?format=json').then(result=>{
            console.log(result.data);
            this.setState({inventarios : result.data});
        }).catch(console.log);
    }


    render(){

        return (<h1> Prueba </h1>);
    }
    
};

export default APIgetInventario;