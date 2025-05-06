// components/chest/phase3.tsx
"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { RadioGroup } from "../ui/RadioGroup";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

// Chest Pain Phase 3 - Emergency path (usually skipped, but included for completeness)
export default function ChestPhase3() {
  const { addResponse, setRoute } = useTriageContext();
  const [painLocation, setPainLocation] = useState("middle");

  // Handle continue button - all chest pain is emergency
  const handleContinue = () => {
    // Save response
    addResponse({ id: "chestPainLocation", answer: painLocation });

    // Go to emergency
    setRoute({ symptom: "chest", phase: "emergency" });
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Chest Pain - Emergency Assessment
        </h2>

        <Alert
          type="error"
          title="Emergency"
          message="Chest pain requires immediate medical attention. Medical staff will be notified."
        />

        <div className="space-y-6 mt-6">
          <RadioGroup
            label="Where is the pain located?"
            name="painLocation"
            value={painLocation}
            onChange={setPainLocation}
            options={[
              { value: "middle", label: "Center of chest" },
              { value: "left", label: "Left side of chest" },
              { value: "right", label: "Right side of chest" },
            ]}
          />

          <div className="flex justify-end mt-6">
            <Button onClick={handleContinue}>Notify Medical Staff</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
