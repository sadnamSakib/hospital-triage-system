"use client";

import React, { useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

export default function PriorityScreen() {
  const { state, reset, calculatePriority } = useTriageContext();

  // Ensure priority is calculated when this screen loads
  useEffect(() => {
    if (!state.currentPriority) {
      calculatePriority();
    }
  }, []);

  const getPriorityText = () => {
    switch (state.currentPriority) {
      case 1:
        return "Immediate attention required";
      case 2:
        return "Very urgent - recommended wait time: 10 minutes";
      case 3:
        return "Urgent - recommended wait time: 30 minutes";
      case 4:
        return "Standard - recommended wait time: 1 hour";
      case 5:
        return "Non-urgent - recommended wait time: 2+ hours";
      default:
        return "Please wait to be called";
    }
  };

  const getAlertType = () => {
    switch (state.currentPriority) {
      case 2:
        return "warning";
      case 3:
        return "warning";
      case 4:
        return "info";
      case 5:
        return "info";
      default:
        return "info";
    }
  };

  const handleRestart = () => {
    reset();
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Triage Complete</h2>

        <Alert
          type={getAlertType()}
          title={`Priority Level: ${state.currentPriority}`}
          message={getPriorityText()}
        />

        <div className="mt-6">
          <p className="mb-4">
            Based on your symptoms, you have been assigned a priority level of{" "}
            {state.currentPriority}.
          </p>

          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Symptoms Summary:</h3>
            <p>
              {state.symptom === "headache" && "Headache"}
              {state.symptom === "chest" && "Chest Pain"}
              {state.symptom === "stomach" && "Stomach Pain"}
              {state.symptom === "breathing" && "Breathing Difficulty"}

              {state.symptom !== "none" &&
                state.painScore > 0 &&
                ` (Severity: ${state.painScore}/10)`}
            </p>

            {/* Display relevant responses */}
            <div className="mt-2">
              {state.responses.map((response, index) => {
                // Only display selected "true" responses or ones with meaningful values
                if (
                  (typeof response.answer === "boolean" && response.answer) ||
                  (typeof response.answer === "string" &&
                    response.answer !== "no" &&
                    response.answer.length > 0)
                ) {
                  return (
                    <p key={index}>
                      <strong>{response.id}:</strong>{" "}
                      {typeof response.answer === "boolean"
                        ? "Yes"
                        : typeof response.answer === "string"
                        ? response.answer
                        : JSON.stringify(response.answer)}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {state.userInfo && (
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <p>
                <strong>Name:</strong> {state.userInfo.name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {state.userInfo.dateOfBirth}
              </p>
              <p>
                <strong>Sex:</strong> {state.userInfo.sex}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="font-medium mb-4">
            Please take a seat in the waiting area. A healthcare professional
            will call you based on your priority level.
          </p>
          <Button onClick={handleRestart} fullWidth>
            Complete &amp; Start New Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
}
