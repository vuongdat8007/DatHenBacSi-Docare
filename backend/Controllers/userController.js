import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật thông tin người dùng thành công!",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cập nhật KHÔNG thành công! ",
      error: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Xoá người dùng thành công!",
      data: User,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Xoá KHÔNG thành công! ",
      error: error,
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password"); // exclude password field in the response;

    res.status(200).json({
      success: true,
      message: "Đã tìm thấy người dùng này!",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy người dùng này!",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // exclude password field in the response

    res.status(200).json({
      success: true,
      message: "Đã tìm thấy danh sách người dùng!",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Không tìm thấy danh sách người dùng!",
    });
  }
};
