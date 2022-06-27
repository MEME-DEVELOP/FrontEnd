import React from 'react'
import { Button } from '@mui/material';

import "./BasketCart.css";
import { APIPutProduct } from '../../API/ProductosAPI';
import { postFactura } from '../../API/FacturaAPI'
import { postRegistro } from '../../API/RegistroAPI';
import { getFacturaID } from '../../API/FacturaAPI';
import { getregistroID } from '../../API/RegistroAPI';
import { idFacturaa } from '../../API/FacturaAPI';

let date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let fechaCompleta;
if (month < 10) {
  fechaCompleta = year + "-" + "0" + month + "-" + day
  console.log(fechaCompleta)

} else {
  fechaCompleta = year + "-" + month + "-" + day
  console.log(fechaCompleta)
}

export default function BasketCart(props) {
  //var idfactura = Math.floor(Math.random()*10000);
  var constot;
  var idfact1;

  let idfactura = getFacturaID().then(function (result) {
    idfact1 = result;

  });

  //var idfactura = 923;
  const { cartItems, onAdd, onRemove, } = props;
  

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * (c.preciounidad.replace('$', '').replace(',', '')).slice(0, -3), 0);

  const taxPrice = parseFloat(itemsPrice * 0.19);
  const shippingPrice = itemsPrice * 0.5;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  var idregister;


  async function modifyStock(idfacturaFinal, precioFinal) {

    try { var iduser = cartItems[0].idusuario }
    catch (err) { console.log(err) }

    await postFactura(
      {
        "idfactura": idfact1,
        "fecha": fechaCompleta,
        "idcliente": "13513",
        "idusuario": iduser
      }

    )




    const newCartItems = cartItems.map((product) => {

      if ((product.stock - product.qty) < 0) { alert("No hay suficiente cantidad de {producto.nombre}") }
      else {





        APIPutProduct(product.idproducto, {
          "idproducto": product.idproducto,
          "nombre": product.nombre,
          "preciounidad": product.preciounidad,
          "stock": product.stock - product.qty,
          "imagen": product.imagen,
          "idusuario": product.idusuario

        })


        idregister = Math.floor(Math.random() * product.idusuario * 100)


        try {


          let x = product.preciounidad.replace('$', '').replace(',', '')
          x = x.slice(0, -3)
          constot = product.qty * x
          postRegistro({
            "idregister": idregister,
            "cantidad": product.qty,
            "constot": constot,
            "facturad_idfactura": idfact1,
            "productod_idproducto": product.idproducto

          })
        }
        catch {
          console.log("errorrrrrrrr")
        }

        console.log("Prueba")


      }
    })

  }


  return (
    <div class="container-fluid">
      <div class="row">


        <div class='whitetext' className='scroll1' >


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
                {item.qty} x ${Number((item.preciounidad.replace('$', '').replace(',', '')).slice(0, -3))}

              </div>


            </div>

          ))}
        </div>





        {cartItems.length !== 0 && (
          <>
            <hr></hr>

            <div className="card text-center m-3">
              <div className="card-header"><h1>Precios</h1></div>
              <div class="card-body" className="scrollear2">
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

                <Button  variant="contained" sx= {{width: '50%', margin:'1%'}}
                  onClick={() => modifyStock(idfactura, totalPrice)}>
                  Hacer pedido!
                </Button>


              </div>
            </div>

          </>
        )}


      </div>


    </div>

  )

}