import React from 'react'

import './Header.css';
import Menu from './Menu';


function Header() {
  return (
    <div className='headers'>
        <div className='container'>
            <div className='row '>
              <div className='col-sm-6'>
              <img src='https://www.pinclipart.com/picdir/big/524-5246520_upcoming-events-clip-art.png' id="logo_png"/>
              </div>
             
              <div className='col-sm-6'> 
                           
              <Menu></Menu>
              </div>
         
                        
              

   </div>   
        </div>
        
    </div>
  )
}

export default Header