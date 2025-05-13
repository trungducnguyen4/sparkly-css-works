import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx";

const AdminVocab = () => {
  const [data, setData] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchData = async () => {
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      const response = await axios.get("http://localhost:9090/api/admin/vocabulary", {
        headers: { Authorization: `Basic ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching vocabulary data:", error);
    }
  };

  const fetchTopics = async () => {
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      const response = await axios.get("http://localhost:9090/api/topics", {
        headers: { Authorization: `Basic ${token}` },
      });
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTopics();
  }, []);

  const handleAdd = () => {
    setModalData({ word: "", example: "", sound: "", translate: "", topic: null });
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
      await axios.delete(`http://localhost:9090/api/admin/vocabulary/${deleteId}`, {
        headers: { Authorization: `Basic ${token}` },
      });
      setData((prevData) => prevData.filter((vocab: any) => vocab.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting vocabulary:", error);
    }
  };

  const saveModalData = async () => {
    const username = "admin";
    const password = "1";
    const token = btoa(`${username}:${password}`);

    try {
      const payload = {
        word: modalData.word,
        example: modalData.example,
        sound: modalData.sound,
        translate: modalData.translate,
        topicId: modalData.topic?.id || null,
      };

      if (modalData.id) {
        await axios.put(`http://localhost:9090/api/admin/vocabulary/${modalData.id}`, payload, {
          headers: { Authorization: `Basic ${token}` },
        });
      } else {
        await axios.post("http://localhost:9090/api/admin/vocabulary", payload, {
          headers: { Authorization: `Basic ${token}` },
        });
      }

      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error saving vocabulary:", error);
    }
  };

  const handleExport = async (format: string) => {
    try {
      if (format === "pdf") {
        const doc = new jsPDF();
        doc.text("Vocabulary Table", 14, 10);
        autoTable(doc, {
          head: [["Word", "Example", "Sound", "Translate", "Topic"]],
          body: data.map((vocab: any) => [
            vocab.word,
            vocab.example,
            vocab.sound,
            vocab.translate,
            vocab.topic?.name || "N/A",
          ]),
        });
        doc.save("vocabulary.pdf");
      } else if (format === "word") {
        const tableRows = data.map(
          (vocab: any) =>
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph(vocab.word)] }),
                new TableCell({ children: [new Paragraph(vocab.example)] }),
                new TableCell({ children: [new Paragraph(vocab.sound)] }),
                new TableCell({ children: [new Paragraph(vocab.translate)] }),
                new TableCell({ children: [new Paragraph(vocab.topic?.name || "N/A")] }),
              ],
            })
        );

        const doc = new Document({
          sections: [
            {
              children: [
                new Paragraph({
                  children: [new TextRun({ text: "Vocabulary Table", bold: true, size: 28 })],
                }),
                new Table({
                  rows: [
                    new TableRow({
                      children: [
                        new TableCell({ children: [new Paragraph("Word")] }),
                        new TableCell({ children: [new Paragraph("Example")] }),
                        new TableCell({ children: [new Paragraph("Sound")] }),
                        new TableCell({ children: [new Paragraph("Translate")] }),
                        new TableCell({ children: [new Paragraph("Topic")] }),
                      ],
                    }),
                    ...tableRows,
                  ],
                }),
              ],
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, "vocabulary.docx");
      }
    } catch (error) {
      console.error(`Error exporting to ${format.toUpperCase()}:`, error);
    }
  };

  return (
    <div>
      <h2>Quản lý từ vựng</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => handleExport("pdf")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
        >
          Export to PDF
        </button>
        <button
          onClick={() => handleExport("word")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Export to Word
        </button>
      </div>
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">
              {modalData.id ? "Edit Vocabulary" : "Add Vocabulary"}
            </h2>
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
              onChange={(e) => {
                const selectedId = parseInt(e.target.value);
                const selectedTopic = topics.find((topic) => topic.id === selectedId);
                setModalData({ ...modalData, topic: selectedTopic });
              }}
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
    </div>
  );
};

export default AdminVocab;
