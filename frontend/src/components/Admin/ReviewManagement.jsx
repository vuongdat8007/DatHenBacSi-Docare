import React, { useContext, useState } from 'react';
import axios from 'axios';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import useFetchDataAdmin from '../../hooks/useFetchDataAdmin';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const ReviewManagement = () => {
  const { token } = useContext(authContext);
  const [doctor, setDoctor] = useState('');
  const [user, setUser] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const {
    data: reviews = [],
    loading,
    error,
    refetch: fetchReviews
  } = useFetchDataAdmin(`${BASE_URL}/admin/reviews`, token);

  const handleCreateReview = async () => {
    try {
      await axios.post(`${BASE_URL}/admin/reviews`, { doctor, user, reviewText, rating }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchReviews();
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <h2 className="text-center text-[22px] leading-9 font-bold mb-10">Review Management</h2>
              <div>
                <input value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Doctor ID" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="User ID" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Review Text" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" type="number" min="0" max="5" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <button onClick={handleCreateReview} className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">Create Review</button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Doctor</th>
                    <th className="text-left p-2">User</th>
                    <th className="text-left p-2">Review Text</th>
                    <th className="text-left p-2">Rating</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <tr key={review._id}>
                        <td className="p-2">{review._id}</td>
                        <td className="p-2">{review.doctor.name}</td>
                        <td className="p-2">{review.user.name}</td>
                        <td className="p-2">{review.reviewText}</td>
                        <td className="p-2">{review.rating}</td>
                        <td className="p-2">
                          <button onClick={() => handleDeleteReview(review._id)} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">No reviews found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewManagement;
