"use client";
import React, { useEffect } from "react";
import { useTriageContext } from "@/app/context/TriageContext";
import { PainArea } from "@/app/types";

export function TriageRouter() {
  const { state, setStage } = useTriageContext();

  useEffect(() => {
    if (state.selectedAreas.length > 0) {
      const firstArea = state.selectedAreas[0];

      switch (firstArea) {
        case "headache":
          setStage("headache");
          break;
        case "chest":
          setStage("chest");
          break;
        case "stomach":
          setStage("stomach");
          break;
        case "breathing":
          setStage("breathing");
          break;
        default:
          setStage("complete");
      }
    } else {
      setStage("complete");
    }
  }, [state.selectedAreas, setStage]);

  return null;
}
