import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const learningModes = [
  { value: "traditional", label: "Truyền thống" },
  { value: "flashcard", label: "Flashcard" },
];

export function ModeSelect() {
  const [selectedMode, setSelectedMode] = useState(learningModes[0]);
  const [message, setMessage] = useState("");

  const handleModeChange = async (mode) => {
    setSelectedMode(mode);
    console.log(`Selected mode: ${mode.label}`);
    try {
      const response = await fetch("http://localhost:9090/api/learning-mode/set", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ mode: mode.value }),
      });
      const result = await response.text();
      setMessage(result); // Display the backend response
    } catch (error) {
      console.error("Error updating learning mode:", error);
      setMessage("Failed to update learning mode.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-medium text-gray-700">Chọn chế độ học</h2>
      <div className="flex gap-4">
        {learningModes.map((mode) => (
          <Button
            key={mode.value}
            variant={selectedMode.value === mode.value ? "default" : "outline"}
            onClick={() => handleModeChange(mode)}
            className={`px-6 py-2 ${
              selectedMode.value === mode.value ? "bg-blue-500 text-white" : ""
            }`}
          >
            {mode.label}
          </Button>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Bạn đã chọn: <span className="font-medium">{selectedMode.label}</span>
      </p>
      {message && <p className="text-sm text-gray-500 mt-2">{message}</p>}
    </div>
  );
}