import React from 'react'


export default function HeaderCart(props){
 
        return(

 
            <header className ="row block2 center">
         <div>
   
          
          <h3 className='whitetext'>Elementos{' '}</h3>
                     
            
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