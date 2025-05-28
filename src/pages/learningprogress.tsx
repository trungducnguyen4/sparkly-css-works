import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar"; // ✅ Thêm dòng này
import axios from "axios";

// Kiểu dữ liệu DTO nhận từ backend
type LearningProgressDTO = {
  id: number;
  level: number;
  correctStreak: number;
  nextReviewDate: string;
  userId: number;
  vocabularyId: number;
};

const LearningProgressPage: React.FC = () => {
  const [progressList, setProgressList] = useState<LearningProgressDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = progressList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(progressList.length / itemsPerPage);

  console.log("item hiện tại", currentItems);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.id) {
      console.log("🔍 Người dùng hiện tại đang truy cập có ID:", user.id);
      setUserId(user.id);
      axios
        .get<LearningProgressDTO[]>(
          `http://localhost:9090/api/progress/user/${user.id}`
        )
        .then((response) => {
          setProgressList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Lỗi khi tải dữ liệu:", error);
          setLoading(false);
        });
    } else {
      console.warn("Chưa đăng nhập hoặc thiếu thông tin người dùng.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar /> {/* ✅ Thêm dòng này để hiện thanh Navbar */}
      <div className="container mx-auto py-8 px-4">
        {loading ? (
          <p className="text-gray-600">Đang tải tiến độ học...</p>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Từ vựng ID</th>
                  <th className="border px-4 py-2">Level</th>
                  <th className="border px-4 py-2">Chuỗi đúng</th>
                  <th className="border px-4 py-2">Ngày ôn tập</th>
                  <th className="border px-4 py-2">User ID</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.id}</td>
                    <td className="border px-4 py-2">{item.vocabularyId}</td>
                    <td className="border px-4 py-2">{item.level}</td>
                    <td className="border px-4 py-2">{item.correctStreak}</td>
                    <td className="border px-4 py-2">{item.nextReviewDate}</td>
                    <td className="border px-4 py-2">{item.userId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Trước
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-mochi-yellow text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningProgressPage;
