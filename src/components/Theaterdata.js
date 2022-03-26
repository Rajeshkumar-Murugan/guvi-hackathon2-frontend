import {React,useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import env from 'react-dotenv'

function Theaterdata() {

    let [details,setDetails] =useState([])

    useEffect(() => {
        getData()
        },[])

let getData = async()=>{
    try {
      let d = await axios.get('https://ticketbooking-server.herokuapp.com/')
    setDetails(d.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  
  return( <>
    <div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Movie Name</th>
      <th scope="col">Theater Name</th>
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
      <td>{e.thDate}</td>
      <td>{e.thTime}</td>
      <td>{e.thSeat}</td>
      <td>
      <button type="button" className="btn btn-primary">Edit</button>
      <button type="button" className="btn btn-danger">Delete</button>
      </td>
    </tr>
    
  </tbody>
 })}
 
</table>
    </div>
        </>)
  
}

export default Theaterdata