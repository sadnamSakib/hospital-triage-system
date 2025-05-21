"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  TriageState,
  PhaseType,
  UserInfo,
  QuestionResponse,
  PriorityLevel,
  SymptomType,
  RouteInfo,
} from "../types";

// Initial state
const initialState: TriageState = {
  symptom: "none",
  phase: "start",
  userInfo: null,
  responses: [],
  painScore: 1,
  currentPriority: null,
  isPassingOut: false,
  historyStack: [{ symptom: "none", phase: "start" }],
  inactive: false,
};

// Truth table for priority assignment
// Format: "symptomKey_factorKey" -> priority
// symptomKey: Binary representation of symptoms (e.g., "100" for headache only)
// factorKey: Binary representation of additional factors (fever, vomited, rash, constant)
const truthTable: Record<string, PriorityLevel> = {
  // Headache (100)
  "100_0000": 5, // Basic pain
  "100_0001": 2, // Meningitis
  "100_0010": 2, // Sepsis
  "100_0011": 2, // Meningitis
  "100_0100": 2, // Fetus risk
  "100_0101": 2, // Fetus risk
  "100_0110": 2, // Fetus risk
  "100_0111": 2, // Fetus risk
  "100_1000": 2, // Sepsis
  "100_1001": 2, // Meningitis
  "100_1010": 2, // Sepsis
  "100_1011": 2, // Sepsis
  "100_1100": 2, // Fetus risk
  "100_1101": 2, // Fetus risk
  "100_1110": 2, // Fetus risk
  "100_1111": 2, // Fetus risk

  // Stomach (010)
  "010_0000": 5, // Pain
  "010_0001": 5, // Pain
  "010_0010": 5, // Pain
  "010_0011": 5, // Pain
  "010_0100": 5, // Pain
  "010_0101": 5, // Pain
  "010_0110": 5, // Pain
  "010_0111": 5, // Pain
  "010_1000": 5, // Pain
  "010_1001": 5, // Pain
  "010_1010": 5, // Pain
  "010_1011": 5, // Pain
  "010_1100": 5, // Pain
  "010_1101": 5, // Pain
  "010_1110": 5, // Pain
  "010_1111": 5, // Pain

  // Breathing (001)
  "001_0000": 2, // Asthma
  "001_0001": 2, // Fetus risk
  "001_0010": 2, // Asthma
  "001_0011": 3, // Cold
  "001_0100": 2, // Sepsis
  "001_0101": 2, // Airway risk
  "001_0110": 2, // Sepsis
  "001_0111": 3, // Cold
  "001_1000": 2, // Sepsis
  "001_1001": 2, // Airway risk
  "001_1010": 2, // Sepsis
  "001_1011": 3, // Cold
  "001_1100": 2, // Sepsis
  "001_1101": 2, // Sepsis
  "001_1110": 2, // Airway risk
  "001_1111": 2, // Sepsis

  // Headache + Stomach (110)
  "110_0000": 5, // Pain
  "110_0001": 5, // Pain
  "110_0010": 5, // Pain
  "110_0011": 5, // Pain
  "110_0100": 5, // Pain
  "110_0101": 5, // Pain
  "110_0110": 5, // Pain
  "110_0111": 5, // Pain
  "110_1000": 5, // Pain
  "110_1001": 5, // Pain
  "110_1010": 5, // Pain
  "110_1011": 5, // Pain
  "110_1100": 5, // Pain
  "110_1101": 5, // Pain
  "110_1110": 5, // Pain
  "110_1111": 5, // Pain

  // Headache + Breathing (101)
  "101_0000": 2, // Asthma
  "101_0001": 2, // Fetus risk
  "101_0010": 2, // Asthma
  "101_0011": 2, // Fetus risk
  "101_0100": 2, // Sepsis
  "101_0101": 2, // Airway risk
  "101_0110": 2, // Sepsis
  "101_0111": 2, // Fetus risk
  "101_1000": 2, // Sepsis
  "101_1001": 2, // Airway risk
  "101_1010": 2, // Sepsis
  "101_1011": 2, // Sepsis
  "101_1100": 3, // Cold
  "101_1101": 2, // Sepsis
  "101_1110": 2, // Airway risk
  "101_1111": 2, // Sepsis

  // Stomach + Breathing (011)
  "011_0000": 5, // Pain
  "011_0001": 5, // Pain
  "011_0010": 5, // Pain
  "011_0011": 5, // Pain
  "011_0100": 5, // Pain
  "011_0101": 5, // Pain
  "011_0110": 5, // Pain
  "011_0111": 5, // Pain
  "011_1000": 5, // Pain
  "011_1001": 5, // Pain
  "011_1010": 5, // Pain
  "011_1011": 5, // Pain
  "011_1100": 5, // Pain
  "011_1101": 5, // Pain
  "011_1110": 5, // Pain
  "011_1111": 5, // Pain

  // All symptoms (111)
  "111_0000": 2, // Fetus risk
  "111_0001": 2, // Fetus risk
  "111_0010": 2, // Fetus risk
  "111_0011": 2, // Fetus risk
  "111_0100": 2, // Fetus risk
  "111_0101": 2, // Fetus risk
  "111_0110": 2, // Fetus risk
  "111_0111": 2, // Fetus risk
  "111_1000": 2, // Fetus risk
  "111_1001": 2, // Fetus risk
  "111_1010": 2, // Fetus risk
  "111_1011": 2, // Fetus risk
  "111_1100": 2, // Fetus risk
  "111_1101": 2, // Fetus risk
  "111_1110": 2, // Fetus risk
  "111_1111": 2, // Fetus risk
};

