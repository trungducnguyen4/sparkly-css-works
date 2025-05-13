import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 font-bold text-lg">Admin Panel</div>
        <nav className="space-y-2">
          <button
            onClick={() => navigate("/admin/users")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Quản lý người dùng
          </button>
          <button
            onClick={() => navigate("/admin/vocabulary")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Quản lý từ vựng
          </button>
          <button
            onClick={() => navigate("/admin/topics")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Quản lý chủ đề
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to the Admin Panel</h1>
        <p className="text-gray-600 mt-4">
          Use the navigation menu to manage users, vocabulary, and topics.
        </p>
      </main>
    </div>
  );
};

export default Admin;