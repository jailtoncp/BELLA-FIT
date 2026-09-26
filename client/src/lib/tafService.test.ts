import { describe, expect, it } from "vitest";
import { appendTafAttempt, formatTafValue, getTafBest, TAF_EXERCISES } from "./tafService";
import type { TafAttempt } from "../types";

const makeAttempt = (id: string, exerciseId: string, value: number, measuredAt: string, unit: TafAttempt["unit"] = "s"): TafAttempt => ({ id, exerciseId, value, measuredAt, unit });

describe("TAF performance tracking", () => {
  it("keeps the TAF catalog restricted to the dedicated aptitude modalities", () => {
    expect(TAF_EXERCISES.map((exercise) => exercise.id)).toEqual([
      "abdominal-remador", "corrida-12-min", "tiro-50-m", "barra-isometrica", "barra-fixa", "salto-horizontal", "subida-corda", "shuttle-run", "flexao-solo",
    ]);
    expect(TAF_EXERCISES.every((exercise) => exercise.purpose && exercise.muscles && exercise.cue)).toBe(true);
  });

  it("assigns a distinct schematic or attributed demonstration to every modality", () => {
    expect(TAF_EXERCISES.map((exercise) => exercise.demo)).toEqual([
      "rower", "distance-run", "sprint", "static-bar", "pull-up", "jump", "rope", "shuttle", "push-up",
    ]);
    expect(new Set(TAF_EXERCISES.map((exercise) => exercise.demo)).size).toBe(TAF_EXERCISES.length);
  });

  it("stores attempts newest-first without changing the original array", () => {
    const original = [makeAttempt("old", "tiro-50-m", 9.8, "2026-09-01")];
    const result = appendTafAttempt(original, makeAttempt("new", "tiro-50-m", 9.4, "2026-09-20"));
    expect(result.map((item) => item.id)).toEqual(["new", "old"]);
    expect(original.map((item) => item.id)).toEqual(["old"]);
  });

  it("uses lower values for time tests and higher values for distance/repetition tests", () => {
    const sprint = TAF_EXERCISES.find((exercise) => exercise.id === "tiro-50-m")!;
    const run = TAF_EXERCISES.find((exercise) => exercise.id === "corrida-12-min")!;
    const attempts = [
      makeAttempt("a", sprint.id, 9.7, "2026-09-01"), makeAttempt("b", sprint.id, 9.5, "2026-09-10"),
      makeAttempt("c", run.id, 1900, "2026-09-01", "m"), makeAttempt("d", run.id, 2050, "2026-09-10", "m"),
    ];
    expect(getTafBest(attempts, sprint)).toBe(9.5);
    expect(getTafBest(attempts, run)).toBe(2050);
  });

  it("does not mix results with a unit that differs from the exercise metric", () => {
    const sprint = TAF_EXERCISES.find((exercise) => exercise.id === "tiro-50-m")!;
    expect(getTafBest([makeAttempt("wrong-unit", sprint.id, 900, "2026-09-15", "m")], sprint)).toBeNull();
  });

  it("formats units in Portuguese and returns null when there is no mark", () => {
    const rower = TAF_EXERCISES.find((exercise) => exercise.id === "abdominal-remador")!;
    expect(formatTafValue(1, "reps")).toBe("1 repetição");
    expect(formatTafValue(23, "reps")).toBe("23 repetições");
    expect(formatTafValue(9.45, "s")).toContain("9,45 s");
    expect(getTafBest([], rower)).toBeNull();
  });
});
