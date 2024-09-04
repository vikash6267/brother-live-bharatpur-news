import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
            <div className="w-full max-w-6xl">
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/12 py-3 px-4 text-center text-sm font-medium uppercase tracking-wider">#</th>
                                <th className="w-1/4 py-3 px-4 text-center text-sm font-medium uppercase tracking-wider">Name</th>
                                <th className="w-1/4 py-3 px-4 text-center text-sm font-medium uppercase tracking-wider">Email</th>
                                <th className="w-1/4 py-3 px-4 text-center text-sm font-medium uppercase tracking-wider">Location</th>
                                <th className="w-1/4 py-3 px-4 text-center text-sm font-medium uppercase tracking-wider">Registered At</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900 text-center">{user.name}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500 text-center">{user.email}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500 text-center">{user.location}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500 text-center">{new Date(user.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
