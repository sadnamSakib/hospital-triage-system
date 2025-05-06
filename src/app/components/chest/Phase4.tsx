"use client";

import React, { useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

// Chest Pain Phase 4 - Priority Assignment (always emergency)
export default function ChestPhase4() {
  const { state, setPriority, setRoute } = useTriageContext();

  // Set priority to 1 (emergency) when component loads
  useEffect(() => {
    setPriority(1);
  }, [setPriority]);

  // Handle continue button - proceed to emergency
  const handleContinue = () => {
    setRoute({ symptom: "chest", phase: "emergency" });
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100">
      <Card className="max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">
          Chest Pain Assessment - Emergency Priority
        </h2>

        <Alert
          type="error"
          title="Emergency"
          message="Chest pain requires immediate medical attention. Medical staff will be notified."
        />

        <div className="bg-gray-100 p-4 rounded-md mt-6 mb-6">
          <h3 className="font-medium mb-2">Assessment:</h3>
          <p>
            <strong>Pain Level:</strong> {state.painScores.chest}/10
          </p>
          <p>
            <strong>Priority:</strong> 1 (Emergency)
          </p>
        </div>

        <p className="mb-4 font-medium text-red-600">
          Please prepare to be seen immediately by medical professionals.
        </p>

        <div className="flex justify-end mt-6">
          <Button onClick={handleContinue}>Notify Medical Staff</Button>
        </div>
      </Card>
    </div>
  );
}
