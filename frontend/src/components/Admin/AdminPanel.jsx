import React, { useState } from 'react';
import UserManagement from './UserManagement';
import DoctorManagement from './DoctorManagement';
import AppointmentManagement from './AppointmentManagement';
import ReviewManagement from './ReviewManagement';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div>
      <div className="max-w-[1170px] px-3 py-3 mx-auto text-center text-[34px] text-primaryColor jumbotron">
        <h1>Admin Panel</h1>
      </div>
      <div className="flex justify-center mt-8">
        <button onClick={() => setActiveTab('users')} className={`p-2 ${activeTab === 'users' ? 'border-b-2 border-primaryColor text-primaryColor' : 'text-gray-600'}`}>User Management</button>
        <button onClick={() => setActiveTab('doctors')} className={`p-2 mx-4 ${activeTab === 'doctors' ? 'border-b-2 border-primaryColor text-primaryColor' : 'text-gray-600'}`}>Doctor Management</button>
        <button onClick={() => setActiveTab('appointments')} className={`p-2 ${activeTab === 'appointments' ? 'border-b-2 border-primaryColor text-primaryColor' : 'text-gray-600'}`}>Appointment Management</button>
        <button onClick={() => setActiveTab('reviews')} className={`p-2 ml-4 ${activeTab === 'reviews' ? 'border-b-2 border-primaryColor text-primaryColor' : 'text-gray-600'}`}>Review Management</button>
      </div>
      <hr className="h-px my-8 bg-gray-100 border-1" />
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'doctors' && <DoctorManagement />}
      {activeTab === 'appointments' && <AppointmentManagement />}
      {activeTab === 'reviews' && <ReviewManagement />}
    </div>
  );
};

export default AdminPanel;
