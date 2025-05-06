// components/common/InitialSymptoms.tsx
"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";
import { SymptomType } from "../../types";

export default function InitialSymptoms() {
  const { setRoute } = useTriageContext();
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomType>("none");

  // Array of available symptoms
  const symptoms = [
    { value: "none", label: "Select a symptom (required)" },
    { value: "headache", label: "Headache" },
    { value: "chest", label: "Chest Pain" },
    { value: "stomach", label: "Stomach Pain" },
    { value: "breathing", label: "Difficulty Breathing" },
  ];

  // Handle symptom selection change
  const handleSymptomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymptom(e.target.value as SymptomType);
  };

  // Handle continue button
  const handleContinue = () => {
    if (selectedSymptom === "none") {
      alert("Please select a symptom or choose 'No symptoms'");
      return;
    }

    // Special case for chest pain - immediate emergency
    if (selectedSymptom === "chest") {
      setRoute({ symptom: selectedSymptom, phase: "emergency" });
      return;
    }

    // For all other symptoms, proceed to phase 1
    setRoute({ symptom: selectedSymptom, phase: "phase1" });
  };

  // Handle back button
  const handleBack = () => {
    setRoute({ symptom: "none", phase: "basicInfo" });
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6">Initial Assessment</h2>

        <Alert
          type="info"
          title="Symptom Assessment"
          message="Please select your primary symptom from the options below."
        />

        <div className="mt-8">
          <label className="block text-xl font-medium text-gray-700 mb-3">
            What is your main symptom?
          </label>
          <select
            value={selectedSymptom}
            onChange={handleSymptomChange}
            className="w-full px-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-white shadow-md"
          >
            {symptoms.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-10">
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </Card>
    </div>
  );
}
