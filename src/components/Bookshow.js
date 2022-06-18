import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../components/Bookshow.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Header from "./Header";
import './BookingShow.css'
import Loading from './Loading';


function Bookshow() {
  let params = useParams();
  let Navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState("");
  const [isloading, setisloading] = useState(true)

  const [Theater, setTheater] = useState([]);
  const [SelectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [show, setShow] = useState(false);

  const [movieName, setMovieName] = useState('')
  const [theaterName, setTheaterName] = useState('')
  const [theaterSeat, setTheaterSeat] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [details, setDetails] = useState([]);
  useEffect(() => {
    if (params.id) {
      getData();
    }
  }, []);

  useEffect(() => {
    gettheater();
  }, [movieTitle]);

  let getData = async () => {
    try {
      let res = await axios.get("https://ticketbooking-server.herokuapp.com/movies/" + params.id);
      let moviedetails = res.data;
      {moviedetails?setisloading(false):setisloading(true)}

      setDetails(moviedetails.data);
      setMovieTitle(res.data.data.moviename);
      
    } catch (error) {
      alert("Error occured while getting the data please contact developer");
      console.log(error);
    }
  };

  let gettheater = async () => {
    try {
      let res = await axios.get("https://ticketbooking-server.herokuapp.com/");
      let details = res.data.data;
      let TheaterAvailable = details

        .filter((el) => el.moviename == movieTitle)
        .map((e) => {
          return e;
        });
        console.log(TheaterAvailable)
     
      setTheater(TheaterAvailable);
     
    } catch (error) {
      alert("Error occured while getting the data please contact developer");
      console.log(error);
    }
  };

  let TheaterTimings = (element) => {
    let timings = [];
    let answ = element.split(",");
    answ.forEach(function (obj) {
      timings.push(obj);
    });
    return timings;
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year,month,day].join("-");
  }

  function IndainDateFormat(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day,month,year].join("/");
  }


  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  const d1 = new Date();
  const d2 = new Date();
  d2.setDate(d1.getDate() + 7);



  return (
    <div >
      <Header />
      {isloading ? 
 <Loading/>
:
      <div className="container">
        <div className="row">
          <div className="col">
            <div class="card mb-12">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={details.movieimg}
                    className="img-fluid rounded-start"
                    alt={details.moviename}
                    style={{ height: "340px" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{details.moviename}</h5>
                    <p className="card-text">{details.moviedes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row overflow-auto">
          <ButtonGroup aria-label="Basic example">
            {getDatesInRange(d1, d2).map((el) => {
              return (
                <>
                  <div>
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedDate(formatDate(el))}
                    >
                      {IndainDateFormat(el)}
                    </Button>
                    &nbsp;
                  </div>
                </>
              );
            })}
          </ButtonGroup>
        </div>
        <div className="row overflow-auto">
          {
          
          Theater.filter((el) => formatDate(el.thDate) >= SelectedDate).map(
            (el, i) => {
              return (
                <div className="row">
                  <div className="card-body">
                    <div className="col">
                      {el.thName} - {el.screen}
                      <br />
                      <br />
                      {TheaterTimings(el.thTime).map((e) => {
                        return (
                          <>
                            <button type="button" className="btn btn-success" onClick={()=>{
                                handleShow()
                            setTheaterSeat(el.thSeat)
                          }
                             } >
                              {e}
                            </button>
                            &nbsp;
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          )}
          <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
              <Modal.Title>{details.moviename}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <div  >

              
            {Array(theaterSeat)
            .fill(1)
            .map((el, i) =>{     

            return <>
            <input  type="checkbox" id="seat" name="seat" value={i} key={i}/> &nbsp;&nbsp;&nbsp;
            </>
            
          }  
              )}
             </div>
            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
}
    </div>
  );
}

export default Bookshow;
