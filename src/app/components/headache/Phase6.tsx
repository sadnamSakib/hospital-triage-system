// components/headache/Phase6.tsx
"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";

// Headache Phase 6 - Common questions for all symptoms
export default function HeadachePhase6() {
  const { addResponse, nextPhase, goBack } = useTriageContext();

  // State for common questions
  const [painConstant, setPainConstant] = useState("no");
  const [painDuration, setPainDuration] = useState("day");

  // Handle continue button
  const handleContinue = () => {
    // Save all responses
    addResponse({ id: "painConstant", answer: painConstant === "yes" });
    addResponse({ id: "painDuration", answer: painDuration });

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
          Headache Assessment - Additional Information
        </h2>

        <div className="space-y-6">
          <RadioGroup
            label="How long have you been experiencing this headache?"
            name="painDuration"
            value={painDuration}
            onChange={setPainDuration}
            options={[
              { value: "hour", label: "Within the last hour" },
              { value: "day", label: "Within the last day" },
              { value: "week", label: "Within the last week" },
              { value: "longer", label: "Longer than a week" },
            ]}
          />

          <RadioGroup
            label="Right now, does the pain come and go, or is it constant?"
            name="painConstant"
            value={painConstant}
            onChange={setPainConstant}
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
