import React from 'react'

export default function Product(props) {
    const {product, onAdd} = props;
  return (
    <center>
      <h2 className='whitetext'>Productos </h2>
    <aside className="row block2">
    <div class="row" className='center' >
      <div class="col-sm-4"><h3>{product.nombre}</h3></div>
      <div class="col-sm-4">${product.preciounidad}</div>
      <div>
        <button class="btn btn-primary" className ="Cus" onClick={() => onAdd(product)}>Añadir al carrito</button>
      </div>
    </div>
    </aside>
    </center>
  )
}
