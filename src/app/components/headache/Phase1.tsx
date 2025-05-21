"use client";

import React, { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RangeSlider } from "../ui/RangeSlider";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

// Headache Phase 1 - Pain Level Assessment
export default function HeadachePhase1() {
  const { setPainScore, setPriority, setRoute, nextPhase, goBack } =
    useTriageContext();
  const [painLevel, setPainLevel] = useState(1);
  const [showWarning, setShowWarning] = useState(false);

  // Update warning visibility when pain level changes
  useEffect(() => {
    setShowWarning(painLevel >= 7);
  }, [painLevel]);

  // Handle continue button
  const handleContinue = () => {
    // Save the pain score
    setPainScore(painLevel);

    // Check for emergency condition
    if (painLevel >= 7) {
      // Set priority to 2 for severe pain
      setPriority(2);

      // Route to emergency immediately for severe pain
      setRoute({ symptom: "headache", phase: "emergency" });
    } else {
      // Continue to next phase for less severe pain
      nextPhase();
    }
  };

  // Handle back button
  const handleBack = () => {
    goBack();
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Headache Assessment - Pain Level
        </h2>
        <div className="space-y-6">
          <RangeSlider
            min={1}
            max={10}
            value={painLevel}
            onChange={setPainLevel}
            label="On a scale of 1 to 10, how severe is your headache?"
          />

          {showWarning && (
            <Alert
              type="warning"
              title="Severe Pain"
              message="You've indicated severe pain which may require urgent attention."
            />
          )}

          <div className="flex justify-between mt-6">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button 
              onClick={handleContinue}
              variant={painLevel >= 7 ? "danger" : "primary"}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}