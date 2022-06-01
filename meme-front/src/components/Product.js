import React from 'react'

export default function Product(props) {
    const {product, onAdd} = props;
  return (
    <div>
      <img className="small" src={product.imagen} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <div>${product.preciounidad}</div>
      <div>
        <button onClick={() => onAdd(product)}>Add To Cart</button>
      </div>
    </div>
  )
}
