
import {React} from 'react';
import {useFormik} from 'formik'
import *as yup from 'yup'
let movielist = []

function Addmovies() {
    

    const formik = useFormik({
        initialValues:{ 
          thMovie:'',
          thMovieposter:'',
          thMoviedesc:'',                  
        },
        validationSchema: yup.object({
        
        thMovie:yup.string().required('Movie Name is required'),
        thMovieposter:yup.string().required('Movie Poster is required'),
        thMoviedesc:yup.string().required('Movie Description is required'),
       
        }),
        onSubmit:values=>{
          movielist.push(JSON.stringify(values, null, 2))
          alert(movielist)
        }
      })



  return (
    <div>
        <div className='container'>
      
      <form className="row g-3" onSubmit={formik.handleSubmit}>
        <h2>Add Movies details</h2>

                <div className="col-md-3">
                    <label for="thMovie" className="form-label">Movie Name</label>
                    
                    <input id="thMovie" name="thMovie" type="text"
                                className="form-control" placeholder='Enter Movie Name'
                                onChange={formik.handleChange}
                                value={formik.values.thMovie}/>
                        {formik.touched.thMovie && formik.errors.thMovie?(<div style={{color:"red"}}>{formik.errors.thMovie}</div>):null}

                </div>
                <div className="col-md-3">
                    <label for="thMovieposter" className="form-label">Movie Poster</label>
                        
                    <input id="thMovieposter" name="thMovieposter" type="text"
                                className="form-control" placeholder='Enter Movie Poster Link'
                                onChange={formik.handleChange}
                                value={formik.values.thMovieposter}/>
                        {formik.touched.thMovieposter && formik.errors.thMovieposter?(<div style={{color:"red"}}>{formik.errors.thMovieposter}</div>):null}

                </div>
                <div className="col-md-3">
                    <label for="thMoviedesc" className="form-label">Movie Description</label>
                        
                    <input id="thMoviedesc" name="thMoviedesc" type="textrea"
                                className="form-control" placeholder='Enter Movie Description'
                                onChange={formik.handleChange}
                                value={formik.values.thMoviedesc}/>
                        {formik.touched.thMoviedesc && formik.errors.thMoviedesc?(<div style={{color:"red"}}>{formik.errors.thMoviedesc}</div>):null}

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