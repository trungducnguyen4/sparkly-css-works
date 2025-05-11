import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminTopic = () => {
  const [data, setData] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      const response = await axios.get("http://localhost:9090/api/admin/topics", {
        headers: { Authorization: `Basic ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching topic data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setModalData({
      name: "",
      description: "",
      image: "",
    });
    setShowModal(true);
  };

  const handleEdit = (id: string) => {
    const topic = data.find((topic: any) => topic.id === id);
    setModalData(topic);
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
      await axios.delete(`http://localhost:9090/api/admin/topics/${deleteId}`, {
        headers: { Authorization: `Basic ${token}` },
      });
      setData((prevData) => prevData.filter((topic: any) => topic.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const saveModalData = async () => {
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      if (modalData.id) {
        await axios.put(`http://localhost:9090/api/admin/topics/${modalData.id}`, modalData, {
          headers: { Authorization: `Basic ${token}` },
        });
      } else {
        await axios.post("http://localhost:9090/api/admin/topics", modalData, {
          headers: { Authorization: `Basic ${token}` },
        });
      }

      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving topic:", error);
    }
  };

  return (
    <div>
      <h2>Quản lý chủ đề</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((topic: any) => (
            <tr key={topic.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{topic.name}</td>
              <td className="border border-gray-300 px-4 py-2">{topic.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={topic.image} alt={topic.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(topic.id)}
                  className="text-blue-500 underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(topic.id)}
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
        Add New Topic
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">
              {modalData.id ? "Edit Topic" : "Add Topic"}
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={modalData.name}
              onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={modalData.description}
              onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={modalData.image}
              onChange={(e) => setModalData({ ...modalData, image: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
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
            <p>Are you sure you want to delete this topic?</p>
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

export default AdminTopic;
