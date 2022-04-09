import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import env from 'react-dotenv'
import '../components/Bookshow.css'
import Booking from './Booking';
import {useNavigate} from 'react-router-dom'


function Bookshow() {
    let params = useParams() 
    let Navigate = useNavigate()

    let [details,setDetails] =useState([])
    useEffect(() => {
        if(params.id){
          getData();
        }
},[])



let getData = async()=>{
    try {
        let res= await axios.get(env.API_URL+'movies/'+params.id)
        console.log(res.data.data)
        let moviedetails = res.data
        setDetails(moviedetails.data)

        gettheater(res.data.data.moviename)
        
    } catch (error) {
        alert("Error occured while getting the data please contact developer")
          console.log(error)
      }
  
    }


let gettheater = async(moviename)=>{      
  document.getElementById('booking').innerHTML =''
    try {
        let res= await axios.get(env.API_URL+'theater/'+moviename)
        let details = res.data
        details.data.map((e)=>
        document.getElementById('booking').innerHTML +=`
        <button type="button" class="btn btn-success" onClick=${()=>{
          Navigate('/Bookshow/'+e._id) 
         }} onclick="movietheater(${e.moviename}, ${e.thName})">${e.thName}</button>
        `
        )

        console.log(details)
        } catch (error) {
        alert("Error occured while getting the data please contact developer")
          console.log(error)
      }
  
    }

let movietheater = async(moviename,thName)=>{
  try {
    let res= await axios.get(env.API_URL+'theater/'+moviename+'/'+thName)
    let details = res.data
    details.data.map((e)=>
    document.getElementById('booking').innerHTML +=`
    <button type="button" class="btn btn-success" onclick="">${e.Name}</button>
    `
    )

    console.log(details)
    } catch (error) {
    alert("Error occured while getting the data please contact developer")
      console.log(error)
  }
}
  

return<>

<div className='container'>
    <div className='row'>
        <div className ='col'>
        <div class="card mb-12" >
  <div className="row g-0">
    <div className="col-md-4">
      <img src={details.movieimg} className="img-fluid rounded-start" alt={details.moviename} style={{height: '340px'}}/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{details.moviename}</h5>
        <p className="card-text">{details.moviedes}</p>
        {/* <button type="button" class="btn btn-success" onClick={gettheater(details.moviename)}>Book Now</button> */}
      </div>
    </div>
  </div>
</div>      
        </div>

    </div>
    <div id="booking">
        
    </div>
</div>
 
 

</> 
}

export default Bookshow