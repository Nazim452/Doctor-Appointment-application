import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice'
const BookingPage = () => {
  const { user } = useSelector(state => state.user);


  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const params = useParams();
  const dispatch = useDispatch();



  const getUserData = async () => {


    try {
      const res = await axios.post("/api/v1/doctor/getDoctorById"
        , { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  //taking data from the token of localStorage
          },
        });
      if (res.data.success) {
        setDoctors(res.data.data);
      }

    } catch (error) {
      console.log("Error in fetching Get All docotr list in HomePage.jsx", error);

    }

  };

  //______________________________________________________Booking Function

  const handleBooking = async (req, res) => {

    try {
      setIsAvailable(true);
      if(!date&&!time){
        return alert("Date and time are required")
      }
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/book-appointment',
        {
          // jo appoimtment docotr ke model me hai wo sba yahan pass karn hai sabko import karn  hai>>>>>>
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  //taking data from the token of localStorage
          },
        }
      )
      dispatch(hideLoading())
      if (res.data.success) {

        message.success(res.data.message)
      }

    } catch (error) {
      dispatch(hideLoading());
      console.log("Error in handleBooking in BoookingPage.jsx", error);

    }



  }


  // const handleAvailability = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const res = await axios.post('/api/v1/user/booking-availability',
  //     // jo jo - hame controller me dene ko bola hia wo sab yahan se ja rha  hai
  //       { doctorId: params.doctorId, date, time },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,  //taking data from the token of localStorage
  //         },
  //       }
  //     )
  //     dispatch(hideLoading())
  //     if(res.data.success){
  //       setIsAvailable(true);
  //       message.success(res.data.message)
  //     }
  //     else{
  //       message.error(res.data.message)
  //     }

  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log("Error in handleAvailability in BoookingPage.jsx", error);

  //   }
  // }
  // const handleAvailability = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const res = await axios.post(
  //       "/api/v1/user/booking-availability",
  //       { doctorId: params.doctorId, date, time },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (res.data.success) {
  //       setIsAvailable(true);
  //       console.log(isAvailable);
  //       message.success(res.data.message);
  //     } else {
  //       message.error(res.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    getUserData();

  }, [])










  return (
    <Layout>

      <h1>Booking Page</h1>

      <div className="container m-2">
        {
          doctors && (

            <div>
              <h3>Dr. {doctors.firstName} {doctors.lastName}</h3>
              <h4>Fees: {doctors.feesPerCunsaltation}</h4>
              <h4>
                Timings : {doctors.timings && doctors.timings[0]} -{" "}
                {doctors.timings && doctors.timings[1]}{" "}
              </h4>
              
               {/* <h4>Timings: {doctors.timings[0]}-{doctors.timings[1]}</h4> */}
              <div className="d-flex flex-column w-50">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                   
                    setDate(moment(value).format("DD-MM-YYYY"))
                  }}
                />
                <TimePicker format="HH:mm"
                  className='m-2'
                //   onChange={(value) => {


                //     setTime(moment(value).format("HH:mm"))
                //  }

                // }

                onChange={(values)=>
                setTime([
                  moment(values[0].format("HH:mm")),
                  moment(values[1].format("HH:mm"))
                ])}
                   />
                {/* <button className='btn btn-primary mt-2'onClick={handleAvailability}>Check Availability</button> */}
               { <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>}
              </div>

            </div>

          )
        }
      </div>


     

    </Layout>
  )
}

export default BookingPage