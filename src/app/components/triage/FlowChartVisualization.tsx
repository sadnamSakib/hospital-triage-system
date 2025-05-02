"use client";
import React from "react";
import { useTriageContext } from "@/app/context/TriageContext";

export function FlowChartVisualization() {
  const { state } = useTriageContext();

  // Function to determine which stage is active
  const isStageActive = (stage: string) => {
    return state.stage === stage;
  };

  // Helper function to get the appropriate color for a stage
  const getStageColor = (stage: string) => {
    if (isStageActive(stage)) {
      return "bg-yellow-400 border-yellow-600";
    }

    // Check if the stage is in the history (completed)
    if (state.history.includes(stage as any)) {
      return "bg-green-500 border-green-700";
    }

    // Default color for inactive stages
    return "bg-blue-200 border-blue-400";
  };

  return (
    <div className="fixed bottom-8 right-8 z-10">
      <button
        className="bg-blue-600 text-white p-5 rounded-full shadow-xl hover:bg-blue-700 focus:outline-none"
        onClick={() =>
          document.getElementById("flowchart-modal")?.classList.toggle("hidden")
        }
        aria-label="Show flowchart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </button>

      {/* Flowchart Modal */}
      <div
        id="flowchart-modal"
        className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-8"
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-screen overflow-auto">
          <div className="flex justify-between items-center p-6 border-b-2">
            <h3 className="text-3xl font-bold text-blue-700">
              Triage Flowchart
            </h3>
            <button
              onClick={() =>
                document
                  .getElementById("flowchart-modal")
                  ?.classList.add("hidden")
              }
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-4">
            <div className="flowchart-container relative min-h-[400px]">
              {/* Start */}
              <div
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "start"
                )}`}
              >
                Start
              </div>

              {/* Basic Info */}
              <div
                className={`absolute top-16 left-1/2 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "basicInfo"
                )}`}
              >
                Basic Information
              </div>

              {/* Arrow */}
              <div className="absolute top-11 left-1/2 transform -translate-x-1/2 h-5 w-0.5 bg-gray-600"></div>

              {/* Initial Questions */}
              <div
                className={`absolute top-32 left-1/2 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "initialQuestions"
                )}`}
              >
                Initial Questions
              </div>

              {/* Arrow */}
              <div className="absolute top-27 left-1/2 transform -translate-x-1/2 h-5 w-0.5 bg-gray-600"></div>

              {/* Triage Router */}
              <div
                className={`absolute top-48 left-1/2 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "triage"
                )}`}
              >
                Triage Decision
              </div>

              {/* Arrows to specific pain assessments */}
              <div className="absolute top-56 left-1/4 transform -translate-x-1/2 h-5 w-0.5 bg-gray-600"></div>
              <div className="absolute top-56 left-2/4 transform -translate-x-1/2 h-5 w-0.5 bg-gray-600"></div>
              <div className="absolute top-56 left-3/4 transform -translate-x-1/2 h-5 w-0.5 bg-gray-600"></div>

              {/* Pain Assessments */}
              <div
                className={`absolute top-64 left-1/4 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "headache"
                )}`}
              >
                Headache
              </div>
              <div
                className={`absolute top-64 left-2/4 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "chest"
                )}`}
              >
                Chest Pain
              </div>
              <div
                className={`absolute top-64 left-3/4 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "stomach"
                )}`}
              >
                Stomach Pain
              </div>

              {/* Arrows to priority/emergency */}
              <div className="absolute top-72 left-1/4 transform -translate-x-1/2 h-5 w-0.5 bg-gray-600"></div>
              <div className="absolute top-72 left-2/4 transform -translate-x-1/2 h-5 w-0.5 bg-gray-600"></div>
              <div className="absolute top-72 left-3/4 transform -translate-x-1/2 h-5 w-0.5 bg-gray-600"></div>

              {/* Priority Screens */}
              <div
                className={`absolute top-80 left-1/4 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "priority"
                )}`}
              >
                Priority Assignment
              </div>
              <div
                className={`absolute top-80 left-2/4 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "emergency"
                )}`}
              >
                Emergency
              </div>
              <div
                className={`absolute top-80 left-3/4 transform -translate-x-1/2 p-2 border-2 rounded-md ${getStageColor(
                  "complete"
                )}`}
              >
                Complete
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h4 className="font-medium mb-2">Current Status:</h4>
              <div>
                <p>
                  <strong>Stage:</strong> {state.stage}
                </p>
                <p>
                  <strong>Selected Symptoms:</strong>{" "}
                  {state.selectedAreas.length > 0
                    ? state.selectedAreas.join(", ")
                    : "None"}
                </p>
                {state.currentPriority && (
                  <p>
                    <strong>Priority Level:</strong> {state.currentPriority}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-t flex justify-end">
            <button
              onClick={() =>
                document
                  .getElementById("flowchart-modal")
                  ?.classList.add("hidden")
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
