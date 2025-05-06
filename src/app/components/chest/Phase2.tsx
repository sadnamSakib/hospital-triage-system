"use client";

import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

// Chest Pain Phase 2 - Question Chain Selection (mostly informational for chest pain)
export default function ChestPhase2() {
  const { nextPhase, goBack } = useTriageContext();

  // Handle continue button - proceed to emergency route
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
          Chest Pain Assessment - Urgent Notice
        </h2>

        <Alert
          type="error"
          title="Emergency Assessment"
          message="Chest pain is always treated as a potential emergency. Medical staff will be notified promptly."
        />

        <div className="mt-6 space-y-4">
          <p className="font-medium">
            We will collect a few more details about your chest pain to assist
            medical staff:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Location and nature of the pain</li>
            <li>Additional symptoms you may be experiencing</li>
          </ul>
          <p>
            Please be prepared to be seen quickly by medical professionals once
            you complete this assessment.
          </p>
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
