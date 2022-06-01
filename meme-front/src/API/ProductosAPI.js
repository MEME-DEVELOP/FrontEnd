import axios from 'axios';

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


export const APIgetProductsbyID = async(ID) =>{
      let productos = [];
      await axios.get('http://localhost:8000/ProductoD/', {
          params: {
             idusuario: ID
          }
      }).then(result=>{
            
              if (result.data[0] === undefined) {
                 productos = undefined
              } else{
                 productos = result.data
              }
            
     }).catch(console.log);

     return productos;
 };

export const deleteProductbyId = async(id) =>{
    await axios.delete("http://localhost:8000/ProductoD/"+id).then(resolve=>{console.log("Producto Eliminado")})
}

// export const postUser = async(data) =>{
//     console.log(data)
//     await axios.post("http://localhost:8000/UsuarioD/", data)
//         .then(resolve =>{
            
//             console.log("USUARIO RESGISTRADO")
//         })
// }