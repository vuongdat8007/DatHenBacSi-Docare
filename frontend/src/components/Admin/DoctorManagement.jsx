import React, { useContext, useState } from 'react';
import axios from 'axios';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import useFetchDataAdmin from '../../hooks/useFetchDataAdmin';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const DoctorManagement = () => {
  const { token } = useContext(authContext);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');

  const {
    data: doctors = [],
    loading,
    error,
    refetch: fetchDoctors
  } = useFetchDataAdmin(`${BASE_URL}/admin/doctors`, token);

  const handleCreateDoctor = async () => {
    try {
      await axios.post(`${BASE_URL}/admin/doctors`, { name, specialty }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
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
              <h2 className="text-center text-[22px] leading-9 font-bold mb-10">Doctor Management</h2>
              <div>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={specialty} onChange={(e) => setSpecialty(e.target.value)} placeholder="Specialty" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <button onClick={handleCreateDoctor} className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">Create Doctor</button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Specialty</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.length > 0 ? (
                    doctors.map(doctor => (
                      <tr key={doctor._id}>
                        <td className="p-2">{doctor._id}</td>
                        <td className="p-2">{doctor.name}</td>
                        <td className="p-2">{doctor.specialty}</td>
                        <td className="p-2">
                          <button onClick={() => handleDeleteDoctor(doctor._id)} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4">No doctors found</td>
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

export default DoctorManagement;
