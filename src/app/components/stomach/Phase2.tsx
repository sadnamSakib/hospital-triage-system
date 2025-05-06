"use client";

import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

// Stomach Pain Phase 2 - Question Chain Selection
export default function StomachPhase2() {
  const { nextPhase, goBack } = useTriageContext();

  // Handle continue button - proceed to next phase for further assessment
  const handleContinue = () => {
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
          Stomach Pain Assessment - Question Chain
        </h2>

        <Alert
          type="info"
          title="Assessment Path"
          message="You will now be asked a series of specific questions about your stomach pain to help us assess your condition."
        />

        <div className="mt-6 space-y-4">
          <p>These questions will help us determine:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>The severity and location of your stomach pain</li>
            <li>Potential causes and associated symptoms</li>
            <li>Appropriate priority level for treatment</li>
          </ul>
        </div>

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
