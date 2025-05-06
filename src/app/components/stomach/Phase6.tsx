"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { TextInput } from "../ui/TextInput";
import { useTriageContext } from "../../context/TriageContext";

// Stomach Pain Phase 6 - Additional common questions from flowchart
export default function StomachPhase6() {
  const { addResponse, nextPhase, goBack } = useTriageContext();

  // State for stomach-specific Phase 6 questions
  const [painLocation, setPainLocation] = useState("front");
  const [painSiteLeft, setPainSiteLeft] = useState(false);
  const [painSiteMiddle, setPainSiteMiddle] = useState(false);
  const [painSiteRight, setPainSiteRight] = useState(false);
  const [painConstant, setPainConstant] = useState("no");
  const [painDuration, setPainDuration] = useState("day");
  const [painOccurredBefore, setPainOccurredBefore] = useState("no");
  const [painTimeAgo, setPainTimeAgo] = useState("month");
  const [takingMedication, setTakingMedication] = useState("no");
  const [medication, setMedication] = useState("");

  // Handle continue button
  const handleContinue = () => {
    // Save all responses
    addResponse({ id: "stomachPainLocation", answer: painLocation });

    // Save pain site details
    addResponse({
      id: "painLocationDetails",
      answer: {
        left: painSiteLeft,
        middle: painSiteMiddle,
        right: painSiteRight,
      },
    });

    addResponse({ id: "painConstant", answer: painConstant === "yes" });
    addResponse({ id: "painDuration", answer: painDuration });
    addResponse({
      id: "painOccurredBefore",
      answer: painOccurredBefore === "yes",
    });

    if (painOccurredBefore === "yes") {
      addResponse({ id: "painTimeAgo", answer: painTimeAgo });
    }

    addResponse({ id: "takingMedication", answer: takingMedication === "yes" });

    if (takingMedication === "yes") {
      addResponse({ id: "medication", answer: medication });
    }

    // Proceed to final priority calculation and results
    nextPhase();
  };

  // Handle back button
  const handleBack = () => {
    goBack();
  };

  // Handle checkbox changes
  const handlePainSiteChange = (site: string, checked: boolean) => {
    if (site === "left") setPainSiteLeft(checked);
    if (site === "middle") setPainSiteMiddle(checked);
    if (site === "right") setPainSiteRight(checked);
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Stomach Pain Assessment - Phase 6
        </h2>

        <div className="space-y-6">
          {/* Question 1 - Pain location back/front */}
          <RadioGroup
            label="Is the pain:"
            name="painLocation"
            value={painLocation}
            onChange={setPainLocation}
            options={[
              { value: "back", label: "On your back?" },
              { value: "front", label: "On your front?" },
            ]}
          />

          {/* Question 2 - Pain site (left/middle/right) */}
          <div className="mb-6">
            <label className="block text-xl font-medium text-gray-700 mb-3">
              Where is the pain located? (Select all that apply)
            </label>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={painSiteLeft}
                  onChange={(e) =>
                    handlePainSiteChange("left", e.target.checked)
                  }
                  className="h-6 w-6 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-lg">Left side</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={painSiteMiddle}
                  onChange={(e) =>
                    handlePainSiteChange("middle", e.target.checked)
                  }
                  className="h-6 w-6 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-lg">Middle</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={painSiteRight}
                  onChange={(e) =>
                    handlePainSiteChange("right", e.target.checked)
                  }
                  className="h-6 w-6 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-lg">Right side</span>
              </label>
            </div>
          </div>

          {/* Question 3 - Pain constant or comes and goes */}
          <RadioGroup
            label="Right now, does the pain come and go, or is it constant?"
            name="painConstant"
            value={painConstant}
            onChange={setPainConstant}
            options={[
              { value: "yes", label: "Constant" },
              { value: "no", label: "Comes and goes" },
            ]}
          />

          {/* Question 4 - Pain duration */}
          <RadioGroup
            label="How long have you had this pain?"
            name="painDuration"
            value={painDuration}
            onChange={setPainDuration}
            options={[
              { value: "hour", label: "Within the last hour" },
              { value: "day", label: "Within the last day" },
              { value: "week", label: "Within the last week" },
              { value: "longer", label: "Longer than a week" },
            ]}
          />

          {/* Question 5 - Pain occurred before */}
          <RadioGroup
            label="Has this pain occurred before, after a long period of not feeling it?"
            name="painOccurredBefore"
            value={painOccurredBefore}
            onChange={setPainOccurredBefore}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {/* Conditional question based on previous answer */}
          {painOccurredBefore === "yes" && (
            <RadioGroup
              label="How long ago did you have this pain?"
              name="painTimeAgo"
              value={painTimeAgo}
              onChange={setPainTimeAgo}
              options={[
                { value: "month", label: "A month" },
                { value: "several", label: "Several months" },
                { value: "more", label: "More than several months" },
              ]}
            />
          )}

          {/* Question 6 - Taking medication */}
          <RadioGroup
            label="Are you taking medication?"
            name="takingMedication"
            value={takingMedication}
            onChange={setTakingMedication}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {/* Conditional question for medication details */}
          {takingMedication === "yes" && (
            <TextInput
              label="Please enter your medication"
              name="medication"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="Enter medication name"
            />
          )}

          <div className="flex justify-between mt-6">
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleContinue}>Submit</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
