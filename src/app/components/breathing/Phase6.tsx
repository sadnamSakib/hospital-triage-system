"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";

// Breathing Difficulty Phase 6 - Common/Duration Questions
export default function BreathingPhase6() {
  const { addResponse, calculatePriority, nextPhase, goBack } =
    useTriageContext();
  const [difficultyConstant, setDifficultyConstant] = useState("no");
  const [difficultyDuration, setDifficultyDuration] = useState("day");

  // Handle continue button
  const handleContinue = () => {
    // Save all responses
    addResponse({ id: "painConstant", answer: difficultyConstant === "yes" });
    addResponse({ id: "painDuration", answer: difficultyDuration });

    // Calculate final priority with all factors
    calculatePriority();

    // Proceed to final priority calculation and results
    nextPhase();
  };

  // Handle back button
  const handleBack = () => {
    goBack();
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Breathing Difficulty - Additional Information
        </h2>

        <div className="space-y-6">
          <RadioGroup
            label="How long have you been experiencing this breathing difficulty?"
            name="difficultyDuration"
            value={difficultyDuration}
            onChange={setDifficultyDuration}
            options={[
              { value: "hour", label: "Within the last hour" },
              { value: "day", label: "Within the last day" },
              { value: "week", label: "Within the last week" },
              { value: "longer", label: "Longer than a week" },
            ]}
          />

          <RadioGroup
            label="Right now, does the breathing difficulty come and go, or is it constant?"
            name="difficultyConstant"
            value={difficultyConstant}
            onChange={setDifficultyConstant}
            options={[
              { value: "yes", label: "Constant" },
              { value: "no", label: "Comes and goes" },
            ]}
          />

          <div className="flex justify-between mt-6">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleContinue}>Submit</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
