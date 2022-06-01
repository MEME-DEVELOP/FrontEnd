import React from 'react'


export default function HeaderCart(props){
 
        return(

 
            <header className ="row block2 center">
         <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          <h1>Carrito de compras MEME</h1>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        
      </div>
      <div>
        
          <h1>Elementos{' '}</h1>
          <br></br>
            
            
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ''
          )}
          <br></br>
            <br></br>
            <br></br>
        {' '}
        
      </div>
      
            </header>
        )
    
    

}