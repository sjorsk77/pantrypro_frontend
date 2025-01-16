import React, { useState } from "react";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");

    // Mock Data
    const mockUsers = [
        { id: 1, name: "Sjors Klaassen", email: "sjorsk77@gmail.com", role: "Admin", status: "Active" },
        { id: 2, name: "Sjors Klaassen", email: "sjors.klaassen@gmail.com", role: "User", status: "Inactive" },
        { id: 3, name: "Bie bah", email: "mjdsalkjdsasjdda@hthlm.com", role: "User", status: "Inactive" },
        { id: 4, name: "John doe", email: "asdjsalkdjasdasjkl@hthlm.com", role: "User", status: "Inactive" },
        { id: 5, name: "John doe", email: "sjdklasjdaskljaskd@hthlm.com", role: "User", status: "Inactive" },
        { id: 6, name: "John doe", email: "mbisyiqatagjkqtmmk@hthlm.com", role: "User", status: "Inactive" },
    ];

    const mockLogs = [
        { action: "Login", user: "Sjors Klaassen", timestamp: "2025-01-16" },
        { action: "Login", user: "Sjors Klaassen", timestamp: "2025-01-16" },
        { action: "SignUp", user: "John Doe", timestamp: "2025-01-16" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mt-6">
                <button
                    className={`py-2 px-4 rounded ${
                        activeTab === "users" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                    }`}
                    onClick={() => setActiveTab("users")}
                >
                    Users
                </button>
                <button
                    className={`py-2 px-4 rounded ${
                        activeTab === "logs" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                    }`}
                    onClick={() => setActiveTab("logs")}
                >
                    Logs
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                {activeTab === "users" && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">User List</h2>
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mockUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                    <td
                                        className={`border border-gray-300 px-4 py-2 ${
                                            user.status === "Active" ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {user.status}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === "logs" && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">User Logs</h2>
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">User</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Timestamp</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mockLogs.map((log) => (
                                <tr key={log.id}>
                                    <td className="border border-gray-300 px-4 py-2">{log.action}</td>
                                    <td className="border border-gray-300 px-4 py-2">{log.user}</td>
                                    <td className="border border-gray-300 px-4 py-2">{log.timestamp}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button className="w-full bg-accent-blue p-2 my-3 rounded-2xl">Load more logs</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
