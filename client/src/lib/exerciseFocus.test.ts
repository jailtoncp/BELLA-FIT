import { describe, expect, it } from "vitest";
import { EXERCISE_FOCUS } from "./exerciseFocus";
import { EXERCISE_CATALOG } from "./catalog";

describe("technical focus for the exercise library", () => {
  it("describes every standard exercise with a purpose and primary muscles", () => {
    expect(Object.keys(EXERCISE_FOCUS).sort()).toEqual(EXERCISE_CATALOG.map((exercise) => exercise.id).sort());
    expect(EXERCISE_CATALOG).toHaveLength(34);
    for (const exercise of EXERCISE_CATALOG) {
      expect(exercise.purpose?.trim(), `${exercise.name} needs a technical purpose`).toBeTruthy();
      expect(exercise.primaryMuscles?.length, `${exercise.name} needs a primary target`).toBeGreaterThan(0);
      expect(Array.isArray(exercise.secondaryMuscles), `${exercise.name} needs a secondary-target list`).toBe(true);
      expect(exercise.primaryMuscles).not.toEqual(expect.arrayContaining([""]));
      expect(exercise.secondaryMuscles).not.toEqual(expect.arrayContaining([""]));
    }
  });

  it("distinguishes chest press from hip flexion in technical labels", () => {
    expect(EXERCISE_FOCUS.supino.primaryMuscles).toContain("Peitoral maior");
    expect(EXERCISE_FOCUS["elevacao-pernas"].primaryMuscles).toContain("Iliopsoas");
    expect(EXERCISE_FOCUS["elevacao-pernas"].secondaryMuscles).toContain("Reto abdominal");
  });
});
