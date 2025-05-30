"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RangeSlider } from "../ui/RangeSlider";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

// Chest Pain Phase 1 - Pain Level Assessment (immediately routes to emergency)
export default function ChestPhase1() {
  const { setPainScore, setPriority, setRoute, goBack } = useTriageContext();
  const [painLevel, setPainLevel] = useState(1);

  // Handle continue button - Chest pain always goes to emergency
  const handleContinue = () => {
    // Save the pain score
    setPainScore("chest", painLevel);

    // Set priority 1 for chest pain
    setPriority(1);

    // All chest pain goes directly to emergency regardless of score
    setRoute({ symptom: "chest", phase: "emergency" });
  };

  // Handle back button
  const handleBack = () => {
    goBack();
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Chest Pain Assessment</h2>

        <Alert
          type="error"
          title="Emergency"
          message="Chest pain requires immediate medical attention. Medical staff will be notified after this step."
        />

        <div className="space-y-6 mt-6">
          <RangeSlider
            min={1}
            max={10}
            value={painLevel}
            onChange={setPainLevel}
            label="On a scale of 1 to 10, how severe is your chest pain?"
          />

          <div className="flex justify-between mt-6">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button variant="danger" onClick={handleContinue}>
              Notify Medical Staff
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}