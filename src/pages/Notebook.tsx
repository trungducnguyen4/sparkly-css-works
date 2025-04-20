import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

const Notebook = () => {
  const [vocabulary, setVocabulary] = useState([]); // List of all vocabulary
  const [filteredVocabulary, setFilteredVocabulary] = useState([]); // Filtered list
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [username, setUsername] = useState("exampleUser"); // Replace with actual username from logger or auth
  const itemsPerPage = 10; // Items per page

  // Fetch vocabulary data based on username
  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const response = await fetch(`/api/notebooks?username=${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch vocabulary");
        }
        const data = await response.json();
        setVocabulary(data);
        setFilteredVocabulary(data);
      } catch (error) {
        console.error("Error fetching vocabulary:", error);
      }
    };

    if (username) {
      fetchVocabulary();
    }
  }, [username]);

  // Filter vocabulary based on search term
  useEffect(() => {
    const filtered = vocabulary.filter((item) =>
      item.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVocabulary(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchTerm, vocabulary]);

  // Pagination logic
  const totalPages = Math.ceil(filteredVocabulary.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredVocabulary.slice(startIndex, startIndex + itemsPerPage);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-mochi-blue mb-6">Sổ tay từ vựng yêu thích</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Tìm kiếm từ vựng..."
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Vocabulary List */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Từ</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Ý nghĩa</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 px-4 py-2">{item.word}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notebook;