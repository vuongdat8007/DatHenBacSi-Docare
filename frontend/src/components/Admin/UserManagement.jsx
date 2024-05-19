import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import useFetchDataAdmin from '../../hooks/useFetchDataAdmin';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";

const UserManagement = () => {
  const { token } = useContext(authContext);
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setAvatar] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setAvatar(data.url);
  };

  const {
    data: users = [],
    loading,
    error,
    refetch: fetchUsers
  } = useFetchDataAdmin(`${BASE_URL}/admin/users`, token);

  useEffect(() => {
    if (userId) {
      const user = users.find(user => user._id === userId);
      setName(user.name);
      setEmail(user.email);
      setPassword('');
      setAvatar(user.photo || '');
      setRole(user.role || '');
      setGender(user.gender || '');
      setBloodType(user.bloodType || '');
    }
  }, [userId, users]);

  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setAvatar(user.photo);
    setPassword(''); // Clear password field for security reasons
    setEditingUser(user);
  };

  const handleCreateOrUpdateUser = async () => {
    try {
      if (userId) {
        await axios.put(`${BASE_URL}/admin/users/${userId}`, { name, email, password, photo: avatar, role, gender, bloodType }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${BASE_URL}/admin/users`, { name, email, password, photo: avatar, role, gender, bloodType }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Error creating/updating user:', error);
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

 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleSubmit = async () => {
    const userData = { name, email, password, photo: avatar };
  
    try {
      if (editingUser) {
        await axios.put(`${BASE_URL}/admin/users/${editingUser._id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(`${BASE_URL}/admin/users`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchUsers();
      setName('');
      setEmail('');
      setPassword('');
      setAvatar('');
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };
  

  const resetForm = () => {
    setUserId('');
    setName('');
    setEmail('');
    setPassword('');
    setAvatar('');
    setRole('');
    setGender('');
    setBloodType('');
  };

  const filteredUsers = users
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <section className="p-4">
      <div className="pb-[50px] px-[30px] rounded-md mx-auto w-full md:w-1/2">
        <h2 className="text-center text-[22px] leading-9 font-bold mb-10">{userId ? 'Edit User' : 'Create User'}</h2>
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
          {/* <input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Avatar URL" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" /> */}

          <div className="mb-5 flex items-center gap-3">
            {photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img
                  src={avatar}
                  alt=""
                  className="w-full rounded-full"
                />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer pl-5"
              >
                {selectedFile ? selectedFile.name : "Upload Image"}
              </label>
            </div>
          </div>

          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
          <input value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
          <input value={bloodType} onChange={(e) => setBloodType(e.target.value)} placeholder="Blood Type" className="w-full px-2 py-3 mb-4 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer" />
          {/* <button onClick={handleCreateOrUpdateUser} className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">{userId ? 'Update User' : 'Create User'}</button> */}
          <button
      onClick={handleSubmit}
      className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
    >
      {editingUser ? 'Update User' : 'Create User'}
    </button>
        </div>
      </div>

      

      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="text" id="table-search-users" value={searchTerm} onChange={handleSearch} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('name')}>
                    Name
                    {sortField === 'name' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('email')}>
                    Email
                    {sortField === 'email' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                  <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort('role')}>
                    Role
                    {sortField === 'role' && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input id={`checkbox-table-search-${user._id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <label htmlFor={`checkbox-table-search-${user._id}`} className="sr-only">checkbox</label>
                        </div>
                      </td>
                      <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img className="w-10 h-10 rounded-full" src={user.photo || 'https://via.placeholder.com/150'} alt="User Avatar" />
                        <div className="pl-3">
                          <div className="text-base font-semibold">{user.name}</div>
                          <div className="font-normal text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteUser(user._id)} className="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                        <button onClick={() => handleEditUser(user._id)} className="ml-2 text-blue-600 hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserManagement;
