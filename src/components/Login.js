import {useNavigate} from 'react-router-dom'
import {React} from 'react';
import axios from 'axios';
import {useFormik} from 'formik'
import *as yup from 'yup'
// import env from 'react-dotenv'

function Login() {
 
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
        if(res)
        {
        document.getElementById("login-status").innerHTML = `<p>${res.data.message}</p>`       
        console.log("Client logged in successfully",res)
        }
        else{
          document.getElementById("login-status").innerHTML = `<p>${res.data.message}</p>`       
          console.log("Failed to login",res) 
        } 
    } catch (error) {
      alert("error occured please contact the developer")
      console.log(error)
    } 
  }

  const forgetpwd = async(values) => {
    
    var obj = JSON.stringify({ email: values});
    let object = JSON.parse(obj)

    // console.log(typeof(),obj)
    try {
      let res =  await axios.post('https://ticketbooking-server.herokuapp.com/users/forget-password',object)
        if(res)
        {
        document.getElementById("login-status").innerHTML = `<p>${res.data.message}</p>`       
        // console.log("Client logged in successfully",res)
        }
        else{
          document.getElementById("login-status").innerHTML = `<p>${res.data.message}</p>`       
          // console.log("Failed to login",res) 
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
        <div className="modal-body">
         <form onSubmit={formik.handleSubmit} name="loginform">
            <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Email ID:</label>
            <input id="email" name="email" type="email"
                  className="form-control" placeholder='Enter Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}/>
        {formik.touched.email && formik.errors.email?(<div style={{color:"red"}}>{formik.errors.email}</div>):null}

            </div>
            <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Password:</label>
            <input id="password" name="password" type="text"
                  className="form-control" placeholder='Enter password'
                  onChange={formik.handleChange}
                  value={formik.values.password}/>
        {formik.touched.password && formik.errors.password?(<div style={{color:"red"}}>{formik.errors.password}</div>):null}
            </div>
            <div id='login-status'></div>
            <div id='forgetpassword'>
                        
            </div>
            <a href='#'variant="contained" color="secondary" type='button' onClick={() => forgetpwd(document.loginform.email.value)} >Forget Password</a>
            <div className="modal-footer"> </div>

            <button type="sumbit" className="btn btn-primary">Login</button>
        </form>
        

           
           
        </div>
    </div>
       
   
  )
}

export default Login