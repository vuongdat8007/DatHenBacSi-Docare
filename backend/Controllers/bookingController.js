import Booking from "../models/BookingSchema.js";

export const createAppointment = async (req, res) => {
  try {
    const newAppointment = new Booking({
      doctor: req.body.doctor,
      user: req.userId, // Assuming user ID is sent along with request
      ticketPrice: req.body.ticketPrice,
      appointmentDate: req.body.appointmentDate,
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
