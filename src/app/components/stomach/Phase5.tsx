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
    calculatePriority(true);

    // --- DIAGNOSIS LOGIC (from truth table) ---
    // Convert answers to bits: isNauseous, hasVomited, hasRegularBowelMotions, isPainWorseWhenStill
    const bits = [isNauseous, hasVomited, hasRegularBowelMotions, isPainWorseWhenStill].map((v) => v === "yes" ? 1 : 0).join("");
    let diagnosis = "";
    switch (bits) {
      case "0000":
        diagnosis = "Pain";
        break;
      case "0001":
        diagnosis = "Pain";
        break;
      case "0010":
        diagnosis = "Pain";
        break;
      case "0011":
        diagnosis = "Pain";
        break;
      case "0100":
        diagnosis = "Pain";
        break;
      case "0101":
        diagnosis = "Pain";
        break;
      case "0110":
        diagnosis = "Pain";
        break;
      case "0111":
        diagnosis = "Pain";
        break;
      case "1000":
        diagnosis = "Pain";
        break;
      case "1001":
        diagnosis = "Pain";
        break;
      case "1010":
        diagnosis = "Pain";
        break;
      case "1011":
        diagnosis = "Pain";
        break;
      case "1100":
        diagnosis = "Pain";
        break;
      case "1101":
        diagnosis = "Pain";
        break;
      case "1110":
        diagnosis = "Pain";
        break;
      case "1111":
        diagnosis = "Pain";
        break;
      default:
        diagnosis = "Pain";
    }
    // Add special cases from the truth table for sepsis and fetus risk
    if (["0010", "1010", "0110", "1110", "0011", "1011", "0111", "1111"].includes(bits)) {
      diagnosis = "Sepsis";
    } else if (["0100", "0101", "1100", "1101"].includes(bits)) {
      diagnosis = "Fetus risk";
    }
    setDiagnosis(diagnosis);

    // --- TOKEN LOGIC ---
    let serial = parseInt(localStorage.getItem("triage_serial") || "0", 10) + 1;
    localStorage.setItem("triage_serial", serial.toString());
    const token = `S-${serial}`;
    setToken(token);
    localStorage.setItem("triage_token", token);

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
