import React, { useState } from "react";

const TimeSlotsInput = ({ timeSlots, setTimeSlots }) => {
  const [newTimeSlot, setNewTimeSlot] = useState("");

  const addTimeSlot = () => {
    if (newTimeSlot && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots([...timeSlots, newTimeSlot]);
      setNewTimeSlot("");
    }
  };

  const removeTimeSlot = (slot) => {
    setTimeSlots(timeSlots.filter((t) => t !== slot));
  };

  return (
    <div className="border rounded-md border-opacity-80 ">
      <input
        className="w-8/12 px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] text-bold text-primaryColor leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
        type="text"
        value={newTimeSlot}
        onChange={(e) => setNewTimeSlot(e.target.value)}
        placeholder="Thêm thời gian khám bệnh"
      />
      <button
        className="w-3/12 bg-green-300 text-headingColor text-[16px] leading-3 rounded-lg px-2 py-2"
        onClick={addTimeSlot}
      >
        Thêm thời gian
      </button>
      <ul className="list-disc ml-5 px-2 py-2 text-[18px] text-headingColor text-bold">
        {timeSlots.map((slot, index) => (
          <li className="mb-3" key={index}>
            {slot}
            <button
              className="bg-red-500 text-[14px] text-white rounded-md px-2 py-2 mx-2"
              onClick={() => removeTimeSlot(slot)}
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeSlotsInput;
