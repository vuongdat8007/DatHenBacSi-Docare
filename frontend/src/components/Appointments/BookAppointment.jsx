import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctor: "",
    date: "",
    ticketPrice: "", // Include if needed
  });

  useEffect(() => {
    // Replace 'your-backend-url' with your actual backend URL
    axios
      .get(`${BASE_URL}/doctors`)
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace 'your-backend-url' with your actual backend URL
      const response = await axios.post(
        `${BASE_URL}/bookings/create`,
        appointmentData
      );
      console.log(response.data);
      // alert("Appointment booked successfully!");
    } catch (error) {
      console.error(error);
      // alert("Error booking appointment");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={appointmentData.doctor}
        onChange={(e) =>
          setAppointmentData({ ...appointmentData, doctor: e.target.value })
        }
      >
        <option value="">Select a Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor._id}>
            {doctor.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={appointmentData.date}
        onChange={(e) =>
          setAppointmentData({ ...appointmentData, date: e.target.value })
        }
      />
      {/* Include ticketPrice input if needed */}
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default BookAppointment;
