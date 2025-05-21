"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

// Breathing Difficulty Phase 1 - Initial Assessment
export default function BreathingPhase1() {
  const { addResponse, setPriority, setPassingOut, setRoute, nextPhase, goBack } =
    useTriageContext();
  const [isPassingOut, setIsPassingOut] = useState("no");

  // Handle continue button
  const handleContinue = () => {
    // Save the passing out response
    const feelingPassingOut = isPassingOut === "yes";
    setPassingOut(feelingPassingOut);
    addResponse({ id: "isPassingOut", answer: feelingPassingOut });

    if (feelingPassingOut) {
      // If patient feels like they might pass out, set priority 1 and go to emergency
      setPriority(1);
      setRoute({ symptom: "breathing", phase: "emergency" });
    } else {
      // Otherwise, set priority 3 and proceed to next phase
      setPriority(3);
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
          Breathing Difficulty Assessment
        </h2>

        <Alert
          type="warning"
          title="Important Question"
          message="Difficulty breathing can be serious. Please answer the following question carefully."
        />

        <div className="space-y-6 mt-6">
          <RadioGroup
            label="Are you feeling like you may soon pass out or black out?"
            name="isPassingOut"
            value={isPassingOut}
            onChange={setIsPassingOut}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          <div className="flex justify-between mt-6">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button 
              onClick={handleContinue}
              variant={isPassingOut === "yes" ? "danger" : "primary"}
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}