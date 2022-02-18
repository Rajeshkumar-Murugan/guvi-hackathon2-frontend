import './App.css';
import env from 'react-dotenv'
import Header from './components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AddTheaters from './components/AddTheaters';
import MoviesList from './components/MoviesList';
import Clientdetails from './components/Clientdetails';
import Bookshow from './components/Bookshow';



function App() {
console.log(env.API_URL)
  return (

    <Router>
     
     <Header></Header>
     
     <Routes>
     <Route path='/add-theater' element={<AddTheaters/>}></Route>
     <Route path='/' element={<MoviesList/>}></Route>
     <Route path='/Clientdetails' element={<Clientdetails/>}></Route>
     <Route path='/MoviesList' element={<MoviesList/>}></Route>
     {/* <Route path='/Bookshow' element={<Bookshow/>}></Route> */}
     <Route path='/Bookshow/:id' element={<Bookshow/>}></Route>
     </Routes>
      
     
      </Router>
    
     
     
    
  );
}

export default App;
