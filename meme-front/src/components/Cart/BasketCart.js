import React from 'react'
//import FactureRegister from '../Facture/FactureRegister';
import { PutRequestErrorHandling } from './PutRequest';

export default function BasketCart(props) {

  const { cartItems, onAdd, onRemove, } = props;

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.preciounidad.slice(1).replace(/\D/g, ''), 0);

  const taxPrice = parseFloat(itemsPrice * 0.19);
  const shippingPrice = itemsPrice * 0.5;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  
 

 
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
            <div className="card-body">
            <div className="card text-center m-3"  >
           
              <div className="card-header" ><h4>Precio de productos</h4></div>
              <div className="card-body">${Number(itemsPrice)}</div>

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

         


            <div >
            <button class="btn btn-primary" className ="Cus" >
                Hacer pedidos
              </button>
            </div>
            </div>
            </div> 
            
          </>
        )}
        

        </div>
     
      
        </div>

  )

}