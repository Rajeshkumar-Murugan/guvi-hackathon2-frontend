import {React,useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import env from 'react-dotenv'
import Header from './Header';
import Loading from './Loading';

function Clientdetails() {

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
      let client = await axios.get(env.API_URL+"user")
      {client?setisloading(false):setisloading(true)}

      // console.log(d)
    setDetails(client.data.data)
    } catch (error) {
      // alert("Error occured while fetching the data please contact developer")
      console.log(error)
    }
    

  }



  return (
    <div>
      <Header/>
      {isloading ? 
 <Loading/>
:
      <div className='overflow-auto'>
      <table className="table ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody className='overflow-auto'>
   
{
  details.map((e,i)=>{
   return<>
    <tr>
      <th scope="row">{i+1}</th>
      <td>{e.name}</td>
      <td>{e.phone}</td>
      <td>{e.email}</td>
      
    </tr>
    </>
  })
}
    
    
  </tbody>
</table>
</div>
}
    </div>
  )
}

export default Clientdetails