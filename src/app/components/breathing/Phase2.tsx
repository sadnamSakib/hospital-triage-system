"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";

// Breathing Difficulty Phase 2 - Cough Assessment
export default function BreathingPhase2() {
  const { addResponse, nextPhase, goBack } = useTriageContext();
  const [hasCough, setHasCough] = useState("no");

  // Handle continue button
  const handleContinue = () => {
    // Save response
    addResponse({ id: "hasCough", answer: hasCough === "yes" });

    // Continue to next phase for cold/fever assessment
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
          Breathing Difficulty Assessment
        </h2>

        <div className="space-y-6">
          <RadioGroup
            label="Do you have a cough?"
            name="hasCough"
            value={hasCough}
            onChange={setHasCough}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          <div className="flex justify-between mt-6">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleContinue}>Continue</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
