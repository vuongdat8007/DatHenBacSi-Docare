import React, { useState } from "react";
import { useParams } from "react-router-dom";
import doctorImg from "./../../assets/images/doctor-img02.png";
import starIcon from "./../../assets/images/star-icon.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useFetchData from "../../hooks/useFetchData";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams(); // This extracts the `id` from the URL

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[175px]">
                  <img
                    src={doctor?.photo || doctorImg}
                    alt=""
                    className="w-full"
                  />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {doctor?.specialization || `Phẫu thuật/Mổ/Gây mê`}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {doctor.name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" /> {doctor?.averageRating}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({doctor?.totalRating})
                    </span>
                  </div>

                  <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {doctor?.bio ||
                      `Vitae, esse. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Dicta, alias!`}
                  </p>
                </div>
              </div>

              <div className="mt-[100px] border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-lg font-large text-center text-gray-700 dark:text-gray-400">
                  <li className="me-2">
                    <button
                      onClick={() => setTab("about")}
                      className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
                        tab === "about" &&
                        "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 me-2 ${
                          tab === "about"
                            ? "text-blue-600 dark:text-blue-500"
                            : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                      Giới thiệu
                    </button>
                  </li>
                  <li className="me-2">
                    <button
                      onClick={() => setTab("feedback")}
                      className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
                        tab === "feedback" &&
                        "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 me-2 ${
                          tab === "feedback"
                            ? "text-blue-600 dark:text-blue-500"
                            : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z" />
                      </svg>
                      Nhận xét
                    </button>
                  </li>
                </ul>
              </div>
              <div className="mt-[50px]">
                {tab === "about" && <DoctorAbout doctor={doctor} />}
                {tab === "feedback" && <Feedback doctor={doctor} />}
              </div>
            </div>

            <div>
              <SidePanel doctor={doctor} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
