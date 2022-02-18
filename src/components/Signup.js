import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {React} from 'react';
import {useFormik} from 'formik'
import *as yup from 'yup'
import env from 'react-dotenv'


function Signup() {
  let history = useNavigate()


  const formik = useFormik({
    initialValues:{ 
      name:'',
      email:'',
      phone:'',
      password:''
    },
    validationSchema: yup.object({
    name:yup.string().required('Name is required'),
    email:yup.string().email('Invalid email address').required('Email is required'),
    phone:yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/gm, "Invalid Number").required('Mobile Number is required'),
    password:yup.string().required('Password is required')
    }),
    onSubmit:values=>{
      save(values, null, 2)
    }
  })

// Adding data using axios
let save = async(val)=>{
  try {
    let res =  await axios.post(env.API_URL+'users/register',val)
      console.log(res)
      history('/Clientdetails')
      document.getElementById("act-add").innerHTML = `<h2>${res.data.message}</h2>`
    
  } catch (error) {
    alert("error occured please contact the developer")
    console.log(error)
  } 
}


  return (
    
    <div>      
        <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Signup page</h5>
        {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
        </div>
        <div className="modal-body" id="act-add">
         <form  onSubmit={formik.handleSubmit}>
         <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Name:</label>
            <input id="name" name="name" type="text"
                  className="form-control" placeholder='Enter Name'
                  onChange={formik.handleChange}
                  value={formik.values.name}/>
        {formik.touched.name && formik.errors.name?(<div style={{color:"red"}}>{formik.errors.name}</div>):null}
            </div>

            <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Email ID:</label>
            <input id="email" name="email" type="email"
                  className="form-control" placeholder='Enter Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}/>
        {formik.touched.email && formik.errors.email?(<div style={{color:"red"}}>{formik.errors.email}</div>):null}
            </div>

            <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Phone Number</label>
            <input id="phone" name="phone" type="mobile"
                  className="form-control" placeholder='Enter phone'
                  onChange={formik.handleChange}
                  value={formik.values.phone}/>            
        {formik.touched.phone && formik.errors.phone?(<div style={{color:"red"}}>{formik.errors.phone}</div>):null}
            </div>

            <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Password:</label>
            <input id="password" name="password" type="text"
                  className="form-control" placeholder='Enter password'
                  onChange={formik.handleChange}
                  value={formik.values.password}/>
        {formik.touched.password && formik.errors.password?(<div style={{color:"red"}}>{formik.errors.password}</div>):null}
            </div>
            <div className="modal-footer">
            <button type='submit' className="btn btn-primary" >Sign Up</button>
            
        </div>
        </form>
         </div>
        
    </div>
       
    
  )
}

export default Signup