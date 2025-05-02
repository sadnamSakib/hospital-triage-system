"use client";
import React, { useEffect } from "react";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Alert } from "@/app/components/ui/Alert";
import { useTriageContext } from "@/app/context/TriageContext";

export function StartScreen() {
  const { setStage } = useTriageContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 120000);

    const resetTimer = () => {
      clearTimeout(timer);
    };

    window.addEventListener("click", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("keypress", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

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
            <Button onClick={() => setStage("basicInfo")} fullWidth>
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
