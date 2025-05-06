"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";

// Breathing Difficulty Phase 4 - Asthma Assessment
export default function BreathingPhase4() {
  const { addResponse, nextPhase, goBack } = useTriageContext();
  const [hasAsthma, setHasAsthma] = useState("no");

  // Handle continue button
  const handleContinue = () => {
    // Save response
    addResponse({ id: "hasAsthma", answer: hasAsthma === "yes" });

    // Continue to next phase for pregnancy assessment
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
            label="Do you have asthma?"
            name="hasAsthma"
            value={hasAsthma}
            onChange={setHasAsthma}
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
