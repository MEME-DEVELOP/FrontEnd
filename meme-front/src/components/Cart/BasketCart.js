import React, { useState } from "react";
import { Button, Modal, Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import "./BasketCart.css";
import { APIPutProduct } from '../../API/ProductosAPI';
import { postFactura } from '../../API/FacturaAPI'
import { postRegistro } from '../../API/RegistroAPI';
import { getFacturaID } from '../../API/FacturaAPI';
import { getregistroID } from '../../API/RegistroAPI';

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '25px'
};

export default function BasketCart(props) {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false)
    navigate("/Home", { replace: true });
  };
  const handleOpen = () => {
    setOpen(true);
    
  }
  
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

  

  const hacerRegistro = async(canti, costotal, factura, produID) =>{
      var id = await getregistroID()
      console.log(id)
      await postRegistro({
        "idregister": id,
        "cantidad": canti,
        "constot": costotal,
        "facturad_idfactura": factura,
        "productod_idproducto": produID 

      })
  }

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


        


        try {

          
          let x = product.preciounidad.replace('$', '').replace(',', '')
          x = x.slice(0, -3)
          constot = product.qty * x

          hacerRegistro(product.qty,constot, idfact1, product.idproducto)

          handleOpen()
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
                  onClick={() => {
                      modifyStock(idfactura, totalPrice)
                  }}>
                  Hacer pedido!
                </Button>


              </div>
            </div>

          </>
        )}


      </div>

      <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title">
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" sx={{alignSelf:"center"}}>
                    Hemos registrado tu factura
                </Typography>
                </Box>
            </Modal>


      
    </div>

  )

}