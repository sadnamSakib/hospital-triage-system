"use client";

import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

export default function EmergencyScreen() {
  const { state, reset } = useTriageContext();

  // Get appropriate emergency message based on the symptom
  const getEmergencyMessage = () => {
    switch (state.symptom) {
      case "chest":
        return "You've reported chest pain, which requires immediate medical attention.";
      case "breathing":
        return state.isPassingOut
          ? "You've reported severe breathing difficulty with risk of passing out, which requires immediate medical attention."
          : "You've reported significant breathing difficulty, which requires immediate medical attention.";
      case "headache":
        return "You've reported a severe headache that requires immediate medical assessment.";
      case "stomach":
        return "You've reported severe abdominal pain that requires immediate medical attention.";
      default:
        return "Your symptoms require immediate medical attention.";
    }
  };

  // Handle restart button
  const handleRestart = () => {
    reset();
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-red-50">
      <Card className="max-w-lg w-full border-l-4 border-red-600">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          Emergency: Medical Staff Will Be Notified
        </h2>

        <Alert
          type="error"
          title="Urgent Medical Attention Required"
          message={getEmergencyMessage()}
        />

        <div className="mt-6">
          <p className="font-medium text-xl">Priority Level: {state.currentPriority || 1} (Highest)</p>
          
          {state.userInfo && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md">
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

          <div className="mt-4 bg-gray-100 p-4 rounded-md">
            <p className="font-medium mb-2">Reported Symptom:</p>
            <p>
              {state.symptom === "headache" && "Headache"}
              {state.symptom === "chest" && "Chest Pain"}
              {state.symptom === "stomach" && "Stomach Pain"}
              {state.symptom === "breathing" && "Breathing Difficulty"}

              {state.symptom !== "none" && state.painScore > 0 &&
                ` (Severity: ${state.painScore}/10)`}
            </p>
            
            {/* Display key responses */}
            {state.responses.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Key Information:</p>
                <ul className="list-disc ml-5">
                  {state.responses.map((response, index) => {
                    // Only show boolean true responses or ones with meaningful values
                    if (
                      (typeof response.answer === "boolean" && response.answer) ||
                      (typeof response.answer === "string" &&
                        response.answer !== "no" &&
                        response.answer.length > 0)
                    ) {
                      return (
                        <li key={index}>
                          {response.id}:{" "}
                          {typeof response.answer === "boolean"
                            ? "Yes"
                            : typeof response.answer === "string"
                            ? response.answer
                            : JSON.stringify(response.answer)}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-red-700 font-bold mb-4 text-xl">
            Please remain seated. Medical staff will attend to you shortly.
          </p>
          <Button variant="danger" onClick={handleRestart} fullWidth>
            Complete & Restart
          </Button>
        </div>
      </Card>
    </div>
  );
}