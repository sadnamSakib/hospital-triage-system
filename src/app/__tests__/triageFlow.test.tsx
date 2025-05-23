import React from "react";
import { render, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { TriageProvider, resetTriageSerial } from "../context/TriageContext";
import { TriageRouter } from "../components/TriageRouter";
import type { TriageTestCase } from "../types";
import "@testing-library/jest-dom";

// Increase Jest timeout for all tests in this file (e.g., to 30 seconds)
// jest.setTimeout(30000); // Uncomment if timeouts are persistent despite fixes

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// --- Corrected Test Cases (Focus on BreathingPhase6 answers) ---
const testCases: TriageTestCase[] = [
  {
    name: "Headache - Meningitis Path (Rash)",
    symptom: "headache",
    painScore: 4,
    answers: {
      phase5: { "Do you have a cold, and/or do you had a fever?": "no", "Are you pregnant?": "no", "Have you vomited since the headache began?": "no", "Do you have a rash?": "yes" },
      phase6: { "How long have you been experiencing this headache?": "Within the last day", "Right now, does the pain come and go, or is it constant?": "Comes and goes" }
    },
    expected: { diagnosis: "Meningitis", tokenPrefix: "H-", priority: 2 },
  },
  {
    name: "Headache - Fetus Risk Path (Pregnant)",
    symptom: "headache",
    painScore: 3,
    answers: {
      phase5: { "Do you have a cold, and/or do you had a fever?": "no", "Are you pregnant?": "yes", "Have you vomited since the headache began?": "no", "Do you have a rash?": "no" },
      phase6: { "How long have you been experiencing this headache?": "Within the last day", "Right now, does the pain come and go, or is it constant?": "Comes and goes" }
    },
    expected: { diagnosis: "Fetus risk", tokenPrefix: "H-", priority: 5 },
  },
  {
    name: "Headache - Sepsis Path (Vomited)",
    symptom: "headache",
    painScore: 5,
    answers: {
      phase5: { "Do you have a cold, and/or do you had a fever?": "no", "Are you pregnant?": "no", "Have you vomited since the headache began?": "yes", "Do you have a rash?": "no" },
      phase6: { "How long have you been experiencing this headache?": "Within the last day", "Right now, does the pain come and go, or is it constant?": "Comes and goes" }
    },
    expected: { diagnosis: "Sepsis", tokenPrefix: "H-", priority: 3 },
  },
  {
    name: "Headache - Plain Pain Path",
    symptom: "headache",
    painScore: 2,
    answers: {
      phase5: { "Do you have a cold, and/or do you had a fever?": "no", "Are you pregnant?": "no", "Have you vomited since the headache began?": "no", "Do you have a rash?": "no" },
      phase6: { "How long have you been experiencing this headache?": "Within the last day", "Right now, does the pain come and go, or is it constant?": "Comes and goes" }
    },
    expected: { diagnosis: "Pain", tokenPrefix: "H-", priority: 5 },
  },
  {
    name: "Stomach - Sepsis Code Path Example",
    symptom: "stomach",
    painScore: 4,
    answers: {
      phase5: { "Are you feeling nauseous?": "no", "Have you vomited since you began feeling this pain?": "no", "Have you experienced regular bowel motions in the last week?": "yes", "Is the pain worse when you stay still?": "no" },
      phase6: { "Is the pain:": "front", "Where is the pain located? (Select all that apply)": { middle: true }, "Right now, does the pain come and go, or is it constant?": "Comes and goes", "How long have you had this pain?": "Within the last day", "Has this pain occurred before, after a long period of not feeling it?": "no", "Are you taking medication?": "no" }
    },
    expected: { diagnosis: "Sepsis", tokenPrefix: "S-", priority: 4 },
  },
  {
    name: "Stomach - Pain Path (No specific symptoms)",
    symptom: "stomach",
    painScore: 3,
    answers: {
      phase5: { "Are you feeling nauseous?": "no", "Have you vomited since you began feeling this pain?": "no", "Have you experienced regular bowel motions in the last week?": "no", "Is the pain worse when you stay still?": "no" },
      phase6: { "Is the pain:": "front", "Where is the pain located? (Select all that apply)": { left: true }, "Right now, does the pain come and go, or is it constant?": "Comes and goes", "How long have you had this pain?": "Within the last hour", "Has this pain occurred before, after a long period of not feeling it?": "no", "Are you taking medication?": "no" }
    },
    expected: { diagnosis: "Pain", tokenPrefix: "S-", priority: 4 },
  },
  // --- CORRECTED ANSWERS FOR BREATHING PHASE 6 ---
  {
    name: "Breathing - Asthma Path (Has Asthma)",
    symptom: "breathing",
    answers: {
      phase1Custom: { "Are you feeling like you may soon pass out or black out?": "No" }, // Assuming "No" is the text
      phase2: { "Do you have a cough?": "No" },
      phase3: { "Do you have a cold, and/or do you had a fever?": "No" },
      phase4: { "Do you have asthma?": "Yes" },
      phase5: { "Are you pregnant?": "No" },
      phase6: { "How long have you been experiencing this breathing difficulty?": "Within the last day", "Right now, does the breathing difficulty come and go, or is it constant?": "Comes and goes" }
    },
    expected: { diagnosis: "Asthma", tokenPrefix: "B-", priority: 2 },
  },
  {
    name: "Breathing - Fetus Risk Path (Pregnant)",
    symptom: "breathing",
    answers: {
      phase1Custom: { "Are you feeling like you may soon pass out or black out?": "No" },
      phase2: { "Do you have a cough?": "No" },
      phase3: { "Do you have a cold, and/or do you had a fever?": "No" },
      phase4: { "Do you have asthma?": "No" },
      phase5: { "Are you pregnant?": "Yes" },
      phase6: { "How long have you been experiencing this breathing difficulty?": "Within the last day", "Right now, does the breathing difficulty come and go, or is it constant?": "Comes and goes" }
    },
    expected: { diagnosis: "Fetus risk", tokenPrefix: "B-", priority: 3 },
  },
  {
    name: "Breathing - Sepsis Path (Fever)",
    symptom: "breathing",
    answers: {
      phase1Custom: { "Are you feeling like you may soon pass out or black out?": "No" },
      phase2: { "Do you have a cough?": "No" },
      phase3: { "Do you have a cold, and/or do you had a fever?": "Yes" },
      phase4: { "Do you have asthma?": "No" },
      phase5: { "Are you pregnant?": "No" },
      phase6: { "How long have you been experiencing this breathing difficulty?": "Within the last day", "Right now, does the breathing difficulty come and go, or is it constant?": "Constant" }
    },
    expected: { diagnosis: "Sepsis", tokenPrefix: "B-", priority: 3 },
  },
  {
    name: "Chest Pain - Direct to Emergency",
    symptom: "chest",
    expected: { diagnosis: "EmergencyScreen", tokenPrefix: "EMERGENCY", priority: 1 },
  },
];

async function answerQuestions(questionsAndAnswers: { [questionGroupLabel: string]: string | boolean | Record<string, boolean> }) {
  for (const [questionGroupLabel, answerValue] of Object.entries(questionsAndAnswers)) {
    if (questionGroupLabel === "Where is the pain located? (Select all that apply)" && typeof answerValue === 'object' && answerValue !== null) {
      const checkboxAnswers = answerValue as Record<string, boolean>;
      const fieldset = await screen.findByText(questionGroupLabel); // Find the legend/label for the checkbox group
      const groupContainer = fieldset.closest('div[class*="mb-6"]'); // Adjust selector to find the actual container of checkboxes

      if (!groupContainer) {
        console.error(`Could not find container for checkbox group: "${questionGroupLabel}"`);
        continue;
      }
      for (const [site, checked] of Object.entries(checkboxAnswers)) {
        try {
          // Checkbox labels might be "Left side", "Middle", "Right side"
          const checkbox = within(groupContainer).getByRole('checkbox', { name: new RegExp(site, "i") });
          if ((checkbox as HTMLInputElement).checked !== checked) {
            fireEvent.click(checkbox);
          }
        } catch (e) {
          console.warn(`Checkbox not found for pain location: "${site}" in group "${questionGroupLabel}". Error: ${e}`);
        }
      }
    } else { // Handles radio buttons and simple text inputs
      const optionLabelText = typeof answerValue === 'string' ? answerValue : (answerValue ? "Yes" : "No");
      try {
        // Find the text of the question/group label on the screen
        const questionLabelElement = await screen.findByText(new RegExp(questionGroupLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i"));
        
        // Try to find the radio group container relative to the question label.
        // This assumes the RadioGroup renders the label then the options.
        // The div containing options is usually a sibling to the label div, or nested.
        const radioGroupContainer = questionLabelElement.parentElement?.querySelector('div:has(input[type="radio"])') || 
                                  questionLabelElement.closest('div')?.querySelector('div:has(input[type="radio"])');


        if (radioGroupContainer) {
          const radioToClick = within(radioGroupContainer).getByRole('radio', { name: new RegExp(`^${optionLabelText}$`, "i") });
          fireEvent.click(radioToClick);
        } else {
          // Fallback for text inputs if radio group structure isn't found
          const inputElement = screen.queryByLabelText(new RegExp(questionGroupLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i"));
          if (inputElement && typeof answerValue === 'string') {
              fireEvent.change(inputElement, { target: { value: answerValue } });
          } else {
            console.error(`Failed to find suitable radio group container or text input for question: "${questionGroupLabel}"`);
          }
        }
      } catch (e) {
        console.error(`Error interacting with question "${questionGroupLabel}" for answer "${optionLabelText}": ${e}`);
      }
    }
  }
}


describe("Triage System Flow", () => {
  beforeEach(() => {
    localStorageMock.clear();
    resetTriageSerial();
    jest.useRealTimers(); // Ensure real timers are used if timeouts are an issue with fake timers
  });
  afterEach(() => {
    jest.clearAllTimers(); // Clean up timers
  });

  testCases.forEach((testCase) => {
    // Increase timeout for individual tests if needed, especially for complex paths
    it(`should correctly triage: ${testCase.name}`, async () => {
      render(
        <TriageProvider>
          <TriageRouter />
        </TriageProvider>
      );

      fireEvent.click(await screen.findByText(/tap here to begin/i, {}, {timeout: 5000}));
      
      await screen.findByText(/basic information/i, {}, {timeout: 5000});
      fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Test User" } });
      fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: "2000-01-01" } });
      fireEvent.click(screen.getByText('Male', { selector: 'span' }));
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      await screen.findByText(/initial assessment/i, {}, {timeout: 5000});
      expect(screen.getByText(/what is your main symptom\?/i)).toBeInTheDocument();
      const symptomSelect = screen.getByRole('combobox');
      fireEvent.change(symptomSelect, { target: { value: testCase.symptom } });
      fireEvent.click(screen.getByRole('button', { name: /continue/i }));

      if (testCase.symptom === "chest") {
        await screen.findByText(/emergency: medical staff will be notified/i, {}, {timeout: 7000});
        expect(screen.getByText(/priority level: 1 \(highest\)/i)).toBeInTheDocument();
        return; 
      }
      
      const phaseOrder: string[] = ["phase1Custom", "phase1", "phase2", "phase3", "phase4", "phase5", "phase6"];
      const phaseScreenTitles: Record<string, Record<string, RegExp | null>> = {
        headache: {
          phase1: /Headache Assessment - Pain Level/i,
          phase2: /Headache Assessment - Question Chain/i,
          phase3: /Headache Assessment - Severity/i,
          phase4: /Headache Assessment - Initial Priority/i,
          phase5: /Headache Assessment - Additional Questions/i,
          phase6: /Headache Assessment - Additional Information/i,
        },
        stomach: {
          phase1: /Stomach Pain Assessment - Pain Level/i,
          phase2: /Stomach Pain Assessment - Question Chain/i,
          phase3: /Stomach Pain Assessment - Severity/i,
          phase4: /Stomach Pain Assessment - Initial Priority/i,
          phase5: /^Stomach Pain Assessment$/i, 
          phase6: /Stomach Pain Assessment - Phase 6/i,
        },
        breathing: {
          // BreathingPhase1 has the question, not just a title like others.
          phase1Custom: /Are you feeling like you may soon pass out or black out\?/i, 
          phase2: /Do you have a cough\?/i, // Question from BreathingPhase2 acts as title
          phase3: /Do you have a cold, and\/or do you had a fever\?/i, // Question from BreathingPhase3
          phase4: /Do you have asthma\?/i, // Question from BreathingPhase4
          phase5: /Are you pregnant\?/i,    // Question from BreathingPhase5
          phase6: /Breathing Difficulty - Additional Information/i, // Title from BreathingPhase6
        }
      };

      for (const phaseKey of phaseOrder) {
        const currentSymptomScreenTitle = phaseScreenTitles[testCase.symptom as string]?.[phaseKey];
        const phaseAnswers = (testCase.answers as any)[phaseKey];
        
        // Skip phase if not applicable for the symptom or no title/answers
        if (phaseKey === "phase1" && testCase.symptom === "breathing") continue;
        if (phaseKey === "phase1Custom" && testCase.symptom !== "breathing") continue;
        if (!currentSymptomScreenTitle && !phaseAnswers && !(phaseKey === "phase1" && (testCase.symptom === "headache" || testCase.symptom === "stomach"))) continue;

        if (currentSymptomScreenTitle) {
          try {
            await screen.findByText(currentSymptomScreenTitle, {}, { timeout: 7000 });
          } catch (e) {
            console.error(`Timeout or error finding title for ${testCase.symptom} - ${phaseKey}: "${currentSymptomScreenTitle}"`);
            // screen.debug(undefined, 300000); // Log current DOM for debugging
            throw e; // Re-throw to fail test
          }
        } else if (phaseKey !== "phase1Custom" && phaseKey !== "phase1" && phaseAnswers) {
            // If no title is defined for an intermediate phase with answers, wait for a generic element like a continue button
            await screen.findByRole('button', {name: /continue/i}, {timeout: 7000});
        }


        if (phaseKey === "phase1" && (testCase.symptom === "headache" || testCase.symptom === "stomach")) {
          const slider = await screen.findByRole("slider", {}, {timeout: 7000});
          fireEvent.change(slider, { target: { value: testCase.painScore?.toString() || "5" } });
        }
        
        if (phaseAnswers) {
          await answerQuestions(phaseAnswers);
        }
        
        // Determine if this is the last phase that has answers defined for this testCase
        const answerKeys = Object.keys(testCase.answers);
        const lastAnsweredPhaseKey = answerKeys.length > 0 ? answerKeys[answerKeys.length -1] : null;

        // Only click continue if we are not on the last phase that had answers, 
        // OR if it's not phase6 (phase6 has a submit button that ends the question sequence)
        if (phaseKey !== "phase6" || (phaseKey === "phase6" && phaseKey !== lastAnsweredPhaseKey) ) {
             const actionButton = await screen.findByRole('button', { name: /continue/i }, {timeout: 7000});
             fireEvent.click(actionButton);
        } else if (phaseKey === "phase6") { // This is phase6, which should be the last questionnaire phase
            const submitButton = await screen.findByRole('button', { name: /submit/i }, {timeout: 7000});
            fireEvent.click(submitButton);
            break; // Exit loop after submitting phase 6
        }
         // Break after the last phase for which answers are provided, if it's not phase6 already.
         if (phaseKey === lastAnsweredPhaseKey && phaseKey !== "phase6") {
            break;
        }
      }

      await screen.findByText(/triage complete/i, {}, { timeout: 7000 });
      
      // Diagnosis: Find the <p> tag that is a sibling of <h3>Diagnosis:</h3> and has specific classes
      const diagnosisHeading = screen.getByText("Diagnosis:");
      const diagnosisValueElement = diagnosisHeading.nextElementSibling;
      expect(diagnosisValueElement).toHaveClass("text-lg", "font-semibold");
      expect(diagnosisValueElement).toHaveTextContent(new RegExp(testCase.expected.diagnosis, "i"));
      
      // Token: Find the <p> tag that is a sibling of <h3>Your Waiting Token:</h3> and has specific classes
      const tokenHeading = screen.getByText("Your Waiting Token:");
      const tokenValueElement = tokenHeading.nextElementSibling;
      expect(tokenValueElement).toHaveClass("text-2xl", "font-bold");
      expect(tokenValueElement).toHaveTextContent(new RegExp(testCase.expected.tokenPrefix + "\\d+", "i"));
      
    }, 15000); // Increased timeout for this specific test
  });
});