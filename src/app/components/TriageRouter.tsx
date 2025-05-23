"use client";
import React from "react";
import { useTriageContext } from "../context/TriageContext";

// Common components
import StartScreen from "./common/StartScreen";
import BasicInfoForm from "./common/BasicInfoForm";
import InitialSymptoms from "./common/InitialSymptoms";
import EmergencyScreen from "./common/EmergencyScreen";
import PriorityScreen from "./common/PriorityScreen";
import CompleteScreen from "./common/CompleteScreen";
import InactiveScreen from "./common/InactiveScreen";

// Headache components
import HeadachePhase1 from "./headache/Phase1";
import HeadachePhase2 from "./headache/Phase2";
import HeadachePhase3 from "./headache/Phase3";
import HeadachePhase4 from "./headache/Phase4";
import HeadachePhase5 from "./headache/Phase5";
import HeadachePhase6 from "./headache/Phase6";

// Chest pain components
import ChestPhase1 from "./chest/Phase1";
import ChestPhase2 from "./chest/Phase2";
import ChestPhase3 from "./chest/Phase3";
import ChestPhase4 from "./chest/Phase4";

// Stomach pain components
import StomachPhase1 from "./stomach/Phase1";
import StomachPhase2 from "./stomach/Phase2";
import StomachPhase3 from "./stomach/Phase3";
import StomachPhase4 from "./stomach/Phase4";
import StomachPhase5 from "./stomach/Phase5";
import StomachPhase6 from "./stomach/Phase6";

// Breathing difficulty components
import BreathingPhase1 from "./breathing/Phase1";
import BreathingPhase2 from "./breathing/Phase2";
import BreathingPhase3 from "./breathing/Phase3";
import BreathingPhase4 from "./breathing/Phase4";
import BreathingPhase5 from "./breathing/Phase5";
import BreathingPhase6 from "./breathing/Phase6";

export function TriageRouter() {
  const { state } = useTriageContext();

  // Extract current phase and symptom from state
  const { phase, symptom, inactive } = state;

  // Handle the inactive state
  if (inactive) {
    return <InactiveScreen />;
  }

  // Common phases that don't depend on symptom type
  switch (phase) {
    case "start":
      return <StartScreen />;
    case "basicInfo":
      return <BasicInfoForm />;
    case "initialSymptoms":
      return <InitialSymptoms />;
    case "emergency":
      return <EmergencyScreen />;
    case "priority":
      return <PriorityScreen />;
    case "complete":
      return <CompleteScreen />;
  }

  // Phases that depend on the current symptom
  switch (symptom) {
    case "headache":
      switch (phase) {
        case "phase1":
          return <HeadachePhase1 />;
        case "phase2":
          return <HeadachePhase2 />;
        case "phase3":
          return <HeadachePhase3 />;
        case "phase4":
          return <HeadachePhase4 />;
        case "phase5":
          return <HeadachePhase5 />;
        case "phase6":
          return <HeadachePhase6 />;
        default:
          return <StartScreen />;
      }

    case "chest":
      switch (phase) {
        case "phase1":
          return <ChestPhase1 />;
        case "phase2":
          return <ChestPhase2 />;
        case "phase3":
          return <ChestPhase3 />;
        case "phase4":
          return <ChestPhase4 />;
        default:
          return <StartScreen />;
      }

    case "stomach":
      switch (phase) {
        case "phase1":
          return <StomachPhase1 />;
        case "phase2":
          return <StomachPhase2 />;
        case "phase3":
          return <StomachPhase3 />;
        case "phase4":
          return <StomachPhase4 />;
        case "phase5":
          return <StomachPhase5 />;
        case "phase6":
          return <StomachPhase6 />;
        default:
          return <StartScreen />;
      }

    case "breathing":
      switch (phase) {
        case "phase1":
          return <BreathingPhase1 />;
        case "phase2":
          return <BreathingPhase2 />;
        case "phase3":
          return <BreathingPhase3 />;
        case "phase4":
          return <BreathingPhase4 />;
        case "phase5":
          return <BreathingPhase5 />;
        case "phase6":
          return <BreathingPhase6 />;
        default:
          return <StartScreen />;
      }

    default:
      return <StartScreen />;
  }
}

// Helper for tests: get component for phase and symptom
import type { SymptomType, PhaseType } from "../types";
export function getPhaseComponent(symptom: SymptomType, phase: PhaseType) {
  switch (symptom) {
    case "headache":
      switch (phase) {
        case "phase1": return HeadachePhase1;
        case "phase2": return HeadachePhase2;
        case "phase3": return HeadachePhase3;
        case "phase4": return HeadachePhase4;
        case "phase5": return HeadachePhase5;
        case "phase6": return HeadachePhase6;
        default: return StartScreen;
      }
    case "chest":
      switch (phase) {
        case "phase1": return ChestPhase1;
        case "phase2": return ChestPhase2;
        case "phase3": return ChestPhase3;
        case "phase4": return ChestPhase4;
        default: return StartScreen;
      }
    case "stomach":
      switch (phase) {
        case "phase1": return StomachPhase1;
        case "phase2": return StomachPhase2;
        case "phase3": return StomachPhase3;
        case "phase4": return StomachPhase4;
        case "phase5": return StomachPhase5;
        case "phase6": return StomachPhase6;
        default: return StartScreen;
      }
    case "breathing":
      switch (phase) {
        case "phase1": return BreathingPhase1;
        case "phase2": return BreathingPhase2;
        case "phase3": return BreathingPhase3;
        case "phase4": return BreathingPhase4;
        case "phase5": return BreathingPhase5;
        case "phase6": return BreathingPhase6;
        default: return StartScreen;
      }
    default:
      return StartScreen;
  }
}
