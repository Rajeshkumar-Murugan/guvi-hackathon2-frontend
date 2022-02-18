import React from 'react'
import Login from './Login'
import Signup from './Signup'

function Signin() {

  return (
    <div>
  <div class="modal fade" id="signup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
      <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>

       <div className='continer'>
         <div className='row'>
           
           <div className='col-sm-6'> 
          
           <Login/>
           </div>
           <div className='col-sm-6'>
           <Signup/>           
           </div>
         </div>
       </div>

       </div>
                </div>
              </div>
                   
    </div>
  )
}

export default Signin

