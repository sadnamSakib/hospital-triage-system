"use client";

import React, { useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useTriageContext } from "../../context/TriageContext";

export default function InactiveScreen() {
  const { setInactive } = useTriageContext();

  // Handle button click to continue
  const handleContinue = () => {
    setInactive(false);
  };

  // Also handle any user interaction to continue
  useEffect(() => {
    const handleUserActivity = () => {
      setInactive(false);
    };

    // Add event listeners for any user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("mousedown", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("mousedown", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
    };
  }, [setInactive]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-8 bg-gray-100">
      <Card className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
          Are you still there?
        </h1>

        <div className="mt-10 text-center">
          <p className="text-2xl mb-10">
            Please tap the button below or move your mouse to continue your
            assessment.
          </p>

          <div className="mt-8">
            <Button onClick={handleContinue} fullWidth>
              TAP HERE TO CONTINUE
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
