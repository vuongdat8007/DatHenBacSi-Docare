import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";

import HashLoader from "react-spinners/HashLoader.js";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useFetchData from "../../hooks/useFetchData";

const BookAppointmentSingle = ({ doctor }) => {
  const doctorId = doctor._id;
  console.log(doctorId);

  const [appointmentData, setAppointmentData] = useState({
    doctor: doctorId,
    appointmentDate: "",
    ticketPrice: doctor.ticketPrice, // Assuming each doctor has a ticketPrice field
    timeSlot: "", // Added for time slot selection
  });

  /* const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); */
  const [selectedDate, setSelectedDate] = useState("");
  /* const [availability, setAvailability] = useState([]); */
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const {
    data: availability,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${doctorId}/availability`);

  /* useEffect(() => {
    axios
      .get(`${BASE_URL}/doctors/${doctorId}/availability`)
      .then((response) => {
        setAvailability(response.data.data);
      })
      .catch((error) => console.error(error));
  }, [doctorId]); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //setLoading(true);

      const appointmentData = { doctorId, timeSlot: selectedTimeSlot };

      const response = await axios
        .post(`${BASE_URL}/bookings/create`, appointmentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Handle success
          //setLoading(false);
          console.log(response.data);
          //setError("Đặt hẹn thành công!");
        })
        .catch((error) => {
          // Handle error
          //setLoading(false);
          //setError(err.message);
          console.error(err);
        });

      //alert("Appointment booked successfully!");
    } catch (err) {
      //setLoading(false);
      //setError(err.message);
      console.error(err);
      //alert("Error booking appointment");
    }
    //setLoading(false);
  };

  return (
    <>
      <div>
        {availability.map((a) => (
          <div key={a.day}>
            <h3>{a.day}</h3>
            <ul>
              {a.timeSlots.map((timeSlot) => (
                <li key={timeSlot}>
                  <button onClick={() => setSelectedTimeSlot(timeSlot)}>
                    {timeSlot}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button onClick={handleSubmit}>
          {loading ? <HashLoader size={25} color="#ffffff" /> : `Đặt lịch hẹn`}
        </button>
      </div>
      {error && !loading && <Error errMessage={error} />}
    </>
  );
};

export default BookAppointmentSingle;
