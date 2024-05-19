import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const AppointmentManagement = () => {
  const { token } = useContext(authContext);
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [user, setUser] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [rawAppointmentData, setRawAppointmentData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const formattedAppointments = response.data.map(appointment => ({
          ...appointment,
          patient: appointment.user,
        }));
        setAppointments(formattedAppointments);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  const handleCreateAppointment = async () => {
    try {
      await axios.post(`${BASE_URL}/admin/appointments`, { doctor, user, ticketPrice, appointmentDate, rawAppointmentData }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAppointments(); // Refetch appointments after creating a new one
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAppointments(); // Refetch appointments after deleting one
    } catch (error) {
      console.error('Error deleting appointment:', error);
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
              <h2 className="text-center text-[22px] leading-9 font-bold mb-10">Appointment Management</h2>
              <div>
                <input value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Doctor ID" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Patient ID" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} placeholder="Ticket Price" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} placeholder="Appointment Date" type="datetime-local" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={rawAppointmentData} onChange={(e) => setRawAppointmentData(e.target.value)} placeholder="Raw Appointment Data" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <button onClick={handleCreateAppointment} className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">Create Appointment</button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">ID</th>
                      <th scope="col" className="px-6 py-3">Doctor</th>
                      <th scope="col" className="px-6 py-3">Patient</th>
                      <th scope="col" className="px-6 py-3">Ticket Price</th>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map(appointment => (
                        <tr key={appointment._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input id={`checkbox-table-search-${appointment._id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                              <label htmlFor={`checkbox-table-search-${appointment._id}`} className="sr-only">checkbox</label>
                            </div>
                          </td>
                          <td className="px-6 py-4">{appointment._id}</td>
                          <td className="px-6 py-4">{appointment.doctor?.name || 'N/A'}</td>
                          <td className="px-6 py-4">{appointment.patient?.name || 'N/A'}</td>
                          <td className="px-6 py-4">{appointment.ticketPrice}</td>
                          <td className="px-6 py-4">{new Date(appointment.appointmentDate).toLocaleString()}</td>
                          <td className="flex items-center px-6 py-4">
                            <a href="#" onClick={() => handleDeleteAppointment(appointment._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete</a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center p-4">No appointments found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppointmentManagement;
