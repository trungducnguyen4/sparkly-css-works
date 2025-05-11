import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const learningModes = [
  { value: "traditional", label: "Truyền thống" },
  { value: "flashcard", label: "Flashcard" },
];

export function ModeSelect() {
  const [selectedMode, setSelectedMode] = useState(learningModes[0]);

  const handleModeChange = async (mode) => {
    setSelectedMode(mode);
    console.log(`Selected mode: ${mode.label}`);

    // Retrieve user from localStorage
    const userString = localStorage.getItem("user");
    if (!userString) {
      console.error("User not found in localStorage");
      return;
    }

    const user = JSON.parse(userString);
    if (!user?.username) {
      console.error("Username not found in localStorage");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/learning-mode/set", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          mode: mode.value,
          username: user.username,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        console.log("Server response:", result);

        // Update learningMode in localStorage
        const updatedUser = { ...user, learningMode: mode.value };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        console.log("Updated user in localStorage:", updatedUser);
      } else {
        const errorText = await response.text();
        console.error("Failed to update learning mode on the server:", errorText);
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error updating learning mode:", error);
      alert(`Error: ${error.message}`);
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
            aria-pressed={selectedMode.value === mode.value}
          >
            {mode.label}
          </Button>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Bạn đã chọn: <span className="font-medium">{selectedMode.label}</span>
      </p>
    </div>
  );
}