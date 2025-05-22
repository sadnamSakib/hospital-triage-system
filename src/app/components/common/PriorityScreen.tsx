"use client";

import React, { useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

export default function PriorityScreen() {
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

  const getAlertType = () => {
    switch (state.currentPriority) {
      case 1:
        return "error";
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

        {/* Diagnosis and Token Section */}
        <div className="bg-green-100 p-4 rounded-md mb-4 text-center">
          <h3 className="font-medium mb-2">Diagnosis:</h3>
          <p className="text-lg font-semibold">{state.diagnosis || "Not determined"}</p>
          <h3 className="font-medium mt-4 mb-2">Your Waiting Token:</h3>
          <p className="text-2xl font-bold">{state.token || "-"}</p>
        </div>

        <div className="mt-6">
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Symptoms Summary:</h3>
            <p>
              {state.symptom === "headache" && "Headache"}
              {state.symptom === "chest" && "Chest Pain"}
              {state.symptom === "stomach" && "Stomach Pain"}
              {state.symptom === "breathing" && "Breathing Difficulty"}

              {state.symptom !== "none" && state.painScore > 0 &&
                ` (Severity: ${state.painScore}/10)`}
            </p>

            {/* Display relevant responses */}
            <div className="mt-2">
              {state.responses.length > 0 && (
                <>
                  <p className="font-medium">Key Information:</p>
                  <ul className="list-disc ml-5">
                    {state.responses.map((response, index) => {
                      // Only display selected "true" responses or ones with meaningful values
                      if (
                        (typeof response.answer === "boolean" && response.answer) ||
                        (typeof response.answer === "string" &&
                          response.answer !== "no" &&
                          response.answer.length > 0)
                      ) {
                        return (
                          <li key={index}>
                            <strong>{response.id}:</strong>{" "}
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
                </>
              )}
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
            Please take a seat in the waiting area. You will be called by your token number: <span className="font-bold">{state.token || "-"}</span>.
          </p>
          <Button onClick={handleRestart} fullWidth>
            Complete &amp; Start New Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
}