import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyDoctorBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5 border rounded-md bg-slate-200 mt-5 p-5">
          {appointments.map(({ bookingDetails, patientDetails }, index) => (
            <div key={index} className="booking-card grid auto-rows-auto">
              <h3 className="mt-2 text-left leading-7 text-[20px] font-bold text-primaryColor">
                Bệnh nhân: {patientDetails.name}]
              </h3>
              <span className="ml-5 text-[18px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
                Giá vé:{" "}
                {bookingDetails.ticketPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}
              </span>
              <p className="leading-7 text-[20px] font-semibold text-headingColor">
                Ngày hẹn:{" "}
                {new Date(bookingDetails.appointmentDate).toLocaleDateString()}
              </p>
              <p className="ml-5 leading-7 text-[20px] font-semibold text-headingColor">
                Giờ hẹn:{" "}
                {new Date(bookingDetails.appointmentDate).toLocaleTimeString()}
              </p>
              <p className="leading-7 text-[20px] font-semibold text-teal-900">
                (Đã chọn giờ khám: {bookingDetails.rawAppointmentData})
              </p>
              <h3 className="text-right">
                {!bookingDetails.isPaid && `Chưa thanh toán`}{" "}
                {bookingDetails.isPaid && `Đã thanh toán`} - Trạng thái:{" "}
                <strong className="text-red-500">
                  {bookingDetails.status}
                </strong>
              </h3>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          Bạn chưa có bệnh nhân đặt lịch hẹn khám!
        </h2>
      )}
    </div>
  );
};

export default MyDoctorBookings;
