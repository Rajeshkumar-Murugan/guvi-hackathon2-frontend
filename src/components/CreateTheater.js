import axios from 'axios';
import {useFormik} from 'formik'
import *as yup from 'yup'
import env from 'react-dotenv'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import Header from "./Header";
import {React,useState, useEffect} from 'react';
import Loading from './Loading';
import Addmovies from './Addmovies';


function CreateTheater() {
    
  let history = useNavigate()
  let [details,setDetails] =useState([])
  const [isloading, setisloading] = useState(true)

    const formik = useFormik({
        initialValues:{ 
          TheaterName:'',
          ScreenNames:'',
          TotalSeat:''
          
          ,                  
        },
        validationSchema: yup.object({
        TheaterName:yup.string().required('Theater Name is required'),
        ScreenNames:yup.string().required('Screen Name is required'),
        TotalSeat:yup.string().required('Seat count is required'),
       
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
      
      let handledelete = async(id)=>{
        try {
         let res = await axios.delete(env.API_URL+'deleteTheater/'+id)
          getData();
        } catch (error) {
          alert("Error occured while deleting the data please contact developer")
          console.log(error)
        }
      }
    
 //Fetching the data from server starts
 useEffect(() => {
  getData()
  },[])


//Fetching using Axios
let getData = async()=>{
  try {
    let thData = await axios.get(env.API_URL)
    {thData?setisloading(false):setisloading(true)}

  setDetails(thData.data.data)
  } catch (error) {
    console.log(error)
  }
}




  return (
    <div>
      <Header/>
       
<br/>
{isloading ? 
 <Loading/>
:
<div className='container-fluid'>
<div className='row'>  
<div className='col-md-6 '>
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
                        
                    <input id="TotalSeat" name="TotalSeat" type="Number"
                                className="form-control" placeholder='Enter Total Seats'
                                onChange={formik.handleChange}
                                value={formik.values.TotalSeat}/>
                        {formik.touched.TotalSeat && formik.errors.TotalSeat?(<div style={{color:"red"}}>{formik.errors.TotalSeat}</div>):null}

                </div>
            
            <div className="col-3">
            <button type="submit" className="btn btn-primary" style={{padding:"10px 20px"}}>Add Theater</button>
        </div>
</form>

</div>
<br/>
<div className='overflow-auto'>
<table className='table'>
<thead>
<tr>
  <th scope="col-1">#</th>
  <th scope="col-4">Theater Name</th>
  <th scope="col-4">Screen Name</th>
  <th scope="col-2">Seat</th>
  <th scope="col-1">Action</th>
</tr>
</thead>
{details.map((e,i)=>{
return <tbody>
<tr>
  <th scope="row">{i+1}</th>
  <td>{e.thName}</td>
  <td>{e.screen}</td>
  <td>{e.thSeat}</td>
  
  <td>
  <button type="button" className="btn btn-primary" style={{padding:"0px 20px"}}>Edit</button> &nbsp;
  <button type="button" className="btn btn-danger"  style={{padding:"0px 10px"}} onClick={()=>handledelete(e._id)}>Delete</button>
  </td>
</tr>

</tbody>
})}

</table>
</div>
</div>
<div className='col-md-6'>
<Addmovies/>
<br/>
<div className='overflow-auto'>
<table className='table'>
<thead>
<tr>
  <th scope="col-1">#</th>
  <th scope="col-4">Theater Name</th>
  <th scope="col-4">Screen Name</th>
  <th scope="col-2">Seat</th>
  <th scope="col-1">Action</th>
</tr>
</thead>
{details.map((e,i)=>{
return <tbody>
<tr>
  <th scope="row">{i+1}</th>
  <td>{e.thName}</td>
  <td>{e.screen}</td>
  <td>{e.thSeat}</td>
  
  <td>
  <button type="button" className="btn btn-primary" style={{padding:"0px 20px"}}>Edit</button> &nbsp;
  <button type="button" className="btn btn-danger"style={{padding:"0px 10px"}} onClick={()=>handledelete(e._id)}>Delete</button>
  </td>
</tr>

</tbody>
})}

</table>
</div>
</div>
</div>
</div>

}
</div>
  )
}

export default CreateTheater