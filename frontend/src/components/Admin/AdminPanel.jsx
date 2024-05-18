import React from 'react';
import UserManagement from './UserManagement';
import DoctorManagement from './DoctorManagement';
import AppointmentManagement from './AppointmentManagement';
import ReviewManagement from './ReviewManagement';

const AdminPanel = () => {
  return (
    <div>
      <div class="max-w-[1170px] px-3 py-3 mx-auto text-center text-[34px] text-primaryColor jumbotron"><h1>Admin Panel</h1></div>
      <hr />
      <UserManagement />
      <DoctorManagement />
      <AppointmentManagement />
      <ReviewManagement />
    </div>
  );
};

export default AdminPanel;
