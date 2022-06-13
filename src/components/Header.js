import React, { useState, useEffect } from "react";

import "./Header.css";
import Menu from "./Menu";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [logout, setLogout] = useState(false);
  const [isadmin, setIsadmin] = useState(false)

  let history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth")) history("/");
  }, [logout]);

  useEffect(() => {
    if(localStorage.getItem('admin') === "true"){
      setIsadmin(true)
    }
    },[])

  return (
    <div className="headers sticky-top">
      
        <div className="d-flex justify-content-between">
          <div>
            <img
              src="https://www.pinclipart.com/picdir/big/524-5246520_upcoming-events-clip-art.png"
              id="logo_png"
            />
          </div>
          <div className="d-flex">
            <div>
              <button
                type="button"
                class="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("auth");
                  localStorage.removeItem("email");
                  localStorage.removeItem("phone");
                  localStorage.removeItem("name");
                  localStorage.removeItem("admin");
                  localStorage.removeItem("id");
                  setLogout(true);
                }}
              >
                Logout
              </button>
            </div>
            {isadmin?
            <div><Menu></Menu></div>
            :
            ""  }
          </div>
        </div>
      
    </div>
  );
}

export default Header;
