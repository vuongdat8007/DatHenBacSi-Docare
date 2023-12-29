import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import noPhotoImg from "../../assets/images/doctor-img01.png";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import starIcon from "../../assets/images/star-icon.png";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((appointment) => (
            <>
              <div
                key="`${req.userId}`-MyBookings"
                className="border border-primaryColor mt-5 rounded-md p-3 lg:p-5"
              >
                <div>
                  <img
                    src={appointment.doctor?.photo || noPhotoImg}
                    alt=""
                    className="w-[100px]"
                  />
                </div>
                <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5 ">
                  {appointment.doctor.name}
                </h2>

                <div className="mt-2 lg:mt-4 flex items-center justify-between">
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {appointment.doctor.specialization}
                  </span>

                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" />{" "}
                      {appointment.doctor.averageRating}
                    </span>
                    <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({appointment.doctor.totalRating})
                    </span>
                  </div>
                </div>

                <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
                  <div>
                    <h5 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
                      +{appointment.doctor.bio}
                    </h5>
                    <span className="ml-5 text-[18px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                      Giá vé:{" "}
                      {appointment.ticketPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}
                    </span>
                    <hr />
                    <p className="leading-7 text-[20px] font-semibold text-headingColor">
                      Ngày hẹn:{" "}
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="ml-5 leading-7 text-[20px] font-semibold text-headingColor">
                      Giờ hẹn:{" "}
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleTimeString()}
                    </p>
                    <p className="leading-7 text-[20px] font-semibold text-teal-900">
                      (Đã chọn giờ khám: {appointment.rawAppointmentData})
                    </p>
                    <hr />
                    <h3 className="text-right">
                      {!appointment.isPaid && `Chưa thanh toán`}{" "}
                      {appointment.isPaid && `Đã thanh toán`} - Trạng thái:{" "}
                      <strong className="text-red-500">
                        {appointment.status}
                      </strong>
                    </h3>
                  </div>

                  <Link
                    to={`/doctors/${appointment.doctor._id}`}
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight
                      className="group-hover:text-white w-8 h-10"
                      title="Xem thông tin Bác sĩ này"
                    />
                  </Link>
                </div>
              </div>
            </>
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          Bạn chưa đặt lịch hẹn với Bác Sĩ!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
