import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUser = () => {
  const [data, setData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      const response = await axios.get("http://localhost:9090/api/admin/users", {
        headers: { Authorization: `Basic ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setModalData({
      email: "",
      username: "",
      learningMode: "",
      totalWordsLearned: 0,
      paid: false,
      isAdmin: false,
    });
    setShowModal(true);
  };

  const handleEdit = (id: string) => {
    const user = data.find((user: any) => user.id === id);
    setModalData(user);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      await axios.delete(`http://localhost:9090/api/admin/users/${deleteId}`, {
        headers: { Authorization: `Basic ${token}` },
      });
      setData((prevData) => prevData.filter((user: any) => user.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const saveModalData = async () => {
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      if (modalData.id) {
        await axios.put(`http://localhost:9090/api/admin/users/${modalData.id}`, modalData, {
          headers: { Authorization: `Basic ${token}` },
        });
      } else {
        await axios.post("http://localhost:9090/api/admin/users", modalData, {
          headers: { Authorization: `Basic ${token}` },
        });
      }

      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Learning Mode</th>
            <th className="border border-gray-300 px-4 py-2">Total Words Learned</th>
            <th className="border border-gray-300 px-4 py-2">Paid</th>
            <th className="border border-gray-300 px-4 py-2">Admin</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user: any) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.learningMode}</td>
              <td className="border border-gray-300 px-4 py-2">{user.totalWordsLearned}</td>
              <td className="border border-gray-300 px-4 py-2">{user.paid ? "Yes" : "No"}</td>
              <td className="border border-gray-300 px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="text-blue-500 underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-500 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAdd}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Add New User
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">
              {modalData.id ? "Edit User" : "Add User"}
            </h2>
            <input
              type="text"
              placeholder="Email"
              value={modalData.email}
              onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Username"
              value={modalData.username}
              onChange={(e) => setModalData({ ...modalData, username: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <select
              value={modalData.learningMode || ""}
              onChange={(e) => setModalData({ ...modalData, learningMode: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            >
              <option value="" disabled>
                Select Learning Mode
              </option>
              <option value="traditional">Traditional</option>
              <option value="flashcard">Flashcard</option>
            </select>
            <input
              type="number"
              placeholder="Total Words Learned"
              value={modalData.totalWordsLearned}
              onChange={(e) =>
                setModalData({ ...modalData, totalWordsLearned: parseInt(e.target.value) })
              }
              className="w-full mb-2 p-2 border rounded"
            />
            <div className="mb-2">
              <label className="mr-2">Paid:</label>
              <input
                type="checkbox"
                checked={modalData.paid}
                onChange={(e) => setModalData({ ...modalData, paid: e.target.checked })}
              />
            </div>
            <div className="mb-4">
              <label className="mr-2">Admin:</label>
              <input
                type="checkbox"
                checked={modalData.isAdmin}
                onChange={(e) => setModalData({ ...modalData, isAdmin: e.target.checked })}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={saveModalData}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUser;
