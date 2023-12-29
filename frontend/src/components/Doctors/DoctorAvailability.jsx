import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";

const DoctorAvailability = ({ doctorId }) => {
  const [availability, setAvailability] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [newTimeSlot, setNewTimeSlot] = useState("");

  const defaultAvailability = [
    { day: "Monday", timeSlots: [] },
    { day: "Tuesday", timeSlots: [] },
    { day: "Wednesday", timeSlots: [] },
    { day: "Thursday", timeSlots: [] },
    { day: "Friday", timeSlots: [] },
    { day: "Saturday", timeSlots: [] },
    { day: "Sunday", timeSlots: [] },
    // ... repeat for each day of the week
  ];

  useEffect(() => {
    // Fetch existing availability
    axios
      .get(`${BASE_URL}/doctors/${doctorId}/availability`)
      .then((response) => {
        // Check if the doctor already has some availability set
        const fetchedAvailability = response.data.data;
        if (fetchedAvailability && fetchedAvailability.length > 0) {
          setAvailability(fetchedAvailability);
        } else {
          // If not, initialize with default availability for each day
          setAvailability(defaultAvailability);
        }
      })
      .catch((error) => console.error(error));
  }, [doctorId]);

  const handleSubmit = () => {
    axios
      .put(`${BASE_URL}/doctors/${doctorId}/availability`, { availability })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  // Add UI logic for updating `availability` state
  // ...
  const addTimeSlotNew = () => {
    console.log("Adding time slot:", newTimeSlot);
    const updatedAvailability = availability.map((a) => {
      if (a.day === selectedDay) {
        return { ...a, timeSlots: [...a.timeSlots, newTimeSlot] };
      }
      return a;
    });
    setAvailability(updatedAvailability);
    console.log("Current availability:", availability);
    console.log("Selected day:", selectedDay);
    console.log("New time slot:", newTimeSlot);
    setNewTimeSlot(""); // Reset new time slot input
  };

  const removeTimeSlot = (timeSlot) => {
    const updatedAvailability = availability.map((a) => {
      if (a.day === selectedDay) {
        return { ...a, timeSlots: a.timeSlots.filter((t) => t !== timeSlot) };
      }
      return a;
    });
    setAvailability(updatedAvailability);
  };

  return (
    <div className="border rounded-md border-opacity-80 px-2 py-2 mb-2">
      <select
        className="w-3/12 px-4 py-3 border rounded-lg border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] text-bold text-primaryColor leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      <input
        className="w-7/12 px-4 mb-3 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[14px] text-bold text-primaryColor leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
        type="text"
        value={newTimeSlot}
        onChange={(e) => setNewTimeSlot(e.target.value)}
        placeholder="Thêm khoảng thời gian (ví dụ: 09:00-10:00)"
      />
      <button
        className="w-2/12 justify-between text-center bg-green-300 text-headingColor text-[16px] leading-3 rounded-lg px-2 py-2"
        onClick={addTimeSlotNew}
      >
        Thêm
      </button>

      <div className="text-center justify-between grid ">
        {/* Display each day with its time slots */}
        {availability.map((a) => (
          <div className="border rounded-md border-opacity-80" key={a.day}>
            {a.timeSlots.length > 0 && (
              <ul className="p-2 grid grid-cols-2 gap-4">
                {a.timeSlots.map((timeSlot) => (
                  <li
                    className="border-b mb-2 border-primaryColor border-solid"
                    key={timeSlot}
                  >
                    <h3 className="text-[18px] text-semibold text-headingColor">
                      {a.day}
                    </h3>

                    <span className="">{timeSlot}</span>

                    <button
                      className=" bg-red-500 mb-2 text-[16px] text-white rounded-md px-2 py-2 mx-2"
                      onClick={() => removeTimeSlot(a.day, timeSlot)}
                    >
                      Xoá
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <button
        className="bg-green-300 text-headingColor text-[16px] leading-3 rounded-lg px-2 py-2 m-3"
        onClick={handleSubmit}
      >
        Lưu thông tin
      </button>
    </div>
  );
};

export default DoctorAvailability;
