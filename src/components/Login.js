import {useNavigate} from 'react-router-dom'
import {React} from 'react';
import axios from 'axios';
import {useFormik} from 'formik'
import *as yup from 'yup'

function Login() {
  let history = useNavigate()
 
  const formik = useFormik({
    initialValues:{ 
      email:'',
      password:''
    },
    validationSchema: yup.object({
    email:yup.string().email('Invalid email address').required('Email is required'),
    password:yup.string().required('Password is required')
    }),
    onSubmit:values=>{
      loggedin(values, null, 2)
    }
  })

  
 
  let loggedin = async(val)=>{
    try {
      let res =  await axios.post('https://ticketbooking-server.herokuapp.com/users/login',val)
        if(res.data.message === "login successfully")
        {
        document.getElementById("login-side").innerHTML = `<h2>${res.data.message}</h2>`       
        console.log("Client logged in successfully",res)
        history('/Clientdetails')
        }
        else{
          document.getElementById("login-status").innerHTML = res.data.message       
          console.log("Client logged Not successfully",res) 
        } 
    } catch (error) {
      alert("error occured please contact the developer")
      console.log(error)
    } 
  }




  return (
    
    <div>
      <img src='https://image.apktoy.com/img/2c/com.bt.bms/icon.png' alt='logo'/>
        <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Signin page</h5>
       
        </div>
        <div className="modal-body" id="login-side">
         <form onSubmit={formik.handleSubmit}>
            <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Email ID:</label>
            <input id="email" name="email" type="email"
                  className="form-control" placeholder='Enter Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}/>
        {formik.touched.email && formik.errors.email?(<div style={{color:"red"}}>{formik.errors.email}</div>):null}

            </div>
            <div class="mb-3">
            <label for="message-text" class="col-form-label">Password:</label>
            <input id="password" name="password" type="text"
                  className="form-control" placeholder='Enter password'
                  onChange={formik.handleChange}
                  value={formik.values.password}/>
        {formik.touched.password && formik.errors.password?(<div style={{color:"red"}}>{formik.errors.password}</div>):null}
            </div>
            <div id='login-status'></div>
            <div className="modal-footer"> </div>
            <button type="sumbit" className="btn btn-primary">Login</button>
        </form>
      
           
           
        </div>
    </div>
       
   
  )
}

export default Login