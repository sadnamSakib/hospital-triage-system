"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";

// Headache Phase 5 - Unique questions for headache
export default function HeadachePhase5() {
  const { addResponse, calculatePriority, nextPhase, goBack } =
    useTriageContext();

  // State for headache-specific questions (exact order from flowchart)
  const [hasFever, setHasFever] = useState("no");
  const [isPregnant, setIsPregnant] = useState("no");
  const [hasVomited, setHasVomited] = useState("no");
  const [hasRash, setHasRash] = useState("no");

  // Handle continue button
  const handleContinue = () => {
    // Save all responses
    addResponse({ id: "hasFever", answer: hasFever === "yes" });
    addResponse({ id: "isPregnant", answer: isPregnant === "yes" });
    addResponse({ id: "hasVomited", answer: hasVomited === "yes" });
    addResponse({ id: "hasRash", answer: hasRash === "yes" });

    // Calculate priority based on truth table
    calculatePriority();

    // Proceed to the next phase
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
          Headache Assessment - Additional Questions
        </h2>

        <div className="space-y-6">
          <RadioGroup
            label="Do you have a cold, and/or do you had a fever?"
            name="hasFever"
            value={hasFever}
            onChange={setHasFever}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

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

          <RadioGroup
            label="Have you vomited since the headache began?"
            name="hasVomited"
            value={hasVomited}
            onChange={setHasVomited}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          <RadioGroup
            label="Do you have a rash?"
            name="hasRash"
            value={hasRash}
            onChange={setHasRash}
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