// Action types
type ActionType =
  | { type: "SET_ROUTE"; payload: RouteInfo }
  | { type: "SET_USER_INFO"; payload: UserInfo }
  | { type: "ADD_RESPONSE"; payload: QuestionResponse }
  | { type: "SET_PAIN_SCORE"; payload: number }
  | { type: "SET_PRIORITY"; payload: PriorityLevel }
  | { type: "SET_PASSING_OUT"; payload: boolean }
  | { type: "SET_INACTIVE"; payload: boolean }
  | { type: "GO_BACK" }
  | { type: "RESET" };

// Reducer function
function triageReducer(state: TriageState, action: ActionType): TriageState {
  switch (action.type) {
    case "SET_ROUTE":
      return {
        ...state,
        symptom: action.payload.symptom,
        phase: action.payload.phase,
        historyStack: [...state.historyStack, action.payload],
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "ADD_RESPONSE":
      // Check if response with same ID exists and update it
      const existingIndex = state.responses.findIndex(
        (r) => r.id === action.payload.id
      );

      let newResponses;
      if (existingIndex >= 0) {
        newResponses = [...state.responses];
        newResponses[existingIndex] = action.payload;
      } else {
        newResponses = [...state.responses, action.payload];
      }

      return {
        ...state,
        responses: newResponses,
      };
    case "SET_PAIN_SCORE":
      return {
        ...state,
        painScore: action.payload,
      };
    case "SET_PRIORITY":
      return {
        ...state,
        currentPriority: action.payload,
      };
    case "SET_PASSING_OUT":
      return {
        ...state,
        isPassingOut: action.payload,
      };
    case "SET_INACTIVE":
      return {
        ...state,
        inactive: action.payload,
      };
    case "GO_BACK":
      if (state.historyStack.length <= 1) return state;

      // Remove current route
      const newStack = [...state.historyStack];
      newStack.pop();

      // Get previous route
      const prevRoute = newStack[newStack.length - 1];

      return {
        ...state,
        symptom: prevRoute.symptom,
        phase: prevRoute.phase,
        historyStack: newStack,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// Context type
interface TriageContextType {
  state: TriageState;
  dispatch: React.Dispatch<ActionType>;
  setRoute: (route: RouteInfo) => void;
  setUserInfo: (info: UserInfo) => void;
  addResponse: (response: QuestionResponse) => void;
  setPainScore: (score: number) => void;
  setPriority: (level: PriorityLevel) => void;
  setPassingOut: (isPassingOut: boolean) => void;
  setInactive: (isInactive: boolean) => void;
  goBack: () => void;
  reset: () => void;
  calculatePriority: () => PriorityLevel;
  nextPhase: () => void;
}

// Create context
const TriageContext = createContext<TriageContextType | undefined>(undefined);

// Provider component
export function TriageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(triageReducer, initialState);

  // Helper functions
  const setRoute = (route: RouteInfo) => {
    // Reset inactive state whenever navigation happens
    if (state.inactive) {
      dispatch({ type: "SET_INACTIVE", payload: false });
    }
    dispatch({ type: "SET_ROUTE", payload: route });
  };

  const setUserInfo = (info: UserInfo) => {
    dispatch({ type: "SET_USER_INFO", payload: info });
  };

  const addResponse = (response: QuestionResponse) => {
    dispatch({ type: "ADD_RESPONSE", payload: response });
  };

  const setPainScore = (score: number) => {
    dispatch({ type: "SET_PAIN_SCORE", payload: score });
  };

  const setPriority = (level: PriorityLevel) => {
    dispatch({ type: "SET_PRIORITY", payload: level });
  };

  const setPassingOut = (isPassingOut: boolean) => {
    dispatch({ type: "SET_PASSING_OUT", payload: isPassingOut });
  };

  const setInactive = (isInactive: boolean) => {
    dispatch({ type: "SET_INACTIVE", payload: isInactive });
  };

  const goBack = () => {
    dispatch({ type: "GO_BACK" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  // Create a key for the truth table lookup
  const createTruthTableKey = (): string => {
    // Create symptom key (3 bits: headache, stomach, breathing)
    const hasHeadache = state.symptom === "headache" ? "1" : "0";
    const hasStomach = state.symptom === "stomach" ? "1" : "0";
    const hasBreathing = state.symptom === "breathing" ? "1" : "0";
    const symptomKey = `${hasHeadache}${hasStomach}${hasBreathing}`;

    // Create factor key (4 bits based on responses)
    const hasFever = state.responses.some(
      (r) => r.id === "hasFever" && r.answer === true
    )
      ? "1"
      : "0";
    const hasVomited = state.responses.some(
      (r) => r.id === "hasVomited" && r.answer === true
    )
      ? "1"
      : "0";
    const hasRash = state.responses.some(
      (r) => r.id === "hasRash" && r.answer === true
    )
      ? "1"
      : "0";
    const isPainConstant = state.responses.some(
      (r) => r.id === "painConstant" && r.answer === true
    )
      ? "1"
      : "0";

    const factorKey = `${hasFever}${hasVomited}${hasRash}${isPainConstant}`;

    return `${symptomKey}_${factorKey}`;
  };

  // Calculate priority based on symptoms and responses
  const calculatePriority = (): PriorityLevel => {
    // Check for chest pain - always Priority 1
    if (state.symptom === "chest") {
      setPriority(1);
      return 1;
    }

    // Check for breathing difficulty with passing out - Priority 1
    if (state.symptom === "breathing" && state.isPassingOut) {
      setPriority(1);
      return 1;
    }

    const painScore = state.painScore;

    let calculatedPriority: PriorityLevel;
    if (painScore > 7) {
      calculatedPriority = 2;
    } else if (painScore >= 5 && painScore <= 7) {
      calculatedPriority = 3;
    } else if (painScore >= 3 && painScore < 5) {
      calculatedPriority = 4;
    } else {
      calculatedPriority = 5;
    }

    // For breathing difficulty without passing out - use Priority 3
    if (state.symptom === "breathing" && !state.isPassingOut) {
      calculatedPriority = 3;
    }
    // Look up in truth table
    // const key = createTruthTableKey();
    // if (truthTable[key]) {
    //   const tablePriority = truthTable[key];
    //   setPriority(tablePriority);
    //   return tablePriority;
    // }

    // If not in truth table, use pain score logic

    setPriority(calculatedPriority);
    return calculatedPriority;
  };

  // Determine the next phase based on current phase
  const nextPhase = () => {
    let nextPhase: PhaseType;
    const currentPhase = state.phase;

    switch (currentPhase) {
      case "start":
        nextPhase = "basicInfo";
        break;
      case "basicInfo":
        nextPhase = "initialSymptoms";
        break;
      case "initialSymptoms":
        nextPhase = "phase1";
        break;
      case "phase1":
        nextPhase = "phase2";
        break;
      case "phase2":
        nextPhase = "phase3";
        break;
      case "phase3":
        nextPhase = "phase4";
        break;
      case "phase4":
        // If chest pain or breathing with passing out, go to emergency
        if (
          state.symptom === "chest" ||
          (state.symptom === "breathing" && state.isPassingOut)
        ) {
          nextPhase = "emergency";
        } else {
          nextPhase = "phase5";
        }
        break;
      case "phase5":
        // For stomach pain, check priority before going to phase 6
        if (state.symptom === "stomach") {
          const priority = calculatePriority();
          if (priority < 2) {
            nextPhase = "phase6";
          } else {
            nextPhase = "priority";
          }
        } else {
          nextPhase = "phase6";
        }
        break;
      case "phase6":
        nextPhase = "priority";
        break;
      default:
        nextPhase = "complete";
    }

    setRoute({ symptom: state.symptom, phase: nextPhase });
  };

  return (
    <TriageContext.Provider
      value={{
        state,
        dispatch,
        setRoute,
        setUserInfo,
        addResponse,
        setPainScore,
        setPriority,
        setPassingOut,
        setInactive,
        goBack,
        reset,
        calculatePriority,
        nextPhase,
      }}
    >
      {children}
    </TriageContext.Provider>
  );
}

// Custom hook for using the triage context
export function useTriageContext() {
  const context = useContext(TriageContext);
  if (context === undefined) {
    throw new Error("useTriageContext must be used within a TriageProvider");
  }
  return context;
}
