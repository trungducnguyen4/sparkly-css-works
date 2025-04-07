import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <Button
        variant="default"
        onClick={() => navigate("/review")}
        className="px-6 py-2"
      >
        Ôn tập
      </Button>
    </div>
  );
}