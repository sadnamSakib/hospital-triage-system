"use client";
import React from "react";
import { Card } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Alert } from "@/app/components/ui/Alert";
import { useTriageContext } from "@/app/context/TriageContext";

export function EmergencyScreen() {
  const { state, reset } = useTriageContext();

  return (
    <div className="flex justify-center min-h-screen p-4 bg-red-50">
      <Card className="max-w-lg w-full border-l-4 border-red-600">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          Emergency: Call Nurse Immediately
        </h2>

        <Alert
          type="error"
          title="Urgent Medical Attention Required"
          message="Based on your responses, you should be seen by a medical professional immediately."
        />

        <div className="mt-6">
          <p className="font-medium">Priority Level: 1 (Highest)</p>
          {state.userInfo && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md">
              <p>
                <strong>Name:</strong> {state.userInfo.name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {state.userInfo.dateOfBirth}
              </p>
              <p>
                <strong>Sex:</strong> {state.userInfo.sex}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-red-700 font-medium mb-4">
            Please inform the nearest staff member immediately.
          </p>
          <Button variant="danger" onClick={reset} fullWidth>
            Restart
          </Button>
        </div>
      </Card>
    </div>
  );
}
