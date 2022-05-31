import axios from 'axios';
import { APIgetIdByEmail } from './UsuariosAPI';

export const APIgetAllProducts = async () => {
    let productos = [];
    await axios.get('http://localhost:8000/ProductoD/').then(result=>{
            productos = result.data
           
    }).catch(console.log);
    
    return productos;
};

export const getProductID = async() => {
    let data = await APIgetAllProducts();
   
    return data.length + 1;

}


// export const APIgetProductsbyID = async(ID) =>{
//      let productos = [];
//      await axios.get('http://localhost:8000/UsuarioD/', {
//          params: {
//             idusuario: ID
//          }
//      }).then(result=>{
//              if (result.data[0] === undefined) {
//                 productos = 0
//              } else{
//                 productos = result.data
//              }
            
//      }).catch(console.log);

//      return productos;
//  };



// export const postUser = async(data) =>{
//     console.log(data)
//     await axios.post("http://localhost:8000/UsuarioD/", data)
//         .then(resolve =>{
            
//             console.log("USUARIO RESGISTRADO")
//         })
// }