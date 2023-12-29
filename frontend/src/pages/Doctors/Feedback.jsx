import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";

const Feedback = ({ doctor }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const {
    data: reviews,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${doctor._id}/reviews`);

  /* const {
    _id,
    name,
    phone,
    photo,
    ticketPrice,
    specialization,
    qualifications, // type: Array
    experiences, // type: Array,
    bio,
    about,
    timeSlots, // type: Array }
    reviews,
    averageRating,
    totalRating,
    appointments,
  } = doctor; */

  return (
    <>
      <div>
        <div className="mb-[50px]">
          {loading && !error && <Loading />}

          {error && !loading && <Error errMessage={error} />}

          {!loading && !error && (
            <div>
              <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
                Tất cả các đánh giá ({reviews.length})
              </h4>

              <div className="flex justify-between gap-10 mb-[30px]">
                <div className="flex gap-3">
                  <figure className="w-10 h-10 rounded-full">
                    <img className="w-full" src={avatar} alt="" />
                  </figure>
                  <div>
                    <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                      Ngô Văn Bắp
                    </h5>
                    <p className="text-[14px] leading-6 text-textColor">
                      {formateDate("11-30-2023")}
                    </p>
                    <p className="text__para mt-3 font-medium text-[15px]">
                      Phục vụ chu đáo tận tình, sẽ thông tin cho người thân, bạn
                      bè và gia đình biết dịch vụ y tế của vị Bác Sĩ này!
                      &#128077; &#x1F44D; &#128079; &#128079; &#128079;
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
                  {[...Array(5).keys()].map((_, index) => (
                    <AiFillStar key={index} color="#0067FF" />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {!showFeedbackForm && (
          <div className="text-center">
            <button className="btn" onClick={() => setShowFeedbackForm(true)}>
              Viết đánh giá
            </button>
          </div>
        )}

        {showFeedbackForm && <FeedbackForm doctor={doctor} />}
      </div>
    </>
  );
};

export default Feedback;
