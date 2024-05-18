import React, { useContext, useState } from 'react';
import axios from 'axios';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import useFetchDataAdmin from '../../hooks/useFetchDataAdmin';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const UserManagement = () => {
  const { token } = useContext(authContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    data: users = [],
    loading,
    error,
    refetch: fetchUsers
  } = useFetchDataAdmin(`${BASE_URL}/admin/users`, token);

  const handleCreateUser = async () => {
    try {
      await axios.post(`${BASE_URL}/admin/users`, { name, email, password }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
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
              <h2 className="text-center text-[22px] leading-9 font-bold mb-10">User Management</h2>
              <div>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
                <button onClick={handleCreateUser} className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">Create User</button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map(user => (
                      <tr key={user._id}>
                        <td className="p-2">{user._id}</td>
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">
                          <button onClick={() => handleDeleteUser(user._id)} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4">No users found</td>
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

export default UserManagement;
