"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";

// Stomach Pain Phase 5 - Unique questions based on flowchart
export default function StomachPhase5() {
  const { addResponse, calculatePriority, nextPhase, goBack, setDiagnosis, setToken, state } =
    useTriageContext();

  // State for stomach-specific Phase 5 questions from flowchart (exact order)
  const [isNauseous, setIsNauseous] = useState("no");
  const [hasVomited, setHasVomited] = useState("no");
  const [hasRegularBowelMotions, setHasRegularBowelMotions] = useState("no");
  const [isPainWorseWhenStill, setIsPainWorseWhenStill] = useState("no");

  // Handle continue button
  const handleContinue = () => {
    // Save all responses
    addResponse({ id: "isNauseous", answer: isNauseous === "yes" });
    addResponse({ id: "hasVomited", answer: hasVomited === "yes" });
    addResponse({
      id: "hasRegularBowelMotions",
      answer: hasRegularBowelMotions === "yes",
    });
    addResponse({
      id: "isPainWorseWhenStill",
      answer: isPainWorseWhenStill === "yes",
    });

    // Calculate priority based on responses using the truth table
    calculatePriority();

    // Proceed to next phase
    nextPhase();
  };

  // Handle back button
  const handleBack = () => {
    goBack();
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Stomach Pain Assessment</h2>

        <div className="space-y-6">
          {/* Question 1 - Nausea */}
          <RadioGroup
            label="Are you feeling nauseous?"
            name="isNauseous"
            value={isNauseous}
            onChange={setIsNauseous}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {/* Question 2 - Vomiting */}
          <RadioGroup
            label="Have you vomited since you began feeling this pain?"
            name="hasVomited"
            value={hasVomited}
            onChange={setHasVomited}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {/* Question 3 - Bowel Movements */}
          <RadioGroup
            label="Have you experienced regular bowel motions in the last week?"
            name="hasRegularBowelMotions"
            value={hasRegularBowelMotions}
            onChange={setHasRegularBowelMotions}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {/* Question 4 - Pain when still */}
          <RadioGroup
            label="Is the pain worse when you stay still?"
            name="isPainWorseWhenStill"
            value={isPainWorseWhenStill}
            onChange={setIsPainWorseWhenStill}
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
