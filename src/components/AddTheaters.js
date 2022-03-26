import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import env from 'react-dotenv'
import {React,useState, useEffect} from 'react';
import {useFormik} from 'formik'
import *as yup from 'yup'
import Addmovies from './Addmovies';


function AddTheaters() {
  let history = useNavigate()


  const formik = useFormik({
    initialValues:{ 
      moviename:'',
      thName:'',
      thDate:'',
      thTime:[],
      thSeat:'',
     
    },
    validationSchema: yup.object({
    moviename:yup.string().required('Movie Name is required'),
    thName:yup.string().required('Theater Name is required'),
    thDate:yup.string().required('Date is required'),
    thTime:yup.string().required('Time is required'),
    thSeat:yup.string().required('Seat availablity is required'),
    }),
    onSubmit:values=>{
      save(values, null, 2)
    }
  })

// Adding data using axios
let save = async(val)=>{
  try {
    let res =  await axios.post('https://ticketbooking-server.herokuapp.com/',val)
      console.log(res)
      history('/Theaterdata')
      
    
  } catch (error) {
    alert("error occured please contact the developer")
    console.log(error)
  } 
}

// Fetching moviename from server
let [details,setDetails] =useState([])
useEffect(() => {
  getData()
  },[])

let getData = async()=>{
  try {
    let d = await axios.get('https://ticketbooking-server.herokuapp.com/movies/')
  setDetails(d.data.data)
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className='container'>
      <h2>Add Theater details</h2>
      <form className="row g-3" onSubmit={formik.handleSubmit}>

    <div className="col-md-6">
    <label htmlFor="moviename" className="form-label" style={{ display: 'block' }}>
        Select Movie Name
      </label>
      <select
        name="moviename"
        id="moviename"
        className="form-control" placeholder='Enter movie Name'
        value={formik.values.moviename}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{ display: 'block' }}
      >
        <option value="" label="Select Movie Name" />
        {details.map((e,i)=>{
        return<>
        <option value={e.moviename} label={e.moviename} />
        </>
        })}
      </select>

       {formik.touched.moviename && formik.errors.moviename?(<div style={{color:"red"}}>{formik.errors.moviename}</div>):null}
  
  </div>


  <div className="col-md-6">
    <label htmlFor="thName" className="form-label">Theater Name</label>
    <input id="thName" name="thName" type="text"
                  className="form-control" placeholder='Enter Theater Name'
                  onChange={formik.handleChange}
                  value={formik.values.thName}/>
        {formik.touched.thName && formik.errors.thName?(<div style={{color:"red"}}>{formik.errors.thName}</div>):null}
  
  </div>

  <div className="col-md-4">
    <label htmlFor="thDate" className="form-label">Date</label>
        
    <input id="thDate" name="thDate" type="date"
                  className="form-control" placeholder='Enter Date'
                  onChange={formik.handleChange}
                  value={formik.values.thDate}/>
        {formik.touched.thDate && formik.errors.thDate?(<div style={{color:"red"}}>{formik.errors.thDate}</div>):null}

  
  </div>
  <div className="col">
    <label htmlFor="thTime" className="form-label">Timings</label>
           
    <input id="thTime" name="thTime" type="time" 
                  className="form-control" placeholder='Enter Timings'
                  onChange={formik.handleChange}
                  value={formik.values.thTime}/>
        {formik.touched.thTime && formik.errors.thTime?(<div style={{color:"red"}}>{formik.errors.thTime}</div>):null}

  </div>
  <div className="col">
    <label htmlFor="thSeat" className="form-label">Total seat</label>
           
    <input id="thSeat" name="thSeat" type="number"
                  className="form-control" placeholder='Enter Total seat'
                  onChange={formik.handleChange}
                  value={formik.values.thSeat} min="1" max="100"/>
        {formik.touched.thSeat && formik.errors.thSeat?(<div style={{color:"red"}}>{formik.errors.thSeat}</div>):null}

  </div>
   
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Add Theater</button>
  </div>
  
</form>
<Addmovies/>

    </div>
  )
}

export default AddTheaters