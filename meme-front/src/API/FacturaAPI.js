import axios from 'axios';

export const APIgetAllFactura= async () => {
    let factura = [];
    await axios.get('http://localhost:8000/FacturaD/').then(result=>{
            factura = result.data
           
    }).catch(console.log);
    
    return factura;
};

export const getFacturaID = async() => {
    let data = await APIgetAllFactura();
    const fil = data.sort((a,b) => a.idfactura-b.idfactura)
    
    return fil[fil.length -1].idfactura + 1;

}


export const APIgetFacturabyID = async(ID) =>{
      let factura = [];
      await axios.get('http://localhost:8000/FacturaD/', {
          params: {
            idusuario: ID
          }
      }).then(result=>{
            
              if (result.data[0] === undefined) {
                 factura = undefined
              } else{
                 factura = result.data
              }
            
     }).catch(console.log);

     return factura;
 };


export const deleteFacturabyId = async(id) =>{
    await axios.delete("http://localhost:8000/FacturaD/"+id).then(resolve=>{console.log("Factura Eliminado")})
}
 export const postFactura= async(data) =>{
    await axios.post("http://localhost:8000/FacturaD/", data)
        .then(resolve =>{
            
            console.log("Factura registrada")
       })
 }