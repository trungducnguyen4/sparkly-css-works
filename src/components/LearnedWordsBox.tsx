import React, { useEffect } from "react";
import axios from "axios";
import { useLearnedWords } from "@/contexts/LearnedWordsContext";

const LearnedWordsBox: React.FC = () => {
  const { totalWordsLearned, setTotalWordsLearned } = useLearnedWords();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.email) {
      const fetchLearnedWords = async (userEmail: string) => {
        try {
          const response = await axios.get("http://localhost:9090/api/users/learned-words", {
            params: { email: userEmail },
          });
          if (typeof response.data === "number") {
            setTotalWordsLearned(response.data);
          } else {
            console.error("Invalid data format from server.");
          }
        } catch (error: any) {
          console.error("Error fetching learned words:", error);
        }
      };

      fetchLearnedWords(user.email);
    }
  }, [setTotalWordsLearned]);

  return (
    <div className="fixed bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 w-64">
      <h3 className="text-lg font-bold mb-2">Từ đã học</h3>
      <p className="text-sm text-gray-700">
        Tổng số từ đã học: <span className="font-bold">{totalWordsLearned}</span>
      </p>
    </div>
  );
};

export default LearnedWordsBox;