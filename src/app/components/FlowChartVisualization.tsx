"use client";

import React, { useState } from "react";
import { useTriageContext } from "../context/TriageContext";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export function FlowChartVisualization() {
  const { state } = useTriageContext();
  const [isVisible, setIsVisible] = useState(false);

  // Toggle chart visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Get the current phase description
  const getPhaseDescription = () => {
    switch (state.phase) {
      case "start":
        return "Start Screen - Welcome to the triage system";
      case "basicInfo":
        return "Phase: Basic Information Collection";
      case "initialSymptoms":
        return "Phase: Initial Symptom Selection";
      case "phase1":
        return "Phase 1: Basic Information";
      case "phase2":
        return "Phase 2: Question Chain Selection";
      case "phase3":
        return "Phase 3: Determine Symptom Severity";
      case "phase4":
        return "Phase 4: Assign Initial Priority";
      case "phase5":
        return "Phase 5: Symptom-Specific Questions";
      case "phase6":
        return "Phase 6: Common Questions";
      case "emergency":
        return "Emergency: Priority 1 - Immediate Attention";
      case "priority":
        return "Priority Assignment - Final Triage Result";
      case "complete":
        return "Assessment Complete";
      default:
        return "Unknown Phase";
    }
  };

  // Get symptom description
  const getSymptomDescription = () => {
    switch (state.symptom) {
      case "headache":
        return "Headache";
      case "chest":
        return "Chest Pain";
      case "stomach":
        return "Stomach Pain";
      case "breathing":
        return "Breathing Difficulty";
      case "none":
        return "No Specific Symptom";
      default:
        return "Unknown Symptom";
    }
  };

  // Get current priority description
  const getPriorityDescription = () => {
    if (!state.currentPriority) return "Not yet determined";

    switch (state.currentPriority) {
      case 1:
        return "Priority 1 - Emergency (Immediate attention)";
      case 2:
        return "Priority 2 - Very Urgent (10 minutes)";
      case 3:
        return "Priority 3 - Urgent (30 minutes)";
      case 4:
        return "Priority 4 - Standard (1 hour)";
      case 5:
        return "Priority 5 - Non-urgent (2+ hours)";
      default:
        return "Unknown Priority";
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button onClick={toggleVisibility} variant="secondary">
          Show Flow Chart
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-md w-full">
      <Card className="p-4 border-2 border-blue-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Triage Flow Status</h3>
          <Button onClick={toggleVisibility} variant="secondary" size="small">
            Hide
          </Button>
        </div>

        <div className="space-y-3">
          <div className="p-2 bg-blue-50 rounded">
            <p className="font-medium">Current Phase:</p>
            <p>{getPhaseDescription()}</p>
          </div>

          <div className="p-2 bg-blue-50 rounded">
            <p className="font-medium">Current Symptom:</p>
            <p>{getSymptomDescription()}</p>
          </div>

          {state.symptom !== "none" && state.painScore > 0 && (
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Pain/Severity Level:</p>
              <p>{state.painScore}/10</p>
            </div>
          )}

          <div className="p-2 bg-blue-50 rounded">
            <p className="font-medium">Current Priority:</p>
            <p>{getPriorityDescription()}</p>
          </div>

          {state.responses.length > 0 && (
            <div className="p-2 bg-blue-50 rounded">
              <p className="font-medium">Key Responses:</p>
              <ul className="list-disc ml-5 text-sm">
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
      </Card>
    </div>
  );
}
