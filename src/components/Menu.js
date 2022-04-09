import React from 'react'
import './Menus.css'
import Signin from './Signin';
import {Link} from 'react-router-dom'
import {myContext} from './context'


function Menu() {
  return (
    <div>
  <div className='align'>
  <div> 
  



    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signup" data-bs-whatever="@mdo">Signin</button>              
     <Signin></Signin>
  </div> 
    <div>
     <nav className="navbar-dark">           
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end menu" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menus</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <Link to="/">
              <li className="nav-item">
                <a className="nav-link active text-black" aria-current="page" href="#">Movies List</a>
              </li>
              </Link>
              <Link to="/add-theater">
              <li className="nav-item">
                <a className="nav-link text-black" href="#">Add Theater</a>
              </li>
              </Link>
              <Link to="/Clientdetails">
              <li className="nav-item">
                <a className="nav-link text-black" href="#">Client details</a>
              </li>
              </Link>
              <Link to="/Theaterdata">
              <li className="nav-item">
                <a className="nav-link text-black" href="#">Theater details</a>
              </li>
              </Link>
              
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  </div>


    </div>
  )
}

export default Menu