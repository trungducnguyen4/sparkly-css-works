import React, { useEffect, useState } from "react";
import axios from "axios";

const LearnedWordsBox: React.FC = () => {
  const [totalWordsLearned, setTotalWordsLearned] = useState<number>(0);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get the user's email from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.email) {
      setEmail(user.email);
    }

    // Fetch total words learned from the backend
    const fetchLearnedWords = async (userEmail: string) => {
      try {
        const response = await axios.get("http://localhost:9090/api/users/learned-words", {
          params: { email: userEmail },
        });
        if (typeof response.data === "number") {
          setTotalWordsLearned(response.data); // Use the total words learned from the backend
        } else {
          setError("Dữ liệu không hợp lệ từ máy chủ.");
        }
      } catch (error: any) {
        console.error("Error fetching learned words:", error);
        if (error.response?.status === 404) {
          setError("Không tìm thấy dữ liệu từ vựng đã học.");
        } else {
          setError("Đã xảy ra lỗi khi tải dữ liệu.");
        }
      }
    };

    if (user && user.email) {
      fetchLearnedWords(user.email);
    }
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 w-64">
      <h3 className="text-lg font-bold mb-2">Từ đã học</h3>
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <p className="text-sm text-gray-700">
          Tổng số từ đã học: <span className="font-bold">{totalWordsLearned}</span>
        </p>
      )}
    </div>
  );
};

export default LearnedWordsBox;