// types/index.ts

// User information
export interface UserInfo {
  name: string;
  dateOfBirth: string;
  sex: "male" | "female" | "other";
}

// Symptom types
export type SymptomType =
  | "headache"
  | "chest"
  | "stomach"
  | "breathing"
  | "none";

// Pain location types
export type PainLocation = "left" | "middle" | "right" | "front" | "back";

// Phase types - all possible phases in the system
export type PhaseType =
  | "start" // Start screen
  | "inactive" // Inactivity screen
  | "basicInfo" // Collecting user info
  | "initialSymptoms" // Initial symptom selection
  | "phase1" // Basic information
  | "phase2" // Choose symptom path
  | "phase3" // Determine symptom severity
  | "phase4" // Assign initial priority
  | "phase5" // Unique questions for each symptom
  | "phase6" // Common questions
  | "emergency" // Emergency screen
  | "priority" // Priority assignment result
  | "complete"; // Complete screen

// Question response
export interface QuestionResponse {
  id: string;
  answer: string | number | boolean | object;
}

// Priority levels
export type PriorityLevel = 1 | 2 | 3 | 4 | 5;

// Truth table entry format
export interface TruthTableKey {
  symptomKey: string; // Binary representation of symptoms (e.g., "100" for headache only)
  factorKey: string; // Binary representation of additional factors (e.g., "0001" for constant pain)
}

// Component route information
export interface RouteInfo {
  symptom: SymptomType;
  phase: PhaseType;
}

// State for the triage context
export interface TriageState {
  symptom: SymptomType;
  phase: PhaseType;
  userInfo: UserInfo | null;
  responses: QuestionResponse[];
  painScore: number;
  currentPriority: PriorityLevel | null;
  isPassingOut: boolean;
  historyStack: RouteInfo[];
  inactive: boolean;
}

// Additional question types for specific symptoms
export interface HeadacheQuestions {
  location: PainLocation;
  hasFever: boolean;
  hasVomited: boolean;
  hasRash: boolean;
}

export interface StomachQuestions {
  location: PainLocation;
  isNauseous: boolean;
  hasVomited: boolean;
  hasRegularBowelMotions: boolean;
  isPainWorseWhenStill: boolean;
  painOccurredBefore: boolean;
  painTimeAgo?: "month" | "several" | "more";
  takingMedication: boolean;
  medication?: string;
}

export interface BreathingQuestions {
  hasCough: boolean;
  hasFever: boolean;
  hasAsthma: boolean;
  isPassingOut: boolean;
}

export interface ChestQuestions {
  location: PainLocation;
}

export interface CommonQuestions {
  painConstant: boolean;
  painDuration: "hour" | "day" | "week" | "longer";
}
