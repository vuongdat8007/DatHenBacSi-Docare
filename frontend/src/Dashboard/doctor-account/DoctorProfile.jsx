import React, { useState, useEffect } from "react";
import avatar from "../../assets/images/doctor-img01.png";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader.js";
import MoneyInput from "../../components/Doctors/MoneyInput.jsx";
import TimeSlotsInput from "../../components/Doctors/TimeSlotsInput.jsx";
import DoctorAvailability from "../../components/Doctors/DoctorAvailability.jsx";

const DoctorProfile = ({ doctor }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    photo: "",
    about: "",
    bio: "",
    timeSlots: [],
    ticketPrice: "",
    specialization: "",
    qualifications: [{ degree: "", institution: "", fromDate: "", toDate: "" }],
    experiences: [{ position: "", institution: "", fromDate: "", toDate: "" }],
    isApproved: "pending",
    averageRating: 0,
    totalRating: 0,
    reviews: [],
    appointments: [],
    // Other fields as needed
  });

  const navigate = useNavigate();

  // populate ticketPrice with formatted numeric
  const formattedValue = doctor?.ticketPrice
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    // Set initial form data from doctor data
    if (doctor) {
      setFormData({
        name: doctor.name,
        email: doctor.email,
        phone: doctor?.phone,
        gender: doctor.gender,
        photo: doctor?.photo,
        about: doctor?.about,
        bio: doctor?.bio,
        timeSlots: doctor?.timeSlots,
        ticketPrice: formattedValue,
        specialization: doctor?.specialization,
        qualifications: doctor?.qualifications,
        experiences: doctor?.experiences,
        isApproved: doctor.isApproved,
        averageRating: doctor?.averageRating,
        totalRating: doctor?.totalRating,
        reviews: doctor?.reviews,
        appointments: doctor?.appointments,
      });
    }
  }, [doctor]);

  // Handlers for input changes and form submission
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    // use cloudinary to upload images
    const data = await uploadImageToCloudinary(file);

    //console.log(data);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleTimeSlotsChange = (newTimeSlots) => {
    setFormData({ ...formData, timeSlots: newTimeSlots });
  };

  const handleQualificationChange = (index, e) => {
    const updatedQualifications = formData.qualifications.map(
      (qualification, i) => {
        if (i === index) {
          return { ...qualification, [e.target.name]: e.target.value };
        }
        return qualification;
      }
    );

    setFormData({ ...formData, qualifications: updatedQualifications });
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [
        ...formData.qualifications,
        { degree: "", institution: "", fromDate: "", toDate: "" },
      ],
    });
  };

  const removeQualification = (index) => {
    setFormData({
      ...formData,
      qualifications: formData.qualifications.filter((_, i) => i !== index),
    });
  };

  const handleExperienceChange = (index, e) => {
    const updatedExperiences = formData.experiences.map((experience, i) => {
      if (i === index) {
        return { ...experience, [e.target.name]: e.target.value };
      }
      return experience;
    });

    setFormData({ ...formData, experiences: updatedExperiences });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { position: "", institution: "", fromDate: "", toDate: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter((_, i) => i !== index),
    });
  };

  const submitHandler = async (event) => {
    //console.log(formData);
    event.preventDefault();
    setLoading(true);

    // Convert ticketPrice back to a number
    const numericTicketPrice = Number(formData.ticketPrice.replace(/,/g, ""));

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctor._id}`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          ticketPrice: numericTicketPrice, // Use the numeric value here
        }),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/doctors/profile/me");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler} className="py-4 md:py-0">
        <div className="mb-5">
          <input
            type="text"
            placeholder="Họ tên đầy đủ"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            placeholder="Nhập địa chỉ email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            placeholder="Đặt lại mật khẩu mới"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            placeholder="Chuyên môn"
            name="specialization"
            value={formData.specialization}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>

        <div className="mb-5 items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Giới tính:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            >
              <option value="">Vui lòng chọn...</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">other</option>
            </select>
          </label>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />

            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-centerpx-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer pl-5"
            >
              {selectedFile ? selectedFile.name : "Tải ảnh lên"}
            </label>
          </div>
        </div>

        <div className="mb-5">
          <label>Giá vé khám bệnh (VND):</label>
          <MoneyInput
            value={formData.ticketPrice}
            onChange={(newValue) =>
              setFormData({ ...formData, ticketPrice: newValue })
            }
          />
        </div>

        <div className="mb-5">
          <h3 className="text-[18px] text-bold text-headingColor">
            Khoảng thời gian sẵn sàng khám bệnh:
          </h3>
          {/* <TimeSlotsInput
            timeSlots={formData.timeSlots}
            setTimeSlots={handleTimeSlotsChange}
          /> */}
          <DoctorAvailability doctorId={doctor._id} />
        </div>

        <div className="mb-5">
          <h3 className="text-[18px] text-bold text-headingColor">
            Tóm tắt tiểu sử:
          </h3>
          <textarea
            type="text"
            rows={2}
            placeholder="Hồ sơ tiểu sử ngắn gọn"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full pr-4 py-2 px-2 border border-solid border-[#0066ff61] bg-sky-100 focus:outline-none focus:border-primaryColor rounded-md text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>

        <div className="mb-5">
          <h3 className="text-[18px] text-bold text-headingColor">
            Giới thiệu bản thân:
          </h3>
          <textarea
            type="text"
            rows={5}
            placeholder="Giới thiệu bản thân"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            className="w-full pr-4 py-2 px-2 border border-solid border-[#0066ff61]  bg-sky-100 focus:outline-none focus:border-primaryColor rounded-md text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>

        <div className="mb-5 grid grid-flow-row auto-rows-auto items-center gap-3">
          {formData.qualifications.map((qualification, index) => (
            <div
              key={index}
              className="px-2 py-2 border border-solid border-indigo-600"
            >
              <input
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                type="text"
                placeholder="Bằng cấp/chứng chỉ"
                name="degree"
                value={qualification.degree}
                onChange={(e) => handleQualificationChange(index, e)}
              />
              <input
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                type="text"
                placeholder="Đơn vị cấp"
                name="institution"
                value={qualification.institution}
                onChange={(e) => handleQualificationChange(index, e)}
              />
              {/* Include other fields such as fromDate and toDate */}
              <label className="font-semibold text-headingColor text-[16px]">
                Từ ngày:
              </label>
              <input
                type="date"
                name="fromDate"
                value={qualification.fromDate}
                onChange={(e) => handleQualificationChange(index, e)}
                className="px-2 py-2 text-headingColor text-[16px] text-semibold mx-2"
              />
              <label className="font-semibold text-headingColor text-[16px]">
                Đến ngày:
              </label>
              <input
                type="date"
                name="toDate"
                value={qualification.toDate}
                onChange={(e) => handleQualificationChange(index, e)}
                className="px-2 py-2 text-headingColor text-[16px] text-semibold mx-2"
              />
              <button
                className="bg-red-500 text-[14px] text-white rounded-md px-2 py-2 mx-2"
                onClick={() => removeQualification(index)}
              >
                Xoá
              </button>
            </div>
          ))}
          <button
            className="w-1/3 bg-green-300 text-headingColor text-[16px] leading-3 rounded-lg px-2 py-2"
            onClick={addQualification}
          >
            Thêm bằng cấp
          </button>
        </div>

        <div className="mb-5 grid grid-flow-row auto-rows-auto items-center gap-3">
          {formData.experiences.map((experience, index) => (
            <div
              key={index}
              className="experience-entry px-2 py-2 border border-solid border-indigo-600"
            >
              <input
                type="text"
                placeholder="Vị trí công tác"
                name="position"
                value={experience.position}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              />
              <input
                type="text"
                placeholder="Đơn vị"
                name="institution"
                value={experience.institution}
                onChange={(e) => handleExperienceChange(index, e)}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              />
              <label className="font-semibold text-headingColor text-[16px]">
                Từ ngày:
              </label>
              <input
                type="date"
                name="fromDate"
                value={experience.fromDate}
                onChange={(e) => handleExperienceChange(index, e)}
                className="px-2 py-2 text-headingColor text-[16px] text-semibold mx-2"
              />
              <label className="font-semibold text-headingColor text-[16px]">
                Đến ngày:
              </label>
              <input
                type="date"
                name="toDate"
                value={experience.toDate}
                onChange={(e) => handleExperienceChange(index, e)}
                className="px-2 py-2 text-headingColor text-[16px] text-semibold mx-2"
              />
              <button
                onClick={() => removeExperience(index)}
                className="bg-red-500 text-[14px] text-white rounded-md px-2 py-2 mx-2"
              >
                Xoá
              </button>
            </div>
          ))}
          <button
            className="w-1/3 bg-green-300 text-headingColor text-[16px] leading-3 rounded-lg px-2 py-2"
            onClick={addExperience}
          >
            Thêm kinh nghiệm công tác
          </button>
        </div>

        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : `Cập nhật`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;
