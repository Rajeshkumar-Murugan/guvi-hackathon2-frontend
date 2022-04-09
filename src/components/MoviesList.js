import {React,useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import env from 'react-dotenv'
// import {Link} from 'react-router-dom'
// import Bookshow from './Bookshow';

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
    <div className='container'>
      <div class="row justify-content-around">
       {
     
  details.map((e,i)=>{
   return<>
        
          <div className="card " style={{ width: '15rem' }}>
            <img src={e.movieimg} className="card-img-top" alt={e.moviename} style={{ height: '18rem', borderRadius: '5px' }}/>
            <div className="card-body">
              <div className='row'>
              <h6 className="card-title">{e.moviename}</h6>
              </div>  
             <div className='row'> 
              <button type="button" className="btn btn-primary" 
              onClick={()=>{
                Navigate('/Bookshow/'+e._id) 
               }}>
                 Book Now</button>   
             
                 </div>  
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