import {React,useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import env from 'react-dotenv'
import Header from './Header';
import Loading from './Loading';


function MoviesList() {

  let [details,setDetails] =useState([])
  let Navigate = useNavigate()
  const [isloading, setisloading] = useState(true)

  //Fetching the data from server starts
  useEffect(() => {
    getData()
    },[])
  
  
  //Fetching using Axios
  let getData = async()=>{
    try {
      let movies = await axios.get(env.API_URL+'movies/')
      {movies?setisloading(false):setisloading(true)}

    setDetails(movies.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
 

  return ( <>
    <Header/> 
    {isloading ? 
 <Loading/>
:
    <div className="container">
      <div className="row justify-content-around">
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
}
    </>
  )
}

export default MoviesList