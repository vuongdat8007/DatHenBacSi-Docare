import React, { useState } from "react";
import axios from "axios";
import { BASE_URL, token } from "../../config";

import HashLoader from "react-spinners/HashLoader.js";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const BookAppointmentSingle = ({ doctor }) => {
  const [appointmentData, setAppointmentData] = useState({
    doctor: doctor._id,
    date: "",
    ticketPrice: doctor.ticketPrice, // Assuming each doctor has a ticketPrice field
    timeSlot: "", // Added for time slot selection
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/bookings/create`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setError("Đặt hẹn thành công!");
      //alert("Appointment booked successfully!");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error(err);
      //alert("Error booking appointment");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {doctor.timeSlots &&
          doctor.timeSlots.map((timeSlot, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`timeSlot-${index}`}
                name="timeSlot"
                value={timeSlot}
                onChange={(e) =>
                  setAppointmentData({
                    ...appointmentData,
                    timeSlot: e.target.value,
                  })
                }
              />
              <label htmlFor={`timeSlot-${index}`}>{timeSlot}</label>
            </div>
          ))}
      </div>

      <button
        disabled={loading && true}
        type="submit"
        className="btn px-2 w-full rounded-md"
      >
        {loading ? <HashLoader size={25} color="#ffffff" /> : `Đặt lịch hẹn`}
      </button>
      {error && !loading && <Error errMessage={error} />}
    </form>
  );
};

export default BookAppointmentSingle;
