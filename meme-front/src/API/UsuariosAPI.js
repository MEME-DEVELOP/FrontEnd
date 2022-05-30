import axios from 'axios';



export const APIgetUsuarios = async () => {
    let users = [];
    await axios.get('http://localhost:8000/UsuarioD/').then(result=>{
            console.log(result.data);
            users = result.data
           
    }).catch(console.log);
    
    return users;
};

function APIgetUserEmail(){
    let users = [];
    axios.get('http://localhost:8000/UsuarioD').then(result=>{
            console.log(result.data);
            users = result.data
    }).catch(console.log);

    return users;
};

export {APIgetUserEmail};