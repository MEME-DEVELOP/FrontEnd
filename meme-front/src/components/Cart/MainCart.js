import React from 'react'
import Product from '../Product';

export default function MainCart(props){
    const {products,onAdd} = props;
    return(
      
      <div>
        {products.map((product) => (
          
            <div  ><Product key={product.idproducto} product={product} onAdd={onAdd}></Product>
            
            </div>
          
        ))}
      </div>
      
   
    )

}