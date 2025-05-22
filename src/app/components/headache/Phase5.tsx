"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";

// Headache Phase 5 - Unique questions for headache
export default function HeadachePhase5() {
  const { addResponse, calculatePriority, nextPhase, goBack, setDiagnosis, setToken, state } =
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
    calculatePriority(true);

    // --- DIAGNOSIS LOGIC (from truth table) ---
    // Convert answers to bits: hasFever, isPregnant, hasVomited, hasRash
    const bits = [hasFever, isPregnant, hasVomited, hasRash].map((v) => v === "yes" ? 1 : 0).join("");
    let diagnosis = "";
    switch (bits) {
      case "0000":
        diagnosis = "Pain";
        break;
      case "0001":
        diagnosis = "Meningitis";
        break;
      case "0010":
        diagnosis = "Sepsis";
        break;
      case "0011":
        diagnosis = "Meningitis";
        break;
      case "0100":
        diagnosis = "Fetus risk";
        break;
      case "0101":
        diagnosis = "Fetus risk";
        break;
      case "0110":
        diagnosis = "Fetus risk";
        break;
      case "0111":
        diagnosis = "Fetus risk";
        break;
      case "1000":
        diagnosis = "Pain";
        break;
      case "1001":
        diagnosis = "Meningitis";
        break;
      case "1010":
        diagnosis = "Sepsis";
        break;
      case "1011":
        diagnosis = "Meningitis";
        break;
      case "1100":
        diagnosis = "Fetus risk";
        break;
      case "1101":
        diagnosis = "Fetus risk";
        break;
      case "1110":
        diagnosis = "Fetus risk";
        break;
      case "1111":
        diagnosis = "Fetus risk";
        break;
      default:
        diagnosis = "Pain";
    }
    setDiagnosis(diagnosis);

    // --- TOKEN LOGIC ---
    // Generate a serial number (incremental)
    let serial = parseInt(localStorage.getItem("triage_serial") || "0", 10) + 1;
    localStorage.setItem("triage_serial", serial.toString());
    const token = `H-${serial}`;
    setToken(token);
    localStorage.setItem("triage_token", token);

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
