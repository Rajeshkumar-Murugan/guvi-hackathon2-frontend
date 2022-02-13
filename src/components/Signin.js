import React from 'react'
import Login from './Login'
import Signup from './Signup'

function Signin() {

  return (
    <div>
  <div class="modal fade" id="signup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
       <div className='continer'>
         <div className='row'>
           <div className='col'>           
           <Login/>
           </div>
           <div className='col'>
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

