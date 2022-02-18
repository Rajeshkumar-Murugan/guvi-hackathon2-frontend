import {React,useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function Clientdetails() {

  let [details,setDetails] =useState([])
  let Navigate = useNavigate()

  //Fetching the data from server starts
  useEffect(() => {
    getData()
    },[])
  
  
  //Fetching using Axios
  let getData = async()=>{
    try {
      let d = await axios.get("https://ticketbooking-server.herokuapp.com/user")
      // console.log(d)
    setDetails(d.data.data)
    } catch (error) {
      // alert("Error occured while fetching the data please contact developer")
      console.log(error)
    }
    

  }



  return (
    <div>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
   
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
  )
}

export default Clientdetails