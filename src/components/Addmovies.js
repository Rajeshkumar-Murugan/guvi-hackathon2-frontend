import axios from 'axios';
import {React} from 'react';
import {useFormik} from 'formik'
import *as yup from 'yup'
import env from 'react-dotenv'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

function Addmovies() {
    
  let history = useNavigate()

    const formik = useFormik({
        initialValues:{ 
          moviename:'',
          movieimg:'',
          moviedes:'',                  
        },
        validationSchema: yup.object({
        
        moviename:yup.string().required('Movie Name is required'),
        movieimg:yup.string().required('Movie Poster is required'),
        moviedes:yup.string().required('Movie Description is required'),
       
        }),
        onSubmit:values=>{
          save(values, null, 2)

        }
      })

      let save = async(val)=>{
        try {
          let res =  await axios.post(env.API_URL+'addmovies',val)
            toast.success(res.data.message) 
            history('/MoviesList')          
        } catch (error) {
          alert("error occured please contact the developer")
          console.log(error)
        } 
      }
      

  return (
    <div>
        <div className='container'>
      
      <form className="row g-3" onSubmit={formik.handleSubmit}>
        <h2>Add Movies details</h2>

                <div className="col-md-3">
                    
                    <input id="moviename" name="moviename" type="text"
                                className="form-control" placeholder='Enter Movie Name'
                                onChange={formik.handleChange}
                                value={formik.values.moviename}/>
                        {formik.touched.moviename && formik.errors.moviename?(<div style={{color:"red"}}>{formik.errors.moviename}</div>):null}

                </div>
                <div className="col-md-3">
                        
                    <input id="movieimg" name="movieimg" type="text"
                                className="form-control" placeholder='Enter Movie Poster Link'
                                onChange={formik.handleChange}
                                value={formik.values.movieimg}/>
                        {formik.touched.movieimg && formik.errors.movieimg?(<div style={{color:"red"}}>{formik.errors.movieimg}</div>):null}

                </div>
                <div className="col-md-3">
                        
                    <input id="moviedes" name="moviedes" type="textrea"
                                className="form-control" placeholder='Enter Movie Description'
                                onChange={formik.handleChange}
                                value={formik.values.moviedes}/>
                        {formik.touched.moviedes && formik.errors.moviedes?(<div style={{color:"red"}}>{formik.errors.moviedes}</div>):null}

                </div>
            
            <div className="col-3">
            <button type="submit" className="btn btn-primary">Add Movies</button>
        </div>
</form>
</div>
</div>
  )
}

export default Addmovies