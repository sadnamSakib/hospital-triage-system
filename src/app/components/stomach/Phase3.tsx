"use client";

import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

// Stomach Pain Phase 3 - Determine symptom severity
export default function StomachPhase3() {
  const { state, setRoute, goBack } = useTriageContext();

  // Handle continue
  const handleContinue = () => {
    // If priority is 1, go to emergency
    if (state.currentPriority === 1) {
      setRoute({ symptom: "stomach", phase: "emergency" });
    } else {
      // Otherwise, proceed to phase 4
      setRoute({ symptom: "stomach", phase: "phase4" });
    }
  };

  // Handle back button
  const handleBack = () => {
    goBack();
  };

  // Get pain score from the correct place
  const painScore = state.painScores?.stomach || state.painScore;

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Stomach Pain Assessment - Severity
        </h2>

        <div className="mb-6">
          <Alert
            type="info"
            title="Stomach Pain Severity"
            message={`Your stomach pain severity is ${painScore}/10.`}
          />

          {painScore >= 7 && (
            <Alert
              type="warning"
              title="Warning"
              message="You have reported significant stomach pain. Further assessment is needed."
              className="mt-4"
            />
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="font-medium mb-2">Initial Assessment:</h3>
          <p>
            <strong>Pain Level:</strong> {painScore}/10
          </p>
          <p>
            <strong>Initial Priority:</strong>{" "}
            {state.currentPriority || "Not yet determined"}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </Card>
    </div>
  );
}