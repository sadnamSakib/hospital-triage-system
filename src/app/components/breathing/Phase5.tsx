"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";

// Breathing Difficulty Phase 5 - Pregnancy Assessment
export default function BreathingPhase5() {
  const { addResponse, calculatePriority, nextPhase, goBack, setDiagnosis, setToken, state } =
    useTriageContext();
  const [isPregnant, setIsPregnant] = useState("no");

  // Handle continue button
  const handleContinue = () => {
    // Save response
    addResponse({ id: "isPregnant", answer: isPregnant === "yes" });

    // Calculate priority based on all collected responses
    calculatePriority(true);

    // --- DIAGNOSIS LOGIC ---
    let diagnosis = isPregnant === "yes" ? "Fetus risk" : "Breathing issue";
    setDiagnosis(diagnosis);

    // --- TOKEN LOGIC ---
    let serial = parseInt(localStorage.getItem("triage_serial") || "0", 10) + 1;
    localStorage.setItem("triage_serial", serial.toString());
    const token = `B-${serial}`;
    setToken(token);
    localStorage.setItem("triage_token", token);

    // Continue to final phase for common questions
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
            label="Are you pregnant?"
            name="isPregnant"
            value={isPregnant}
            onChange={setIsPregnant}
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
