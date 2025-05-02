"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  TriageState,
  TriageStage,
  UserInfo,
  QuestionResponse,
  PriorityLevel,
  PainArea,
} from "../types";

// Initial state
const initialState: TriageState = {
  stage: "start",
  userInfo: null,
  responses: [],
  currentPriority: null,
  selectedAreas: [],
  painScores: {
    headache: 0,
    chest: 0,
    stomach: 0,
    breathing: 0,
  },
  history: ["start"],
};

// Action types
type ActionType =
  | { type: "SET_STAGE"; payload: TriageStage }
  | { type: "SET_USER_INFO"; payload: UserInfo }
  | { type: "ADD_RESPONSE"; payload: QuestionResponse }
  | { type: "SET_PRIORITY"; payload: PriorityLevel }
  | { type: "SELECT_PAIN_AREA"; payload: PainArea }
  | { type: "SET_PAIN_SCORE"; payload: { area: PainArea; score: number } }
  | { type: "GO_BACK" }
  | { type: "RESET" };

// Reducer function
function triageReducer(state: TriageState, action: ActionType): TriageState {
  switch (action.type) {
    case "SET_STAGE":
      return {
        ...state,
        stage: action.payload,
        history: [...state.history, action.payload],
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "ADD_RESPONSE":
      return {
        ...state,
        responses: [...state.responses, action.payload],
      };
    case "SET_PRIORITY":
      return {
        ...state,
        currentPriority: action.payload,
      };
    case "SELECT_PAIN_AREA":
      return {
        ...state,
        selectedAreas: [...state.selectedAreas, action.payload],
      };
    case "SET_PAIN_SCORE":
      return {
        ...state,
        painScores: {
          ...state.painScores,
          [action.payload.area]: action.payload.score,
        },
      };
    case "GO_BACK":
      if (state.history.length <= 1) return state;
      const newHistory = [...state.history];
      newHistory.pop(); // Remove current stage
      const previousStage = newHistory[newHistory.length - 1];
      return {
        ...state,
        stage: previousStage,
        history: newHistory,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// Context
interface TriageContextType {
  state: TriageState;
  dispatch: React.Dispatch<ActionType>;
  setStage: (stage: TriageStage) => void;
  setUserInfo: (info: UserInfo) => void;
  addResponse: (response: QuestionResponse) => void;
  setPriority: (level: PriorityLevel) => void;
  selectPainArea: (area: PainArea) => void;
  setPainScore: (area: PainArea, score: number) => void;
  goBack: () => void;
  reset: () => void;
  calculatePriority: () => void;
}

const TriageContext = createContext<TriageContextType | undefined>(undefined);

// Provider component
export function TriageProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(triageReducer, initialState);

  // Helper functions
  const setStage = (stage: TriageStage) => {
    dispatch({ type: "SET_STAGE", payload: stage });
  };

  const setUserInfo = (info: UserInfo) => {
    dispatch({ type: "SET_USER_INFO", payload: info });
  };

  const addResponse = (response: QuestionResponse) => {
    dispatch({ type: "ADD_RESPONSE", payload: response });
  };

  const setPriority = (level: PriorityLevel) => {
    dispatch({ type: "SET_PRIORITY", payload: level });
  };

  const selectPainArea = (area: PainArea) => {
    dispatch({ type: "SELECT_PAIN_AREA", payload: area });
  };

  const setPainScore = (area: PainArea, score: number) => {
    dispatch({ type: "SET_PAIN_SCORE", payload: { area, score } });
  };

  const goBack = () => {
    dispatch({ type: "GO_BACK" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  // Priority calculation based on pain scores and responses
  const calculatePriority = () => {
    // Get the highest pain score
    const scores = Object.values(state.painScores);
    const maxScore = Math.max(...scores);

    // Check for emergency conditions
    const hasEmergencyCondition = state.responses.some(
      (response) =>
        (response.id === "fainting" && response.answer === true) ||
        (response.id === "breathingDifficulty" && response.answer === true)
    );

    if (hasEmergencyCondition) {
      setPriority(1);
      setStage("emergency");
      return;
    }

    // Assign priority based on max pain score
    if (maxScore >= 9) {
      setPriority(1);
    } else if (maxScore >= 7) {
      setPriority(2);
    } else if (maxScore >= 5) {
      setPriority(3);
    } else if (maxScore >= 3) {
      setPriority(4);
    } else {
      setPriority(5);
    }

    setStage("priority");
  };

  return (
    <TriageContext.Provider
      value={{
        state,
        dispatch,
        setStage,
        setUserInfo,
        addResponse,
        setPriority,
        selectPainArea,
        setPainScore,
        goBack,
        reset,
        calculatePriority,
      }}
    >
      {children}
    </TriageContext.Provider>
  );
}

// Custom hook to use the context
export function useTriageContext() {
  const context = useContext(TriageContext);
  if (context === undefined) {
    throw new Error("useTriageContext must be used within a TriageProvider");
  }
  return context;
}
