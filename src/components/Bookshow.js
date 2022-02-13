
import {React, useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom'

function Bookshow() {
  let params = useParams()

  useEffect(() => {
        
    if(params.id){
      getData();
    }
}, [])


let getData = async()=>{
  try {
      // let res= await axios.get('https://ticketbooking-server.herokuapp.com/'+params.id)  
      // let Editvalues = res.data
      console.log(params);


  } catch (error) {
    alert("Error occured while getting the data please contact developer")
      console.log(error)
  }

}

  return (
    <div>Bookshow</div>
  )
}

export default Bookshow