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

    // Get other responses for breathing phase 5
    const hasFever = state.responses.find(r => r.id === "hasFever")?.answer === true ? "yes" : "no";
    const hasCough = state.responses.find(r => r.id === "hasCough")?.answer === true ? "yes" : "no";
    const hasAsthma = state.responses.find(r => r.id === "hasAsthma")?.answer === true ? "yes" : "no";
    // isPregnant is from local state

    // Calculate priority based on all collected responses
    calculatePriority(true);

    // --- DIAGNOSIS LOGIC (from truth table) ---
    // Bit order: hasFever, hasCough, hasAsthma, isPregnant
    const bits = [hasFever, hasCough, hasAsthma, isPregnant].map((v) => v === "yes" ? 1 : 0).join("");
    let diagnosis = "";
    switch (bits) {
      case "0000":
        diagnosis = "Asthma";
        break;
      case "0001":
        diagnosis = "Fetus risk";
        break;
      case "0010":
        diagnosis = "Asthma";
        break;
      case "0011":
        diagnosis = "Fetus risk";
        break;
      case "0100":
        diagnosis = "Cold";
        break;
      case "0101":
        diagnosis = "Fetus risk";
        break;
      case "0110":
        diagnosis = "Cold";
        break;
      case "0111":
        diagnosis = "Fetus risk";
        break;
      case "1000":
        diagnosis = "Sepsis";
        break;
      case "1001":
        diagnosis = "Fetus risk";
        break;
      case "1010":
        diagnosis = "Sepsis";
        break;
      case "1011":
        diagnosis = "Fetus risk";
        break;
      case "1100":
        diagnosis = "Sepsis";
        break;
      case "1101":
        diagnosis = "Fetus risk";
        break;
      case "1110":
        diagnosis = "Sepsis";
        break;
      case "1111":
        diagnosis = "Fetus risk";
        break;
      default:
        diagnosis = "Breathing issue";
    }
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
