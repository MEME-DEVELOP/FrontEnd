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
    const fil = data.sort((a,b) => a.idproducto-b.idproducto)
    
    return fil[fil.length -1].idproducto + 1;
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

export const postProduct = async(data) =>{
     console.log(data)
     await axios.post("http://localhost:8000/ProductoD/", data)
         .then(resolve =>{
            
             console.log("Producto REGISTRADO")
         })
}
/////////////////////////////////////////////////////////////////////////////////////////////
export const postFactura  = async(data,callback) =>{
    //console.log(data)
    const myPromise= axios.post("http://127.0.0.1:8000/FacturaD/", data)
        .then(resolve =>{
           
            console.log("Factura registrada")

        })
     
        
}
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
export const postRegistro = async(data) =>{
    console.log(data)
    try{
    await axios.post("http://127.0.0.1:8000/RegistroD/", data)
        .then(resolve =>{
           
            console.log("Registro guardado")
            
        })
    }
    catch(e)
    {console.log("Perra")}
}
/////////////////////////////////////////////////////////////////////////////////////////////

export const APIPutProduct = async(id, data) => {
    await axios.put("http://127.0.0.1:8000/ProductoD/"+id+"/", data).then(resolve=>{
        console.log("Producto EDITADO")
        //alert("Stock Modificado")
        
        
    })

}