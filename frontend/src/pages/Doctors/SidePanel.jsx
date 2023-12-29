import BookAppointmentSingle from "./../../components/Appointments/BookAppointmentSingle";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";

import HashLoader from "react-spinners/HashLoader.js";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useFetchData from "../../hooks/useFetchData";

const SidePanel = ({ doctor }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const doctorId = doctor._id;
  console.log(doctorId);
  const {
    data: availability,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${doctorId}/availability`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //setLoading(true);

      const appointmentData = {
        doctor: doctorId,
        ticketPrice: doctor.ticketPrice,
        rawAppointmentData: selectedTimeSlot,
      };

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
        .catch((err) => {
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
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Giá vé</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {typeof doctor.ticketPrice === "number"
            ? doctor.ticketPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"
            : "Chưa có giá vé"}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Chọn thời gian đặt hẹn:
        </p>
        {/* <BookAppointmentSingle doctor={doctor} /> */}
        <div>
          {availability.map((a) => (
            <div className="p-2 m-2 border border-solid" key={a.day}>
              <h3>{a.day}</h3>
              <ul className="list-none list-inside">
                {a.timeSlots.map((timeSlot) => (
                  <li
                    className="bg-slate-300 rounded-md mb-2 pl-2"
                    key={timeSlot}
                  >
                    <button
                      className={`w-full p-2 text-left ${
                        selectedTimeSlot === `${a.day} ${timeSlot}`
                          ? "bg-blue-500 text-white"
                          : "bg-slate-300"
                      }`} // Highlight if selected
                      onClick={() =>
                        setSelectedTimeSlot(`${a.day} ${timeSlot}`)
                      }
                    >
                      {timeSlot}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="selected-time-slot my-4">
            {selectedTimeSlot ? (
              <div>
                <h4>Giờ khám đã chọn:</h4>
                <p>
                  <strong>{selectedTimeSlot}</strong>
                </p>
              </div>
            ) : (
              <p>Vui lòng chọn giờ khám để đặt hẹn</p>
            )}
          </div>
          <button
            className="w-full bg-primaryColor text-[18px] font-bold text-white p-2 rounded-md"
            onClick={handleSubmit}
          >
            {loading ? (
              <HashLoader size={25} color="#ffffff" />
            ) : (
              `Đặt lịch hẹn`
            )}
          </button>
        </div>
        {error && !loading && <Error errMessage={error} />}
      </div>
    </div>
  );
};

export default SidePanel;
