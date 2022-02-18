import {React,useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import env from 'react-dotenv'
import {Link} from 'react-router-dom'

function MoviesList() {

  let [details,setDetails] =useState([])
  let Navigate = useNavigate()
  //Fetching the data from server starts
  useEffect(() => {
    getData()
    },[])
  
  
  //Fetching using Axios
  let getData = async()=>{
    try {
      let d = await axios.get(env.API_URL+'movies/')
    setDetails(d.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div >
      <div class="row">
       {
     
  details.map((e,i)=>{
   return<>
        
          <div class="card" style={{ width: '18rem' }}>
            <img src={e.movieimg} class="card-img-top" alt={e.moviename} style={{ height: '20rem' }}/>
            <div class="card-body">
              <h5 class="card-title">{e.thMovie}</h5>
              <p class="card-text">{e.moviedes}</p>   
              <Link to={"/Bookshow"}>    
              <button type="button" class="btn btn-primary" onClick={()=>{
              // Navigate('/Bookshow/'+e._id) 
             }}>Book Now</button>   
             </Link>           
                 
             </div> 
            </div>
                
   </>
  })



}
</div>
    </div>
  )
}

export default MoviesList