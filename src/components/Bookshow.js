import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios';
import env from 'react-dotenv'
import '../components/Bookshow.css'

function Bookshow() {
    let params = useParams()
   
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
       

    } catch (error) {
        alert("Error occured while getting the data please contact developer")
          console.log(error)
      }
  
    }


    let gettheater = async(moviename)=>{
      document.getElementById('booking').innerHTML =''
        try {
            let res= await axios.get(env.API_URL)
            let details = res.data
            details.data.map((e)=>{
              if(e.moviename == moviename)
              {
                document.getElementById('booking').innerHTML += `
                <div className='container '>
                <div className='row'>
                  
                    <button type="button" class="btn btn-outline-success thdata">${e.thName}</button>
                    <button type="button" class="btn btn-outline-success thdata">${e.thTime}</button>


                    </div></div>
               `
              }
              
            })
                     
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
        <button type="button" class="btn btn-success" onClick={()=>gettheater(details.moviename)}>Book Now</button>
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