"use client";

import React from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Alert } from "../ui/Alert";
import { useTriageContext } from "../../context/TriageContext";

export default function StartScreen() {
  const { setRoute } = useTriageContext();

  // Move to Basic Info screen
  const handleStart = () => {
    setRoute({ symptom: "none", phase: "basicInfo" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-8 bg-gray-100">
      <Card className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
          Welcome to the Hospital Triage System
        </h1>

        <Alert
          type="warning"
          title="Important Notice"
          message="If you are experiencing a life-threatening emergency, notify hospital staff immediately or call 911."
        />

        <div className="mt-10 text-center">
          <p className="text-2xl mb-10">
            This system will help assess your symptoms and determine the
            appropriate level of care.
          </p>

          <div className="mt-8">
            <Button onClick={handleStart} fullWidth>
              TAP HERE TO BEGIN
            </Button>
          </div>

          <p className="mt-8 text-lg text-gray-600">
            Touch anywhere on the screen to interact with the system.
          </p>
        </div>
      </Card>
    </div>
  );
}
