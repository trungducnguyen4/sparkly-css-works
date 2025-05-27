import * as React from "react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import axios from "axios";

export default function ReviewInterface() {
  const [userInput, setUserInput] = React.useState("");
  const [question, setQuestion] = React.useState<string | null>(null);
  const [wordId, setWordId] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [feedback, setFeedback] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState<string | null>(null);

  // Lấy username từ localStorage
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.username) {
      setUsername(user.username);
    } else {
      setUsername(null);
    }
  }, []);

  // Gọi API lấy câu hỏi sau khi có username
  React.useEffect(() => {
    if (username) {
      fetchQuestion();
    }
  }, [username]);

  const fetchQuestion = async () => {
    setLoading(true);
    if (!username) {
      console.error("Username is missing. Please log in.");
      setQuestion("Vui lòng đăng nhập để tiếp tục.");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching question for username:", username); // Debug
      const response = await axios.get(
        "http://localhost:9090/api/spaced-repetition/get-question",
        { params: { username } }
      );

      const { word, example, id } = response.data;

      const regex = new RegExp(`\\b${word}\\b`, "gi");
      const formattedQuestion = example.replace(regex, "________");

      setQuestion(formattedQuestion);
      setWordId(id);
    } catch (error) {
      console.error("Error fetching question:", error.response?.data || error.message);
      if (error.response?.status === 400) {
        setQuestion("bạn đã kiểm tra hết từ cần ôn tập");
      } else if (error.response?.status === 404) {
        setQuestion("Không có từ nào cần ôn hôm nay.");
      } else {
        setQuestion("Đã xảy ra lỗi khi tải câu hỏi.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleCheckAnswer = async () => {
    setFeedback(null);

    if (!username || !wordId) {
      setFeedback("Vui lòng đăng nhập để tiếp tục.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9090/api/spaced-repetition/check-answer",
        null,
        {
          params: {
            username,
            wordId,
            userAnswer: userInput,
          },
        }
      );

      setFeedback(response.data); // Display feedback (e.g., "Correct answer!" or "Incorrect answer!")

      // Fetch the next question after a short delay to allow the user to see the feedback
      setTimeout(() => {
        fetchQuestion();
        setUserInput(""); // Clear the input field for the next question
      }, 1000); // 1-second delay
    } catch (error) {
      console.error("Error checking answer:", error);
      setFeedback("Đã xảy ra lỗi khi kiểm tra câu trả lời.");

      // Fetch the next question even if there's an error
      setTimeout(() => {
        fetchQuestion();
        setUserInput(""); // Clear the input field for the next question
      }, 1000); // 1-second delay
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Đang tải dữ liệu ôn tập...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="flex flex-col items-center gap-6 p-6">
        <h2 className="text-lg font-medium text-gray-700">
          Chọn từ thích hợp điền vào chỗ trống
        </h2>

        <div className="border border-green-500 rounded-md p-4 text-center text-gray-700 bg-green-50">
          <span
            className="text-green-600 font-medium"
            dangerouslySetInnerHTML={{ __html: question || "" }}
          />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-md">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Nhập từ của bạn"
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col items-center gap-2 mt-6 w-full max-w-md">
          <Button
            variant="outline"
            className="w-full py-2"
            disabled={!userInput.trim()}
            onClick={handleCheckAnswer}
          >
            Kiểm tra
          </Button>

          {feedback && (
            <p
              className={`mt-4 text-sm font-semibold ${
                feedback === "Correct answer!" ? "text-green-600" : "text-red-600"
              }`}
            >
              {feedback === "Correct answer!" ? "Chính xác!" : feedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}