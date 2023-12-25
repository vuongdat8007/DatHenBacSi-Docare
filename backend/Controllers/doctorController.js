import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const updateDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật thông tin bác sĩ thành công!",
      data: updateDoctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cập nhật KHÔNG thành công! ",
      error: error,
    });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id);

    res.status(204).json({
      success: true,
      message: "Xoá bác sĩ thành công!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Xoá KHÔNG thành công! ",
      error: error,
    });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews") // include the reviews info from reviewsModel
      .select("-password"); // exclude password field in the response;

    res.status(200).json({
      success: true,
      message: "Đã tìm thấy bác sĩ này!",
      data: doctor,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy bác sĩ này!",
    });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } }, // options "i": case insensitive searching
        ],
      }).select("-password"); // exclude password field in the response
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      );
    }

    res.status(200).json({
      success: true,
      message: "Đã tìm thấy danh sách bác sĩ!",
      data: doctors,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy danh sách bác sĩ!",
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  //console.log("userId: " + doctorId);
  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy bác sĩ!" });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });

    res.status(200).json({
      success: true,
      message: "Hồ sơ đang đã được tìm thấy, đang gửi đi...",
      data: { ...rest, appointments },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
