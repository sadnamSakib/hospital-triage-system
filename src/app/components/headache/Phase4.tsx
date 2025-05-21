"use client";

import React, { useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

// Headache Phase 4 - Initial Priority Assignment
export default function HeadachePhase4() {
  const { state, calculatePriority, nextPhase, goBack } = useTriageContext();

  // Calculate initial priority when component loads
  useEffect(() => {
    calculatePriority();
  }, []);

  // Handle continue button
  const handleContinue = () => {
    // If priority is high (1 or 2), route to emergency
    if (state.currentPriority && state.currentPriority <= 2) {
      nextPhase();
    } else {
      // Otherwise proceed to phase 5
      nextPhase();
    }
  };

  // Handle back button
  const handleBack = () => {
    goBack();
  };

  // Display appropriate alert based on priority
  const getPriorityAlert = () => {
    if (!state.currentPriority) return null;

    if (state.currentPriority <= 2) {
      return (
        <Alert
          type="warning"
          title="High Priority"
          message="Based on your reported pain level, your headache requires prompt attention."
        />
      );
    } else if (state.currentPriority === 3) {
      return (
        <Alert
          type="info"
          title="Medium Priority"
          message="Your headache has been assessed as requiring standard attention."
        />
      );
    } else {
      return (
        <Alert
          type="info"
          title="Routine Priority"
          message="Your headache has been assessed as routine priority."
        />
      );
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Headache Assessment - Initial Priority
        </h2>

        {getPriorityAlert()}

        <div className="bg-gray-100 p-4 rounded-md mt-6 mb-6">
          <h3 className="font-medium mb-2">Initial Assessment:</h3>
          <p>
            <strong>Pain Level:</strong> {state.painScore}/10
          </p>
          <p>
            <strong>Initial Priority:</strong>{" "}
            {state.currentPriority || "Not yet determined"}
          </p>
        </div>

        <p className="mb-4">
          We'll now ask you some additional questions to better assess your
          condition and finalize your priority level.
        </p>

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
