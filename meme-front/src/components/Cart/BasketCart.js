import React from 'react'


import "./BasketCart.css";
import { APIPutProduct } from '../../API/ProductosAPI';
import { postFactura } from '../../API/ProductosAPI';
import { postRegistro } from '../../API/ProductosAPI';

export default function BasketCart(props) {
  var idfactura = Math.floor(Math.random()*10000);
  const { cartItems, onAdd, onRemove, } = props;
  
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.preciounidad.slice(1).replace(/\D/g, ''), 0);

  const taxPrice = parseFloat(itemsPrice * 0.19);
  const shippingPrice = itemsPrice * 0.5;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  
  var idregister;
  var idfacturapropia;
  var idsolito;


function modifyStock(e){
  
  try{var iduser = cartItems[0].idusuario}
  catch(err)
  {console.log(err)}
    postFactura(
      {
        "idfactura":e,
        "fecha":"2022-06-26",
        "idcliente":"13513",
        "idusuario":iduser
      }
        
  )
  
  setTimeout(5000)
 
  
  const newCartItems = cartItems.map( (product)=>{ 
    
    if ((product.stock-product.qty)<0){alert("No hay suficiente cantidad de {producto.nombre}")}
  else{
   

    
    

    APIPutProduct(product.idproducto,{
    "idproducto": product.idproducto,
    "nombre": product.nombre,
    "preciounidad": product.preciounidad,
    "stock": product.stock-product.qty,
    "imagen": product.imagen,
    "idusuario": product.idusuario
    
  })

  
  idregister =Math.floor(Math.random() * product.idusuario*100)
console.log("El valor de idregister");
console.log(idregister);

  console.log("El valor de idfacturaes")
  console.log(idfactura)
  
  try{
    console.log("Entre")
    idfacturapropia=idfactura;
    
    postRegistro( {
      "idregister":idregister,
      "cantidad":product.qty,
      "constot":product.qty,
      "facturad_idfactura":idfacturapropia,
      "productod_idproducto":product.idproducto

    })}
      catch{
        console.log("errorrrrrrrr")
      }

console.log("Prueba")


} } )



//console.log("Verificar stock modificado")
//console.log(newCartItems)

}


return (
      <div class="container-fluid">
        <div class="row">
          
      
      <div className='whitetext' class="container" >
        
   
        {cartItems.length === 0 && <div>No ha adicionado ningún producto</div>}

        {cartItems.map((item) => (

          <div key={item.idproducto} className="card text-center m-3" >
            <div className="card-header" ><h3>{item.nombre}</h3></div>
            <div className="card-body">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="card-body">
              {item.qty} x ${Number(item.preciounidad.slice(1).replace(/\D/g, ''))}
              
            </div>                                                                                                                                                                                                                                  


          </div>
       
        ))}
        </div>
      
          
        
     

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
           
            <div className="card text-center m-3">
            <div className="card-header"><h1>Precios</h1></div> 
            <div class="card-body"  className="scrollear2">
            <div className="card text-center m-3"  >
           
              <div class="card-header" ><h4>Precio de productos</h4></div>
              <div class="card-body">
                
                ${Number(itemsPrice)}
                
              </div>

            </div>



            <div className="card text-center m-3" >
              <div className="card-header">Impuesto (IVA 19%)</div>
              <div className="card-body">${Number(taxPrice)}</div>

            </div>


            <div className="card text-center m-3" >
              <div className="card-header">Envío</div>
              <div className="card-body">
                ${Number(shippingPrice)}

              </div>



            </div>




            <div className="card text-center m-3" >
              <div className="card-header">
                <strong>Total</strong>
              </div>
              <div className="card-body">
                ${totalPrice}
              </div>
            </div>

        
            </div>

            <div >
              
  

                        
            <button class="btn btn-primary" className ="Cus" onClick={()=>modifyStock(idfactura)}>Hacer pedido!</button>
            
            
            





            </div>
            </div> 
            
          </>
        )}
        

        </div>
     
      
        </div>

  )

}