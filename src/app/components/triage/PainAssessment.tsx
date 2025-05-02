"use client";
import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RangeSlider } from "../ui/RangeSlider";
import { RadioGroup } from "../ui/RadioGroup";
import { useTriageContext } from "../../context/TriageContext";
import { PainArea, PainLocation } from "../../types";

interface PainAssessmentProps {
  painArea: PainArea;
}

export function PainAssessment({ painArea }: PainAssessmentProps) {
  const { addResponse, setPainScore, setStage, calculatePriority } =
    useTriageContext();
  const [painLevel, setPainLevel] = useState(1);
  const [painLocation, setPainLocation] = useState<PainLocation>("middle");
  const [painConstant, setPainConstant] = useState("no");
  const [painDuration, setPainDuration] = useState("hour");
  const [painRadiating, setPainRadiating] = useState("no");
  const [painMovement, setPainMovement] = useState("no");

  const handlePainLocationChange = (value: string) => {
    setPainLocation(value as PainLocation);
  };

  const handlePainConstantChange = (value: string) => {
    setPainConstant(value);
  };

  const handlePainDurationChange = (value: string) => {
    setPainDuration(value);
  };

  const handlePainRadiatingChange = (value: string) => {
    setPainRadiating(value);
  };

  const handlePainMovementChange = (value: string) => {
    setPainMovement(value);
  };

  const handleContinue = () => {
    addResponse({ id: `${painArea}Level`, answer: painLevel });
    addResponse({ id: `${painArea}Location`, answer: painLocation });
    addResponse({ id: `${painArea}Constant`, answer: painConstant === "yes" });
    addResponse({ id: `${painArea}Duration`, answer: painDuration });
    addResponse({
      id: `${painArea}Radiating`,
      answer: painRadiating === "yes",
    });
    addResponse({ id: `${painArea}Movement`, answer: painMovement === "yes" });

    setPainScore(painArea, painLevel);

    if (painLevel >= 9 || (painArea === "chest" && painLevel >= 7)) {
      setStage("emergency");
    } else {
      calculatePriority();
    }
  };

  const getTitleByPainArea = () => {
    switch (painArea) {
      case "headache":
        return "Headache Assessment";
      case "chest":
        return "Chest Pain Assessment";
      case "stomach":
        return "Stomach Pain Assessment";
      case "breathing":
        return "Breathing Difficulty Assessment";
      default:
        return "Pain Assessment";
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">{getTitleByPainArea()}</h2>
        <div className="space-y-6">
          <RangeSlider
            min={1}
            max={10}
            value={painLevel}
            onChange={setPainLevel}
            label={`On a scale of 1 to 10, how bad is your ${
              painArea === "breathing" ? "breathing difficulty" : painArea
            }?`}
          />

          {painArea !== "breathing" && (
            <RadioGroup
              label="Where is the pain located?"
              name="painLocation"
              value={painLocation}
              onChange={handlePainLocationChange}
              options={[
                { value: "left", label: "Left side" },
                { value: "middle", label: "Middle" },
                { value: "right", label: "Right side" },
              ]}
            />
          )}

          <RadioGroup
            label={`Right now, does the ${
              painArea === "breathing" ? "difficulty" : "pain"
            } come and go, or is it constant?`}
            name="painConstant"
            value={painConstant}
            onChange={handlePainConstantChange}
            options={[
              { value: "yes", label: "Constant" },
              { value: "no", label: "Comes and goes" },
            ]}
          />

          <RadioGroup
            label={`How long have you been experiencing this ${
              painArea === "breathing" ? "difficulty" : "pain"
            }?`}
            name="painDuration"
            value={painDuration}
            onChange={handlePainDurationChange}
            options={[
              { value: "hour", label: "Within the last hour" },
              { value: "day", label: "Within the last three days" },
              { value: "week", label: "Within the last week" },
              { value: "longer", label: "Longer than a week" },
            ]}
          />

          {painArea !== "breathing" && (
            <>
              <RadioGroup
                label={`Does your pain feel like it is radiating (moving) down either leg or arm?`}
                name="painRadiating"
                value={painRadiating}
                onChange={handlePainRadiatingChange}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <RadioGroup
                label={`Is the pain worse when you move?`}
                name="painMovement"
                value={painMovement}
                onChange={handlePainMovementChange}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="secondary"
            onClick={() => setStage("initialQuestions")}
          >
            Back
          </Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </Card>
    </div>
  );
}
