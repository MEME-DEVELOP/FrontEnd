import axios from 'axios';

export const APIgetUsuarios = async () => {
    let users = [];
    await axios.get('http://localhost:8000/UsuarioD/').then(result=>{
            users = result.data
           
    }).catch(console.log);
    
    return users;
};

export const APIgetUserEmail = async(email) =>{
    let users = [];
    await axios.get('http://localhost:8000/UsuarioD/', {
        params: {
            correo: email
        }
    }).then(result=>{
            if (result.data[0] === undefined) {
                users = 0
            } else{
                users = result.data
            }
            
    }).catch(console.log);

    return users;
};


export const APIgetIdByEmail = async(email) =>{
    let idUser;
    await axios.get('http://localhost:8000/UsuarioD/', {
        params: {
            correo: email
        }
    }).then(result=>{
            idUser = result.data[0].idusuario
            
    }).catch(console.log);

    return idUser;
};

export const getUserID = async() => {
    let data = await APIgetUsuarios();
    return data[data.length -1].idusuario + 1;

}

export const postUser = async(data) =>{
    console.log(data)
    await axios.post("http://localhost:8000/UsuarioD/", data)
        .then(resolve =>{
            
            console.log("USUARIO RESGISTRADO")
        })
}

export const APIPutUser = async(id, data) => {
    await axios.put("http://localhost:8000/UsuarioD/"+id+"/", data).then(resolve=>{
        console.log("Usuario EDITADO")
    })

}