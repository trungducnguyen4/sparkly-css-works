import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WordBar from "./WordBar";

interface VocabDay {
  level: number;
  count: number;
}

const VocabChart: React.FC = () => {
  const [data, setData] = useState<VocabDay[]>([]);
  const [maxCount, setMaxCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user?.id) {
          console.error("User not logged in");
          return;
        }

        const response = await fetch(
          `http://localhost:9090/api/learning-progress/levels/${user.id}`
        );
        if (response.ok) {
          const result = await response.json();
          setData(result);

          // Determine the maximum count for scaling the chart
          const max = Math.max(...result.map((item: VocabDay) => item.count));
          setMaxCount(max);
        } else {
          console.error("Failed to fetch learning progress data");
        }
      } catch (error) {
        console.error("Error fetching learning progress data:", error);
      }
    };

    fetchData();
  }, []);

  const getBarColor = (index: number) => {
    const colors = [
      "bg-red-500", // Level 1
      "bg-yellow-500", // Level 2
      "bg-blue-500", // Level 3
      "bg-purple-500", // Level 4
      "bg-green-500", // Level 5
    ];
    return colors[index] || "bg-gray-500";
  };

  const completeWord = async (topicId: number, wordId: number) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user?.id) {
        console.error("User not logged in");
        return;
      }

      const response = await fetch(
        `http://localhost:9090/api/progress/learn/${topicId}/words/${wordId}?userId=${user.id}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        console.log("Word learning completed successfully");
      } else {
        console.error("Failed to complete word learning");
      }
    } catch (error) {
      console.error("Error completing word learning:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Chuẩn bị ôn tập:{" "}
          <span className="text-mochi-yellow">
            {data.reduce((sum, item) => sum + item.count, 0)}
          </span>{" "}
          từ
        </h3>
      </div>

      {/* <div className="flex justify-between items-end">
        {data.map((item, index) => (
          <WordBar
            key={item.level}
            day={item.level} // Use level as the day
            count={item.count}
            max={maxCount}
            color={getBarColor(index)}
            isActive={index === 4} // Highlight the last bar
            // Ensure the onClick handler is properly passed and functional
            onClick={() => {
              console.log(`Clicked on level ${item.level}`);
              completeWord(item.level, index + 1); // Adjust arguments as needed
            }}
          />
        ))}
      </div> */}

      <div className="mt-6 flex justify-center">
        <button className="mochi-button" onClick={() => navigate("/review")}>
          Ôn tập ngay
        </button>
      </div>
    </div>
  );
};

export default VocabChart;