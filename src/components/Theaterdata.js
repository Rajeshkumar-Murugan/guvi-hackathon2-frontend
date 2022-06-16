import {React,useState, useEffect} from 'react';
import axios from 'axios';
import env from 'react-dotenv'
import Header from './Header';
import Loading from './Loading';
import {Link} from 'react-router-dom'
import AddTheaters from './AddTheaters';

function Theaterdata() {

    let [details,setDetails] =useState([])
    const [isloading, setisloading] = useState(true)

    useEffect(() => {
        getData()
        },[])

let getData = async()=>{
    try {
      let thData = await axios.get(env.API_URL)
      {thData?setisloading(false):setisloading(true)}

    setDetails(thData.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
    // Deleting the data using axios

    let handledelete = async(id)=>{
      try {
       let res = await axios.delete(env.API_URL+'deleteTheater/'+id)
        
        getData();
      } catch (error) {
        alert("Error occured while deleting the data please contact developer")
        console.log(error)
      }
    }
  
  return( <>
    <div>

      <Header/>
      {isloading ? 
 <Loading/>
:
<div>
<br/>
  
  <div className="container d-flex justify-content-between">
  <h3>Show Details</h3>
  <div>
  
    <button ype="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Theater</button>
    

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
        Add Theater details
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <AddTheaters/>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
  
      <br/>
      <div className='overflow-auto'>
    <table className='table'>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Movie Name</th>
      <th scope="col">Theater Name</th>
      <th scope="col">Screen Name</th>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Seat</th>
    </tr>
  </thead>
  {details.map((e,i)=>{
 return <tbody>
    <tr>
      <th scope="row">{i+1}</th>
      <td>{e.moviename}</td>
      <td>{e.thName}</td>
      <td>{e.screen}</td>
      <td>{e.thDate}</td>
      <td>{e.thTime}</td>
      <td>{e.thSeat}</td>
      
      <td>
      <button type="button" className="btn btn-primary">Edit</button>
      <button type="button" className="btn btn-danger" onClick={()=>handledelete(e._id)}>Delete</button>
      </td>
    </tr>
    
  </tbody>
 })}
 
</table>
</div>
</div>
}
    </div>
    
        </>)
  
}

export default Theaterdata