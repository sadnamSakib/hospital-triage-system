"use client";

import React, { useEffect, useRef } from "react";
import { useTriageContext } from "../../context/TriageContext";

// Standalone component to handle inactivity timer
export default function InactivityTimer() {
  const { state, setInactive } = useTriageContext();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any existing timer
  const clearInactivityTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Start a new timer
  const startInactivityTimer = () => {
    // Only start timer if we're on the start screen
    if (state.phase === "start") {
      clearInactivityTimer(); // Clear any existing timer first
      timerRef.current = setTimeout(() => {
        setInactive(true);
      }, 30000); // 30 seconds
    }
  };

  // Reset timer on user activity
  const handleUserActivity = () => {
    // Only handle for start screen
    if (state.phase === "start") {
      setInactive(false); // Reset inactive state if it was set
      startInactivityTimer(); // Restart the timer
    }
  };

  // Set up timer and event listeners based on current phase
  useEffect(() => {
    // Only run the timer on the start screen
    if (state.phase === "start") {
      // Start the timer
      startInactivityTimer();

      // Add event listeners
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("mousedown", handleUserActivity);
      window.addEventListener("keypress", handleUserActivity);
      window.addEventListener("touchstart", handleUserActivity);

      // Clean up function
      return () => {
        clearInactivityTimer();
        window.removeEventListener("mousemove", handleUserActivity);
        window.removeEventListener("mousedown", handleUserActivity);
        window.removeEventListener("keypress", handleUserActivity);
        window.removeEventListener("touchstart", handleUserActivity);
      };
    } else {
      // If we're not on the start screen, make sure timer is cleared
      // and inactive state is reset
      clearInactivityTimer();
      if (state.inactive) {
        setInactive(false);
      }
    }
  }, [state.phase, setInactive]);

  // This is just a utility component - no visible UI
  return null;
}
