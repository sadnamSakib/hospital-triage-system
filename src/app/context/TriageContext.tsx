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
  PainScores,
} from "../types";

// Initial state
const initialState: TriageState = {
  symptom: "none",
  phase: "start",
  userInfo: null,
  responses: [],
  painScore: 0,
  painScores: {
    headache: 0,
    chest: 0,
    stomach: 0,
    breathing: 0,
  },
  currentPriority: null,
  isPassingOut: false,
  historyStack: [{ symptom: "none", phase: "start" }],
  inactive: false,
};

// Action types
type ActionType =
  | { type: "SET_ROUTE"; payload: RouteInfo }
  | { type: "SET_USER_INFO"; payload: UserInfo }
  | { type: "ADD_RESPONSE"; payload: QuestionResponse }
  | { type: "SET_PAIN_SCORE"; payload: { symptom?: string; score: number } }
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
      if (action.payload.symptom) {
        // Update specific symptom pain score
        return {
          ...state,
          painScores: {
            ...state.painScores,
            [action.payload.symptom]: action.payload.score,
          },
          // Also update general pain score if it's the current symptom
          painScore:
            state.symptom === action.payload.symptom
              ? action.payload.score
              : state.painScore,
        };
      } else {
        // Update general pain score
        return {
          ...state,
          painScore: action.payload.score,
          // Also update specific symptom pain score if applicable
          painScores: {
            ...state.painScores,
            [state.symptom]: action.payload.score,
          },
        };
      }
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
  setPainScore: (symptomOrScore: string | number, score?: number) => void;
  setPriority: (level: PriorityLevel) => void;
  setPassingOut: (isPassingOut: boolean) => void;
  setInactive: (isInactive: boolean) => void;
  goBack: () => void;
  reset: () => void;
  calculatePriority: (updateState?: boolean) => PriorityLevel;
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

  // Updated to handle both individual symptom scores and general score
  const setPainScore = (symptomOrScore: string | number, score?: number) => {
    if (typeof symptomOrScore === "string" && typeof score === "number") {
      // Setting score for a specific symptom
      dispatch({
        type: "SET_PAIN_SCORE",
        payload: { symptom: symptomOrScore, score },
      });
    } else if (typeof symptomOrScore === "number") {
      // Setting general score
      dispatch({
        type: "SET_PAIN_SCORE",
        payload: { score: symptomOrScore },
      });
    }
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

  // Calculate priority based on symptoms, pain level, and responses
  // Updated to not automatically set state by default
  const calculatePriority = (updateState = false): PriorityLevel => {
    // Check for immediate emergency conditions
    
    // 1. Chest pain - always Priority 1 (Emergency)
    if (state.symptom === "chest") {
      if (updateState) setPriority(1);
      return 1;
    }

    // 2. Breathing difficulty with passing out - Priority 1 (Emergency)
    if (state.symptom === "breathing" && state.isPassingOut) {
      if (updateState) setPriority(1);
      return 1;
    }

    // 3. Severe pain (≥7) - Priority 2 (Very Urgent)
    const painScore = state.symptom === "headache" || state.symptom === "stomach" ? 
                      state.painScore : 
                      state.painScores[state.symptom] || 0;
                      
    if (painScore >= 7) {
      if (updateState) setPriority(2);
      return 2;
    }

    // Check for specific condition combinations based on responses
    
    // Breathing difficulty with special conditions
    if (state.symptom === "breathing") {
      const hasAsthma = state.responses.some(r => r.id === "hasAsthma" && r.answer === true);
      const hasFever = state.responses.some(r => r.id === "hasFever" && r.answer === true);
      
      if (hasAsthma) {
        if (updateState) setPriority(2); // Asthma with breathing difficulty = Priority 2
        return 2;
      }
      
      if (hasFever) {
        if (updateState) setPriority(3); // Cold/fever with breathing difficulty = Priority 3
        return 3;
      }
      
      // Default for breathing difficulties
      if (updateState) setPriority(3);
      return 3;
    }
    
    // Headache with special conditions
    if (state.symptom === "headache") {
      const hasVomited = state.responses.some(r => r.id === "hasVomited" && r.answer === true);
      const hasFever = state.responses.some(r => r.id === "hasFever" && r.answer === true);
      const hasRash = state.responses.some(r => r.id === "hasRash" && r.answer === true);
      
      if (hasVomited && hasRash) {
        if (updateState) setPriority(2); // Potential meningitis = Priority 2
        return 2;
      }
      
      if (hasFever) {
        if (updateState) setPriority(3); // Fever with headache = Priority 3
        return 3;
      }
    }
    
    // Stomach pain with special conditions
    if (state.symptom === "stomach") {
      const hasVomited = state.responses.some(r => r.id === "hasVomited" && r.answer === true);
      const isPainConstant = state.responses.some(r => r.id === "painConstant" && r.answer === true);
      
      if (hasVomited && isPainConstant) {
        if (updateState) setPriority(3); // Constant pain with vomiting = Priority 3
        return 3;
      }
    }

    // Use pain score for default priority calculation
    let calculatedPriority: PriorityLevel;
    
    if (painScore >= 5 && painScore < 7) {
      calculatedPriority = 3;
    } else if (painScore >= 3 && painScore < 5) {
      calculatedPriority = 4;
    } else {
      calculatedPriority = 5;
    }

    if (updateState) setPriority(calculatedPriority);
    return calculatedPriority;
  };

  // Determine the next phase based on current phase and symptom
  // Updated to match flowchart progression
  const nextPhase = () => {
    let nextPhase: PhaseType;
    const currentPhase = state.phase;
    const currentSymptom = state.symptom;

    // Common phase progression
    switch (currentPhase) {
      case "start":
        nextPhase = "basicInfo";
        break;
      case "basicInfo":
        nextPhase = "initialSymptoms";
        break;
      case "initialSymptoms":
        // Special case for chest pain - go directly to emergency
        if (currentSymptom === "chest") {
          nextPhase = "emergency";
        } else {
          nextPhase = "phase1";
        }
        break;
      case "phase1":
        // Handle high pain scores that go directly to emergency
        if ((currentSymptom === "headache" || currentSymptom === "stomach") && 
            state.painScore >= 7) {
          nextPhase = "emergency";
        } else if (currentSymptom === "breathing" && state.isPassingOut) {
          nextPhase = "emergency";
        } else {
          nextPhase = "phase2";
        }
        break;
      case "phase2":
        nextPhase = "phase3";
        break;
      case "phase3":
        nextPhase = "phase4";
        break;
      case "phase4":
        // Check priority before proceeding - emergency for priority 1
        if (state.currentPriority === 1) {
          nextPhase = "emergency";
        } else {
          nextPhase = "phase5";
        }
        break;
      case "phase5":
        nextPhase = "phase6";
        break;
      case "phase6":
        // After phase6, go to priority screen to show final triage result
        nextPhase = "priority";
        break;
      case "emergency":
      case "priority":
        nextPhase = "complete";
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