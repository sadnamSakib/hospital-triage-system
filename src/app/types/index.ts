// types/index.ts

// User information
export interface UserInfo {
  name: string;
  dateOfBirth: string;
  sex: "male" | "female" | "other";
}

// Pain location types
export type PainLocation = "left" | "middle" | "right";

// Pain areas
export type PainArea = "headache" | "chest" | "stomach" | "breathing";

// Question response
export interface QuestionResponse {
  id: string;
  answer: string | number | boolean;
}

// Priority levels
export type PriorityLevel = 1 | 2 | 3 | 4 | 5;

// Application states
export type TriageStage =
  | "start"
  | "welcome"
  | "basicInfo"
  | "initialQuestions"
  | "triage"
  | "headache"
  | "chest"
  | "stomach"
  | "breathing"
  | "painAssessment"
  | "followUp"
  | "priority"
  | "emergency"
  | "complete";

// State for the triage context
export interface TriageState {
  stage: TriageStage;
  userInfo: UserInfo | null;
  responses: QuestionResponse[];
  currentPriority: PriorityLevel | null;
  selectedAreas: PainArea[];
  painScores: Record<PainArea, number>;
  history: TriageStage[];
}
