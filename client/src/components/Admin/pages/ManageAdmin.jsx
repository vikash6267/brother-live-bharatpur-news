import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AdminManage = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    canAdd: false,
    canEdit: false,
    canDelete: false,
  });
  const [editData, setEditData] = useState({
    adminId: null,
    canAdd: false,
    canEdit: false,
    canDelete: false,
  });
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    const permissions = {
      canAdd: formData.canAdd,
      canEdit: formData.canEdit,
      canDelete: formData.canDelete,
    };

    try {
      await axios.post(`${BASE_URL}/admin/add`, { ...formData, permissions }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({
        name: '',
        email: '',
        password: '',
        canAdd: false,
        canEdit: false,
        canDelete: false,
      });
      // Fetch updated list of admins
      const response = await axios.get(`${BASE_URL}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(response.data);
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      await axios.delete(`${BASE_URL}/admin/delete/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Fetch updated list of admins
      const response = await axios.get(`${BASE_URL}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(response.data);
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const permissions = {
      canAdd: editData.canAdd,
      canEdit: editData.canEdit,
      canDelete: editData.canDelete,
    };
    
    try {
      await axios.put(`${BASE_URL}/admin/update/${editData.adminId}`, {permissions}, {        headers: { Authorization: `Bearer ${token}` },
      });
      // Fetch updated list of admins
      const response = await axios.get(`${BASE_URL}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(response.data);
      setEditData({
        adminId: null,
        canAdd: false,
        canEdit: false,
        canDelete: false,
      });
    } catch (error) {
      console.error('Error updating admin permissions:', error);
    }
  };

  if (user.role !== 'SuperAdmin') {
    return <div className="text-red-600">Access denied</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>
      <form onSubmit={handleAddAdmin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Permissions
          </label>
          <div className="flex items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 mr-4">
              <input
                type="checkbox"
                name="canAdd"
                checked={formData.canAdd}
                onChange={handleCheckboxChange}
                className="mr-2 leading-tight"
              />
              Can Add
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2 mr-4">
              <input
                type="checkbox"
                name="canEdit"
                checked={formData.canEdit}
                onChange={handleCheckboxChange}
                className="mr-2 leading-tight"
              />
              Can Edit
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              <input
                type="checkbox"
                name="canDelete"
                checked={formData.canDelete}
                onChange={handleCheckboxChange}
                className="mr-2 leading-tight"
              />
              Can Delete
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <AiOutlineUserAdd className="inline-block mr-2" /> Add Admin
        </button>
      </form>


  <table className="min-w-full bg-white shadow-md rounded mb-4">
  <thead className="bg-gray-200">
    <tr>
      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Admin Name (Email)</th>
      <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Actions</th>
    </tr>
  </thead>
  <tbody className="bg-white">
    {admins.map((admin) => (
      <tr key={admin._id} className="border-b border-gray-200">
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
          <div className="flex items-center">
            <span className="font-bold">{admin.name}</span> ({admin.email})
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-center text-sm leading-5 font-medium">
          <button
            onClick={() => setEditData({
              adminId: admin._id,
              canAdd: admin.permissions.canAdd,
              canEdit: admin.permissions.canEdit,
              canDelete: admin.permissions.canDelete,
            })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          >
            Edit Permissions
          </button>
          <button
            onClick={() => handleDeleteAdmin(admin._id)}
            className="text-red-500 hover:text-red-700"
          >
            <FiTrash2 />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>




      {editData.adminId && (
  <>
    <div className="fixed inset-0 bg-black opacity-50 z-10 "></div>
    <form onSubmit={handleEditSubmit} className="fixed bg-gray-200 top-[30%] right-[40%] shadow-md rounded px-8 pt-6 pb-8 mb-4 z-20">
      <h3 className="text-xl font-bold mb-4">Edit Permissions for {admins.find(admin => admin._id === editData.adminId)?.name}</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Permissions
        </label>
        <div className="flex items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2 mr-4">
            <input
              type="checkbox"
              name="canAdd"
              checked={editData.canAdd}
              onChange={handleEditChange}
              className="mr-2 leading-tight"
            />
            Can Add
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2 mr-4">
            <input
              type="checkbox"
              name="canEdit"
              checked={editData.canEdit}
              onChange={handleEditChange}
              className="mr-2 leading-tight"
            />
            Can Edit
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <input
              type="checkbox"
              name="canDelete"
              checked={editData.canDelete}
              onChange={handleEditChange}
              className="mr-2 leading-tight"
            />
            Can Delete
          </label>
        </div>
      </div>

      <div className=' w-full justify-between flex'>
      <button
        type="submit"
        className="  bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Permissions
      </button>
      <button
        type="submit"
        className="  bg-gray-500 hover:bg-blue-900 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onCanPlay={()=>setEditData({
          adminId: "",

        })}
      >
        Close
      </button>


      </div>
    </form>
  </>
)}

    </div>
  );
};

export default AdminManage;
