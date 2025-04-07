import * as React from "react";
import { Button } from "@/components/ui/button";

const learningModes = [
  {
    value: "traditional",
    label: "Truyền thống",
  },
  {
    value: "flashcard",
    label: "Flashcard",
  },
];

export function ModeSelect() {
  const [selectedMode, setSelectedMode] = React.useState(learningModes[0]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-medium text-gray-700">Chọn chế độ học</h2>
      <div className="flex gap-4">
        {learningModes.map((mode) => (
          <Button
            key={mode.value}
            variant={selectedMode.value === mode.value ? "default" : "outline"}
            onClick={() => setSelectedMode(mode)}
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
    </div>
  );
}
