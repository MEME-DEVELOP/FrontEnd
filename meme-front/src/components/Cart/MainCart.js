import React from 'react'
import Product from '../Product';

export default function MainCart(props){
    const {products,onAdd} = props;
    return(

        <main className="row">
 <h2>Products</h2>
      <div className="row">
        {products.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}
      </div>
      </main>
    )

}