import React from 'react';
import UserManagement from './UserManagement';
import DoctorManagement from './DoctorManagement';
import AppointmentManagement from './AppointmentManagement';
import ReviewManagement from './ReviewManagement';

const AdminPanel = () => {
  return (
    <div>
      <div className="max-w-[1170px] px-3 py-3 mx-auto text-center text-[34px] text-primaryColor jumbotron"><h1>Admin Panel</h1></div>
      <hr className="h-px my-8 bg-gray-100 border-1" />
      <UserManagement />
      <hr className="h-px my-8 bg-gray-100 border-1" />
      <DoctorManagement />
      <AppointmentManagement />
      <ReviewManagement />
    </div>
  );
};

export default AdminPanel;
