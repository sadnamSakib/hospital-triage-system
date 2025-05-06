"use client";
import React from "react";
import { TriageProvider, useTriageContext } from "./context/TriageContext";
import { TriageRouter } from "./components/TriageRouter";
import { FlowChartVisualization } from "./components/FlowChartVisualization";
import InactivityTimer from "./components/common/InactivityTimer";

// Main component that will use the router
function TriageApp() {
  return (
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
          {/* InactivityTimer will only run for the start screen */}
          <InactivityTimer />
          <TriageRouter />
          <FlowChartVisualization />
        </div>
      </main>

      <footer className="bg-gray-100 text-gray-700 p-6 text-center">
        <p className="text-xl">© 2025 Hospital Triage System</p>
      </footer>
    </div>
  );
}

// Root page component wrapped with the triage provider
export default function Home() {
  return (
    <TriageProvider>
      <TriageApp />
    </TriageProvider>
  );
}
