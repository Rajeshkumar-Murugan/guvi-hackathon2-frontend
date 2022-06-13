import axios from 'axios';
import {React} from 'react';
import {useFormik} from 'formik'
import *as yup from 'yup'
import env from 'react-dotenv'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
function CreateTheater() {
    
  let history = useNavigate()

    const formik = useFormik({
        initialValues:{ 
          TheaterName:'',
          ScreenNames:'',
          TheaterLocation:'',                  
        },
        validationSchema: yup.object({
        TheaterName:yup.string().required('Theater Name is required'),
        ScreenNames:yup.string().required('Screen Name is required'),
        TheaterLocation:yup.string().required('Theater Location is required'),
       
        }),
        onSubmit:values=>{
          save(values, null, 2)

        }
      })

      let save = async(val)=>{
        try {
          let res =  await axios.post(env.API_URL+'addtheater',val)            
            toast.success(res.data.message) 

        } catch (error) {
          alert("error occured please contact the developer")
          console.log(error)
        } 
      }
      

  return (
    <div>
        <div className='container'>
      
      <form className="row g-3" onSubmit={formik.handleSubmit}>
        <h2>Add Theater</h2>

                <div className="col-md-3">
                    
                    <input id="TheaterName" name="TheaterName" type="text"
                                className="form-control" placeholder='Enter Theater Name'
                                onChange={formik.handleChange}
                                value={formik.values.TheaterName}/>
                        {formik.touched.TheaterName && formik.errors.TheaterName?(<div style={{color:"red"}}>{formik.errors.TheaterName}</div>):null}

                </div>
                <div className="col-md-3">
                        
                    <input id="ScreenNames" name="ScreenNames" type="text"
                                className="form-control" placeholder='Enter Screen Names'
                                onChange={formik.handleChange}
                                value={formik.values.ScreenNames}/>
                        {formik.touched.ScreenNames && formik.errors.ScreenNames?(<div style={{color:"red"}}>{formik.errors.ScreenNames}</div>):null}

                </div>
                <div className="col-md-3">
                        
                    <input id="TheaterLocation" name="TheaterLocation" type="textrea"
                                className="form-control" placeholder='Enter Theater Location'
                                onChange={formik.handleChange}
                                value={formik.values.TheaterLocation}/>
                        {formik.touched.TheaterLocation && formik.errors.TheaterLocation?(<div style={{color:"red"}}>{formik.errors.TheaterLocation}</div>):null}

                </div>
            
            <div className="col-3">
            <button type="submit" className="btn btn-primary">Add Theater</button>
        </div>
</form>
</div>
</div>
  )
}

export default CreateTheater