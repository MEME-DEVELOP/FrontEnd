import React from 'react'
//import FactureRegister from '../Facture/FactureRegister';

export default function BasketCart(props) {

  const { cartItems, onAdd, onRemove, } = props;

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.preciounidad.slice(1).replace(/\D/g, ''), 0);

  const taxPrice = parseFloat(itemsPrice * 0.19);
  const shippingPrice = itemsPrice * 0.5;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  function handleClick(e) {
    e.preventDefault();
    alert('The link was clicked.');

 

  }
  return (

    <aside className="row block2 center">
      <h2 className='whitetext'>Productos </h2>
      <div className='whitetext' >
        {cartItems.length === 0 && <div>No ha adicionado ningún producto</div>}

        {cartItems.map((item) => (

          <div key={item.idproducto} className="row">
            <div className="col-2">{item.nombre}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x ${Number(item.preciounidad.slice(1).replace(/\D/g, ''))}

            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Precio de productos</div>
              <div className="col-1 text-right">${Number(itemsPrice)}</div>

            </div>
            <div className="row">
              <div className="col-2">Impuesto (IVA 19%)</div>
              <div className="col-1 text-right">${Number(taxPrice)}</div>

            </div>
            <div className="row">
              <div className="col-2">Envío</div>
              <div className="col-1 text-right">
                ${Number(shippingPrice)}

              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total</strong>
              </div>
              <div className="col-1 text-right">
                ${totalPrice}



              </div>
            </div>

            <hr />
            <div className="row">
              <button class="btn btn-info" onClick={handleClick}>
                Hacer pedidos
              </button>

            </div>

          </>
        )}
      </div>


    </aside>
  )

}