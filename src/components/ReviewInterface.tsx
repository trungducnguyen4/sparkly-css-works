import * as React from "react";
import { Button } from "@/components/ui/button";

export default function ReviewInterface() {
  const [userInput, setUserInput] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h2 className="text-lg font-medium text-gray-600">
        Chọn từ thích hợp điền vào chỗ trống
      </h2>
      <div className="border border-green-500 rounded-md p-4 text-center text-gray-700">
        <span className="text-green-600 font-medium">I want to __________ to you.</span>
      </div>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Nhập câu trả lời của bạn"
          className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex flex-col items-center gap-2 mt-6">
        <Button
          variant="outline"
          className="w-full max-w-md py-2"
          disabled={!userInput.trim()}
        >
          Kiểm tra
        </Button>
        <button className="text-sm text-gray-500 underline">
          Mình không nhớ từ này
        </button>
      </div>
    </div>
  );
}
