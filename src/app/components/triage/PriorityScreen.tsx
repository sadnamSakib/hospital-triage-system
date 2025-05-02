"use client";
import React from "react";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Alert } from "@/app/components/ui/Alert";
import { useTriageContext } from "@/app/context/TriageContext";

export function PriorityScreen() {
  const { state, reset } = useTriageContext();

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

  const getPriorityColor = () => {
    switch (state.currentPriority) {
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "green";
      case 5:
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Triage Complete</h2>

        <Alert
          type="info"
          title={`Priority Level: ${state.currentPriority}`}
          message={getPriorityText()}
        />

        <div className="mt-6">
          <p className="mb-4">
            Based on your symptoms, you have been assigned a priority level of{" "}
            {state.currentPriority}.
          </p>

          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Summary:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {state.selectedAreas.map((area) => (
                <li key={area}>
                  {area.charAt(0).toUpperCase() + area.slice(1)}:
                  {area !== "breathing" ? " Pain level " : " Difficulty level "}
                  {state.painScores[area]}/10
                </li>
              ))}
            </ul>
          </div>

          {state.userInfo && (
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <p>
                <strong>Name:</strong> {state.userInfo.name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {state.userInfo.dateOfBirth}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="font-medium mb-4">
            Please take a seat in the waiting area. A healthcare professional
            will call you shortly.
          </p>
          <Button onClick={reset} fullWidth>
            Start New Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
}
