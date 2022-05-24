import axios from 'axios';



function APIgetUsuarios(){
    users = [];
    axios.get('http://localhost:8000/UsuarioD/?format=json').then(result=>{
            console.log(result.data);
            users = result.data
    }).catch(console.log);

    return users;
};

export {APIgetUsuarios};