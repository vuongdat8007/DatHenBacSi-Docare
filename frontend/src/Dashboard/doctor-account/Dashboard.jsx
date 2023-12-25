import React, { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import userImg from "../../assets/images/doctor-img01.png";

import { BASE_URL } from "../../config";
import DoctorProfile from "./DoctorProfile";
import MyDoctorBookings from "./MyDoctorBookings";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Dashboard = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("profile");

  const {
    data: doctorData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={doctorData?.photo ? doctorData?.photo : userImg}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {doctorData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {doctorData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Chuyên môn:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {doctorData?.specialization}
                  </span>
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Tình trạng hồ sơ DOCARE:
                  <span className="ml-2 text-primaryColor text-[18px] leading-8 capitalize">
                    {doctorData?.isApproved}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                  onClick={handleLogout}
                >
                  Thoát
                </button>
                <button className="w-full bg-red-600  mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                  Xoá tài khoản
                </button>
              </div>
            </div>

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={` ${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Lịch hẹn bệnh nhân
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={` ${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Tuỳ chỉnh hồ sơ
                </button>
              </div>
              {tab === "bookings" && <MyDoctorBookings doctor={doctorData} />}
              {tab === "settings" && <DoctorProfile doctor={doctorData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
