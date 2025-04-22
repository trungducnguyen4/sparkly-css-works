import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>("users");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // For Add/Edit modal
  const [modalData, setModalData] = useState<any>(null); // Data for Add/Edit modal
  const [deleteId, setDeleteId] = useState<string | null>(null); // For Delete confirmation
  const [topics, setTopics] = useState<any[]>([]); // State for topics
  const navigate = useNavigate();

  const fetchData = async () => {
    console.log(`Fetching data for section: ${activeSection}...`);
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      let response;
      switch (activeSection) {
        case "users":
          response = await axios.get("http://localhost:9090/api/admin/users", {
            headers: { Authorization: `Basic ${token}` },
          });
          break;
        case "vocabulary":
          response = await axios.get("http://localhost:9090/api/admin/vocabulary", {
            headers: { Authorization: `Basic ${token}` },
          });
          break;
        case "progress":
          response = await axios.get("http://localhost:9090/api/admin/progress", {
            headers: { Authorization: `Basic ${token}` },
          });
          break;
        default:
          console.warn("Invalid section selected");
          return;
      }
      console.log(`Response received for section ${activeSection}:`, response.data);
      setData(response.data);
      setError(null);
    } catch (error: any) {
      console.error(`Error fetching data for section ${activeSection}:`, error);
      setError(
        error.response?.data?.message ||
          `Failed to fetch data for section ${activeSection}. Please try again later.`
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  useEffect(() => {
    const fetchTopics = async () => {
      const username = "admin";
      const password = "1";
      const token = btoa(`${username}:${password}`);

      try {
        const response = await axios.get("http://localhost:9090/api/topics", {
          headers: { Authorization: `Basic ${token}` },
        });
        setTopics(response.data); // Populate topics for dropdown
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleAdd = () => {
    if (activeSection === "users") {
      setModalData({
        email: "",
        username: "",
        learningMode: "",
        totalWordsLearned: 0,
        paid: false,
        isAdmin: false,
      });
    } else if (activeSection === "vocabulary") {
      setModalData({ word: "", example: "", sound: "", translate: "", topic: { id: "", name: "" } });
    }
    setShowModal(true);
  };

  const handleEdit = (id: string) => {
    const vocab = data.find((vocab: any) => vocab.id === id);
    setModalData(vocab);
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
      if (activeSection === "users") {
        // Delete user
        await axios.delete(`http://localhost:9090/api/admin/users/${deleteId}`, {
          headers: { Authorization: `Basic ${token}` },
        });
        console.log("User deleted successfully");
        setData((prevData: any) => prevData.filter((user: any) => user.id !== deleteId));
      } else if (activeSection === "vocabulary") {
        // Delete vocabulary
        await axios.delete(`http://localhost:9090/api/admin/vocabulary/${deleteId}`, {
          headers: { Authorization: `Basic ${token}` },
        });
        console.log("Vocabulary deleted successfully");
        setData((prevData: any) => prevData.filter((vocab: any) => vocab.id !== deleteId));
      }
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEditUser = (id: string) => {
    const user = data.find((user: any) => user.id === id);
    setModalData(user);
    setShowModal(true);
  };

  const handleDeleteUser = (id: string) => {
    setDeleteId(id);
  };

  const saveModalData = async () => {
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      if (activeSection === "users") {
        if (modalData.id) {
          // Edit existing user
          await axios.put(
            `http://localhost:9090/api/admin/users/${modalData.id}`,
            modalData,
            { headers: { Authorization: `Basic ${token}` } }
          );
          console.log("User updated successfully");
        } else {
          // Add new user
          await axios.post("http://localhost:9090/api/admin/users", modalData, {
            headers: { Authorization: `Basic ${token}` },
          });
          console.log("User added successfully");
        }
      } else if (activeSection === "vocabulary") {
        if (modalData.id) {
          // Edit existing vocabulary
          await axios.put(
            `http://localhost:9090/api/admin/vocabulary/${modalData.id}`,
            modalData,
            { headers: { Authorization: `Basic ${token}` } }
          );
          console.log("Vocabulary updated successfully");
        } else {
          // Add new vocabulary
          await axios.post("http://localhost:9090/api/admin/vocabulary", modalData, {
            headers: { Authorization: `Basic ${token}` },
          });
          console.log("Vocabulary added successfully");
        }
      }
      setShowModal(false);
      fetchData(); // Re-fetch data to update the list
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="text-red-500">
          <h2>Error</h2>
          <p>{`Error in section "${activeSection}": ${error}`}</p>
          <p>Please check the server logs or API response for more details.</p>
        </div>
      );
    }

    if (!data) return <div>Loading...</div>;

    switch (activeSection) {
      case "users":
        return (
          <div>
            <h2>Quản lý người dùng</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
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
                    <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.learningMode}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.totalWordsLearned}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.paid ? "Yes" : "No"}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEditUser(user.id)}
                        className="text-blue-500 underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
              Thêm người dùng
            </button>
          </div>
        );
      case "vocabulary":
        return (
          <div>
            <h2>Quản lý từ vựng</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Word</th>
                  <th className="border border-gray-300 px-4 py-2">Example</th>
                  <th className="border border-gray-300 px-4 py-2">Sound</th>
                  <th className="border border-gray-300 px-4 py-2">Translate</th>
                  <th className="border border-gray-300 px-4 py-2">Topic</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((vocab: any) => (
                  <tr key={vocab.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{vocab.word}</td>
                    <td className="border border-gray-300 px-4 py-2">{vocab.example}</td>
                    <td className="border border-gray-300 px-4 py-2">{vocab.sound}</td>
                    <td className="border border-gray-300 px-4 py-2">{vocab.translate}</td>
                    <td className="border border-gray-300 px-4 py-2">{vocab.topic?.name || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEdit(vocab.id)}
                        className="text-blue-500 underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vocab.id)}
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
              Add New Vocabulary
            </button>
          </div>
        );
      // case "progress":
      //   return (
      //     <div>
      //       <h2>Quản lý tiến trình học</h2>
      //       <ul>
      //         {data.map((progress: any) => (
      //           <li key={progress.id}>
      //             User ID: {progress.user.id}, Level: {progress.level}, Next Review:{" "}
      //             {progress.nextReviewDate}
      //           </li>
      //         ))}
      //       </ul>
      //     </div>
      //   );
      default:
        return (
          <div>
            <h2>404</h2>
            <p>Oops! Page not found</p>
            <button onClick={() => setActiveSection("users")} className="text-blue-500 underline">
              Return to Home
            </button>
          </div>
        );
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
          {/* <button
            onClick={() => setActiveSection("progress")}
            className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${
              activeSection === "progress" ? "bg-gray-700" : ""
            }`}
          >
            Quản lý tiến trình học
          </button> */}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {renderContent()}
        {showModal && activeSection === "users" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-lg font-bold mb-4">{modalData.id ? "Edit User" : "Add User"}</h2>
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
        {showModal && activeSection === "vocabulary" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-lg font-bold mb-4">{modalData.id ? "Edit Vocabulary" : "Add Vocabulary"}</h2>
              <input
                type="text"
                placeholder="Word"
                value={modalData.word}
                onChange={(e) => setModalData({ ...modalData, word: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Example"
                value={modalData.example}
                onChange={(e) => setModalData({ ...modalData, example: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Sound"
                value={modalData.sound}
                onChange={(e) => setModalData({ ...modalData, sound: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Translate"
                value={modalData.translate}
                onChange={(e) => setModalData({ ...modalData, translate: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              <select
                value={modalData.topic?.id || ""}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    topic: topics.find((topic: any) => topic.id === parseInt(e.target.value)),
                  })
                }
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="" disabled>
                  Select Topic
                </option>
                {topics.map((topic: any) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
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
              <p>Are you sure you want to delete this item?</p>
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
      </main>
    </div>
  );
};

export default Admin;