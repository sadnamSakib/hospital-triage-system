// app/page.tsx
"use client";
import React from "react";
import {
  StartScreen,
  BasicInfoForm,
  InitialQuestions,
  TriageRouter,
  PainAssessment,
  EmergencyScreen,
  PriorityScreen,
  CompleteScreen,
} from "./components/triage";
import { FlowChartVisualization } from "./components/triage/FlowChartVisualization";
import { TriageProvider, useTriageContext } from "./context/TriageContext";

// The main triage flow component
function TriageFlow() {
  const { state } = useTriageContext();

  // Render different screens based on the current stage
  switch (state.stage) {
    case "start":
      return <StartScreen />;
    case "basicInfo":
      return <BasicInfoForm />;
    case "initialQuestions":
      return <InitialQuestions />;
    case "triage":
      return <TriageRouter />;
    case "headache":
      return <PainAssessment painArea="headache" />;
    case "chest":
      return <PainAssessment painArea="chest" />;
    case "stomach":
      return <PainAssessment painArea="stomach" />;
    case "breathing":
      return <PainAssessment painArea="breathing" />;
    case "emergency":
      return <EmergencyScreen />;
    case "priority":
      return <PriorityScreen />;
    case "complete":
      return <CompleteScreen />;
    default:
      return <StartScreen />;
  }
}

// Root page component
export default function Home() {
  return (
    <TriageProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-700 text-white p-6 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold">Hospital Triage System</h1>
            <div className="text-2xl font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>

        <main className="py-8">
          <div className="container mx-auto px-4">
            <TriageFlow />
            <FlowChartVisualization />
          </div>
        </main>

        <footer className="bg-gray-100 text-gray-700 p-6 text-center">
          <p className="text-xl">© 2025 Hospital Triage System.</p>
        </footer>
      </div>
    </TriageProvider>
  );
}
