// components/common/CompleteScreen.tsx
"use client";

import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useTriageContext } from "../../context/TriageContext";

export default function CompleteScreen() {
  const { reset } = useTriageContext();

  const handleRestart = () => {
    reset();
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Assessment Complete
        </h2>

        <div className="text-center mb-6">
          <p className="mb-4">
            Based on the information provided, you have not indicated any urgent
            symptoms.
          </p>
          <p>
            If you are still concerned about your health, please speak with a
            healthcare provider.
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleRestart}>Start New Assessment</Button>
        </div>
      </Card>
    </div>
  );
}
