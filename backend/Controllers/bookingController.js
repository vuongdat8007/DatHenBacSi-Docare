import Booking from "../models/BookingSchema.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctor, ticketPrice, rawAppointmentData } = req.body;

    // Calculate the next occurrence of the specified day
    const [dayOfWeek, timeslot] = rawAppointmentData.split(" ");
    const dateOfAppointment = getNextDayOfWeek(dayOfWeek, timeslot);

    const newAppointment = new Booking({
      doctor,
      user: req.userId, // Assuming user ID is sent along with request
      ticketPrice,
      appointmentDate: dateOfAppointment,
      rawAppointmentData: rawAppointmentData,
      status: "pending", // Default status
      isPaid: false,
    });
    await newAppointment.save();
    res.status(201).json({
      message: "Đặt hẹn thành công",
      data: newAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi đặt hẹn", error: error.message });
  }
};

function getNextDayOfWeek(dayOfWeek, timeslot) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = days.indexOf(dayOfWeek);

  if (dayIndex < 0) throw new Error("Invalid day of the week");

  const now = new Date();
  now.setDate(now.getDate() + ((dayIndex + 7 - now.getDay()) % 7));

  // Assuming timeslot is in 'HH:MM-HH:MM' format
  const [startTime] = timeslot.split("-");
  const [hours, minutes] = startTime.split(":");

  now.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

  return now;
}
