import React from 'react'
import Product from '../Product';

export default function MainCart(props){
    const {products,onAdd} = props;
    return(
      

   
          

      <div className="row center" >
        {products.map((product) => (
          <Product key={product.idproducto} product={product} onAdd={onAdd}></Product>
        ))}
      </div>
      
   
    )

}