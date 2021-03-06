import axios from 'axios';

export const APIgetAllRegistro= async () => {
    let registro = [];
    await axios.get('http://localhost:8000/RegistroD/').then(result=>{
            registro = result.data
           
    }).catch(console.log);
    
    return registro;
};

export const getregistroID = async() => {
    let data = await APIgetAllRegistro();
   
    const fil = data.sort((a,b) => a.idregister -b.idregister)
    
    return fil[fil.length -1].idregister + 1;
}


export const APIgetregistrobyID = async(ID) =>{
      let registro = [];
      await axios.get('http://localhost:8000/RegistroD/', {
          params: {
             idregister: ID
          }
      }).then(result=>{
            
              if (result.data[0] === undefined) {
                 registro = undefined
              } else{
                 registro = result.data
              }
            
     }).catch(console.log);

     return registro;
 };

 export const getRegbyFactID = async(ID) =>{
    let registro = [];
    await axios.get('http://localhost:8000/RegistroD/', {
        params: {
            facturad_idfactura: ID
        }
    }).then(result=>{
          
            if (result.data[0] === undefined) {
               registro = undefined
            } else{
               registro = result.data
            }
          
   }).catch(console.log);

   return registro;
};


 export const postRegistro= async(data) =>{
     console.log(data)
    await axios.post("http://localhost:8000/RegistroD/", data)
        .then(resolve =>{
            
            console.log("Registro registrada")
       })
 }