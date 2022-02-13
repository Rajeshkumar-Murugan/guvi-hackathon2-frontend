import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import env from 'react-dotenv'
import {React} from 'react';
import {useFormik} from 'formik'
import *as yup from 'yup'


function AddTheaters() {
  let history = useNavigate()


  const formik = useFormik({
    initialValues:{ 
      thName:'',
      thMovie:'',
      thMovieposter:'',
      thMoviedesc:'',
      thDate:'',
      thTime:'',
      thSeat:'',
     
    },
    validationSchema: yup.object({
    
    thName:yup.string().required('Theater Name is required'),
    thMovie:yup.string().required('Movie Name is required'),
    thMovieposter:yup.string().required('Movie Poster is required'),
    thMoviedesc:yup.string().required('Movie Description is required'),
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
    let res =  await axios.post(env.API_URL,val)
      console.log(res)
      history('/MoviesList')
      
    
  } catch (error) {
    alert("error occured please contact the developer")
    console.log(error)
  } 
}


  return (
    <div className='container'>
      <h2>Add Theater details</h2>
      <form className="row g-3" onSubmit={formik.handleSubmit}>
  <div className="col-md-6">
    <label for="thName" className="form-label">Theater Name</label>
    <input id="thName" name="thName" type="text"
                  className="form-control" placeholder='Enter Theater Name'
                  onChange={formik.handleChange}
                  value={formik.values.thName}/>
        {formik.touched.thName && formik.errors.thName?(<div style={{color:"red"}}>{formik.errors.thName}</div>):null}
  
  </div>
  <div className="col-md-4">
    <label for="thDate" className="form-label">Date</label>
        
    <input id="thDate" name="thDate" type="date"
                  className="form-control" placeholder='Enter Date'
                  onChange={formik.handleChange}
                  value={formik.values.thDate}/>
        {formik.touched.thDate && formik.errors.thDate?(<div style={{color:"red"}}>{formik.errors.thDate}</div>):null}

  
  </div>
  <div className="col-md-4">
    <label for="thTime" className="form-label">Timings</label>
           
    <input id="thTime" name="thTime" type="time"
                  className="form-control" placeholder='Enter Timings'
                  onChange={formik.handleChange}
                  value={formik.values.thTime}/>
        {formik.touched.thTime && formik.errors.thTime?(<div style={{color:"red"}}>{formik.errors.thTime}</div>):null}

  </div>
  <div className="col-md-4">
    <label for="thSeat" className="form-label">Total seat</label>
           
    <input id="thSeat" name="thSeat" type="number"
                  className="form-control" placeholder='Enter Total seat'
                  onChange={formik.handleChange}
                  value={formik.values.thSeat} min="1" max="100"/>
        {formik.touched.thSeat && formik.errors.thSeat?(<div style={{color:"red"}}>{formik.errors.thSeat}</div>):null}

  </div>

  <h2>Add Movies details</h2>
  <div className="col-md-6">
    <label for="thMovie" className="form-label">Movie Name</label>
    
    <input id="thMovie" name="thMovie" type="text"
                  className="form-control" placeholder='Enter Movie Name'
                  onChange={formik.handleChange}
                  value={formik.values.thMovie}/>
        {formik.touched.thMovie && formik.errors.thMovie?(<div style={{color:"red"}}>{formik.errors.thMovie}</div>):null}

  </div>
  <div className="col-md-6">
    <label for="thMovieposter" className="form-label">Movie Poster</label>
        
    <input id="thMovieposter" name="thMovieposter" type="text"
                  className="form-control" placeholder='Enter Movie Poster Link'
                  onChange={formik.handleChange}
                  value={formik.values.thMovieposter}/>
        {formik.touched.thMovieposter && formik.errors.thMovieposter?(<div style={{color:"red"}}>{formik.errors.thMovieposter}</div>):null}

  </div>
  <div className="col-md-6">
    <label for="thMoviedesc" className="form-label">Movie Description</label>
        
    <input id="thMoviedesc" name="thMoviedesc" type="textrea"
                  className="form-control" placeholder='Enter Movie Description'
                  onChange={formik.handleChange}
                  value={formik.values.thMoviedesc}/>
        {formik.touched.thMoviedesc && formik.errors.thMoviedesc?(<div style={{color:"red"}}>{formik.errors.thMoviedesc}</div>):null}

  </div>
  
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Add Theater</button>
  </div>
</form>


    </div>
  )
}

export default AddTheaters