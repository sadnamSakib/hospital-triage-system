"use client";
import React, { useState } from "react";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { useTriageContext } from "@/app/context/TriageContext";
import { PainArea } from "@/app/types";

export function InitialQuestions() {
  const { addResponse, setStage, selectPainArea } = useTriageContext();
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");

  const symptomOptions = [
    { value: "", label: "Select a symptom (required)" },
    { value: "headache", label: "Headache" },
    { value: "chestPain", label: "Chest Pain" },
    { value: "stomachPain", label: "Stomach Pain" },
    { value: "breathingDifficulty", label: "Difficulty Breathing" },
    { value: "none", label: "No symptoms" },
  ];

  const handleSymptomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymptom(e.target.value);
  };

  const handleContinue = () => {
    if (!selectedSymptom) {
      alert("Please select a symptom or choose 'No symptoms'");
      return;
    }

    // Create a responses object that matches the previous format
    // to maintain compatibility with the rest of the app
    const responses = {
      headache: selectedSymptom === "headache" ? "yes" : "no",
      chestPain: selectedSymptom === "chestPain" ? "yes" : "no",
      stomachPain: selectedSymptom === "stomachPain" ? "yes" : "no",
      breathingDifficulty:
        selectedSymptom === "breathingDifficulty" ? "yes" : "no",
    };

    // Add responses to the context
    Object.entries(responses).forEach(([key, value]) => {
      addResponse({ id: key, answer: value === "yes" });
    });

    // Handle pain area selection
    if (selectedSymptom === "headache") {
      selectPainArea("headache");
    } else if (selectedSymptom === "chestPain") {
      selectPainArea("chest");
    } else if (selectedSymptom === "stomachPain") {
      selectPainArea("stomach");
    } else if (selectedSymptom === "breathingDifficulty") {
      selectPainArea("breathing");
    }

    // Handle navigation based on selection
    if (selectedSymptom === "none" || selectedSymptom === "") {
      setStage("complete");
      return;
    }

    if (selectedSymptom === "breathingDifficulty") {
      setStage("emergency");
      return;
    }

    setStage("triage");
  };

  // Styles for the dropdown to make it kiosk-friendly
  const selectStyle = {
    width: "100%",
    padding: "1rem",
    fontSize: "1.25rem",
    borderRadius: "0.75rem",
    border: "2px solid #d1d5db",
    marginBottom: "2rem",
    backgroundColor: "white",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    cursor: "pointer",
    appearance: "menulist-button", // Show dropdown arrow
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    minHeight: "calc(100vh - 200px)",
    padding: "1rem",
    backgroundColor: "#f3f4f6",
  };

  const headingStyle = {
    fontSize: "1.875rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  };

  const instructionStyle = {
    fontSize: "1.25rem",
    marginBottom: "1.5rem",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
  };

  return (
    <div style={containerStyle}>
      <Card className="max-w-2xl w-full">
        <h2 style={headingStyle}>Initial Assessment</h2>

        <p style={instructionStyle}>
          Please select the primary symptom you are experiencing:
        </p>

        <select
          value={selectedSymptom}
          onChange={handleSymptomChange}
          style={selectStyle}
        >
          {symptomOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div style={buttonContainerStyle}>
          <Button variant="secondary" onClick={() => setStage("basicInfo")}>
            Back
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </Card>
    </div>
  );
}
