import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>("users");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (activeSection) {
          case "users":
            response = await axios.get("http://localhost:8080/api/admin/users");
            break;
          case "vocabulary":
            response = await axios.get("http://localhost:8080/api/admin/vocabulary");
            break;
          case "progress":
            response = await axios.get("http://localhost:8080/api/admin/progress");
            break;
          default:
            return;
        }
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [activeSection]);

  const renderContent = () => {
    if (!data) return <div>Loading...</div>;

    switch (activeSection) {
      case "users":
        return (
          <div>
            <h2>Quản lý người dùng</h2>
            <ul>
              {data.map((user: any) => (
                <li key={user.id}>{user.username} - {user.email}</li>
              ))}
            </ul>
          </div>
        );
      case "vocabulary":
        return (
          <div>
            <h2>Quản lý từ vựng</h2>
            <ul>
              {data.map((vocab: any) => (
                <li key={vocab.id}>{vocab.word} - {vocab.example}</li>
              ))}
            </ul>
          </div>
        );
      case "progress":
        return (
          <div>
            <h2>Quản lý tiến trình học</h2>
            <ul>
              {data.map((progress: any) => (
                <li key={progress.id}>
                  User ID: {progress.user.id}, Level: {progress.level}, Next Review: {progress.nextReviewDate}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 font-bold text-lg">Admin Panel</div>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection("users")}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
              activeSection === "users" ? "bg-gray-700" : ""
            }`}
          >
            Quản lý người dùng
          </button>
          <button
            onClick={() => setActiveSection("vocabulary")}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
              activeSection === "vocabulary" ? "bg-gray-700" : ""
            }`}
          >
            Quản lý từ vựng
          </button>
          <button
            onClick={() => setActiveSection("progress")}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
              activeSection === "progress" ? "bg-gray-700" : ""
            }`}
          >
            Quản lý tiến trình học
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Admin;