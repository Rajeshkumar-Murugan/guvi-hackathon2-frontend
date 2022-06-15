import axios from "axios";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { React, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Addmovies from "./Addmovies";
import Header from "./Header";
import CreateTheater from "./CreateTheater";
import { toast } from 'react-toastify';

function AddTheaters() {
  let history = useNavigate();

  const formik = useFormik({
    initialValues: {
      moviename: "",
      thName: "",
      screen: "",
      thDate: "",
      thTime: "",
      thSeat: "",
    },
    validationSchema: yup.object({
      moviename: yup.string().required("Movie Name is required"),
      thName: yup.string().required("Theater Name is required"),
      screen: yup.string().required("Screen Name is required"),
      thDate: yup.string().required("Date is required"),
      thTime: yup.string().required("Time is required"),
      thSeat: yup.string().required("Seat availablity is required"),
    }),
    onSubmit: (values) => {
      save(values, null, 2);
    },
  });

  // Adding data using axios
  let save = async (val) => {
    try {
      let res = await axios.post(env.API_URL, val);
      toast.success(res.data.message) 
      history("/Theaterdata");
    } catch (error) {
      alert("error occured please contact the developer");
      console.log(error);
    }
  };

  // Fetching moviename from server
  let [details, setDetails] = useState([]);
  useEffect(() => {
    getData();
    getTheaterData();
  }, []);

  useEffect(() => {
    screenvalues();
  }, [formik.values.thName]);

  let getData = async () => {
    try {
      let d = await axios.get(env.API_URL + "movies/");
      setDetails(d.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let [TheaterData, setTheaterData] = useState([]);

  let getTheaterData = async () => {
    try {
      let d = await axios.get(env.API_URL + "GetTheater/");

      setTheaterData(d.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  let screenvalues = () => {
    let Screens = TheaterData.filter(
      (el) => el.TheaterName == formik.values.thName
    ).map((e, i) => {
      return e.ScreenNames;
    });
  };

  let x = [];
  let uniqueArray =()=> {

    TheaterData.map((e, i) => {
      x.push(e.TheaterName);
      return x;
    })
      .map((e) => {
        return [...new Set(e)];
      })
      .map((e) => {
        x = e;
        return x;
      })

  }

 
  return (
    <>
      <Header />
      <div className="container overflow-auto">
        <h2>Add Theater details</h2>
        <form className="row g-3" onSubmit={formik.handleSubmit}>
          <div className="col-md-6">
            <label
              htmlFor="moviename"
              className="form-label"
              style={{ display: "block" }}
            >
              Select Movie Name
            </label>
            <select
              name="moviename"
              id="moviename"
              className="form-control"
              placeholder="Enter movie Name"
              value={formik.values.moviename}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ display: "block" }}
            >
              <option value="" label="Select Movie Name" />
              {details.map((e, i) => {
                return (
                  <>
                    <option value={e.moviename} label={e.moviename} />
                  </>
                );
              })}
            </select>

            {formik.touched.moviename && formik.errors.moviename ? (
              <div style={{ color: "red" }}>{formik.errors.moviename}</div>
            ) : null}
          </div>

          <div className="col-md-3">
            <label htmlFor="thName" className="form-label">
              Theater Name
            </label>
            <select
              name="thName"
              id="thName"
              className="form-control"
              placeholder="Enter Theater Name"
              value={formik.values.thName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ display: "block" }}
            >
              <option value="" label="Select Theater Name" />
              
              {uniqueArray()}

              {
              
              x.map((e, i) => {
                return (
                  <>
                    <option value={e} label={e} />
                  </>
                );
              })}
            </select>
            {formik.touched.thName && formik.errors.thName ? (
              <div style={{ color: "red" }}>{formik.errors.thName}</div>
            ) : null}
          </div>

          <div className="col-md-3">
            <label htmlFor="screen" className="form-label">
              Screen Name
            </label>
            <select
              name="screen"
              id="screen"
              className="form-control"
              placeholder="Enter Screen Name"
              value={formik.values.screen}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ display: "block" }}
            >
              <option value="" label="Select Theater Name" />
              {TheaterData.filter(
                (el) => el.TheaterName == formik.values.thName
              ).map((e, i) => {
                return (
                  <>
                    <option value={e.ScreenNames} label={e.ScreenNames} />
                  </>
                );
              })}
            </select>
            {formik.touched.screen && formik.errors.screen ? (
              <div style={{ color: "red" }}>{formik.errors.screen}</div>
            ) : null}
          </div>

          <div className="col-md-4">
            <label htmlFor="thDate" className="form-label">
              Date
            </label>

            <input
              id="thDate"
              name="thDate"
              type="date"
              className="form-control"
              placeholder="Enter Date"
              onChange={formik.handleChange}
              value={formik.values.thDate}
            />
            {formik.touched.thDate && formik.errors.thDate ? (
              <div style={{ color: "red" }}>{formik.errors.thDate}</div>
            ) : null}
          </div>
          <div className="col">
            <label htmlFor="thTime" className="form-label">
              Timings
            </label>

            <input
              id="thTime"
              name="thTime"
              type="text"
              className="form-control"
              placeholder="Example: HH:MM AM, HH:MM PM"
              onChange={formik.handleChange}
              value={formik.values.thTime}
            />
            {formik.touched.thTime && formik.errors.thTime ? (
              <div style={{ color: "red" }}>{formik.errors.thTime}</div>
            ) : null}
          </div>
          <div className="col">
            <label htmlFor="thSeat" className="form-label">
              Total seat
            </label>

            <input
              id="thSeat"
              name="thSeat"
              type="number"
              className="form-control"
              placeholder="Enter Total seat"
              onChange={formik.handleChange}
              value={formik.values.thSeat}
              min="1"
              max="100"
            />
            {formik.touched.thSeat && formik.errors.thSeat ? (
              <div style={{ color: "red" }}>{formik.errors.thSeat}</div>
            ) : null}
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Add Theater
            </button>
          </div>
        </form>
        <div className="row">
          <Addmovies />
          <br />
        </div>
        <div className="row">
          <CreateTheater />
        </div>
      </div>
    </>
  );
}

export default AddTheaters;
