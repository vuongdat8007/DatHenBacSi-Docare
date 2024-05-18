import React, { useContext, useState } from 'react';
import axios from 'axios';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const AppointmentManagement = () => {
  const { token } = useContext(authContext);
  const [doctor, setDoctor] = useState('');
  const [patient, setPatient] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [rawAppointmentData, setRawAppointmentData] = useState('');

  const {
    data: appointments = [],
    loading,
    error,
    refetch: fetchAppointments
  } = useFetchData(`${BASE_URL}/admin/appointments`, token);

  const handleCreateAppointment = async () => {
    try {
      await axios.post(`${BASE_URL}/admin/appointments`, { doctor, patient, ticketPrice, appointmentDate, rawAppointmentData }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAppointments();
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
      fetchAppointments();
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
                <input value={patient} onChange={(e) => setPatient(e.target.value)} placeholder="Patient ID" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} placeholder="Ticket Price" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} placeholder="Appointment Date" type="datetime-local" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={rawAppointmentData} onChange={(e) => setRawAppointmentData(e.target.value)} placeholder="Raw Appointment Data" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <button onClick={handleCreateAppointment} className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">Create Appointment</button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Doctor</th>
                    <th className="text-left p-2">Patient</th>
                    <th className="text-left p-2">Ticket Price</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map(appointment => (
                      <tr key={appointment._id}>
                        <td className="p-2">{appointment._id}</td>
                        <td className="p-2">{appointment.doctor.name}</td>
                        <td className="p-2">{appointment.patient.name}</td>
                        <td className="p-2">{appointment.ticketPrice}</td>
                        <td className="p-2">{new Date(appointment.appointmentDate).toLocaleString()}</td>
                        <td className="p-2">
                          <button onClick={() => handleDeleteAppointment(appointment._id)} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center p-4">No appointments found</td>
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

export default AppointmentManagement;
