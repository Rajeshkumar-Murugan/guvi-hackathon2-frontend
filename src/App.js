import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AddTheaters from './components/AddTheaters';
import MoviesList from './components/MoviesList';
import Clientdetails from './components/Clientdetails';
import Bookshow from './components/Bookshow';
import Theaterdata from './components/Theaterdata';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/Signup';
import Signin from './components/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (<>
    <Router>
     
     <Routes>
     <Route path='/add-theater/' element={<AddTheaters/>}></Route>
     <Route path='/Home' element={<MoviesList/>}></Route>
     <Route path='/Clientdetails/' element={<Clientdetails/>}></Route>
     <Route path='/MoviesList' element={<MoviesList/>}></Route>
     <Route path='/Bookshow/:id' element={<Bookshow/>}></Route>
     <Route path='/Theaterdata/' element={<Theaterdata/>}></Route>
     <Route path='/Booking/:thName/' element={<Bookshow/>}></Route>
     <Route path='/' element={<Signin/>}></Route>
     <Route path='/Sign-up' element={<SignUp/>}></Route>
     </Routes>
     
      </Router>
         <ToastContainer/>

         </>
    
  );
}

export default App;
