import React from 'react'

export default function Product(props) {
    const {product, onAdd} = props;
  return (
    <center>
      
    
    <div class="row" className='center' >
    <div className="card text-center m-3">
    <h1 className="card-header"><h3>{product.nombre}</h3></h1>
    
      <div className="card-body">
        <h4>{product.preciounidad}</h4>
      <div>
        <button class="btn btn-primary" className ="Cus" onClick={() => onAdd(product)}>Añadir al carrito</button>
      </div>
      </div>

   

    </div>

    </div>
    
    </center>
  )
}
