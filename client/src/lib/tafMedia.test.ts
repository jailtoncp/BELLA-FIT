import { describe, expect, it } from "vitest";
import { TAF_EXERCISES } from "./tafService";
import { TAF_MEDIA } from "./tafMedia";

describe("TAF animated demonstrations", () => {
  it("maps every dedicated TAF movement to a unique GIF", () => {
    const exerciseDemos = TAF_EXERCISES.map((exercise) => exercise.demo).sort();
    const mediaDemos = Object.keys(TAF_MEDIA).sort();
    expect(mediaDemos).toEqual(exerciseDemos);
    expect(new Set(Object.values(TAF_MEDIA).map((asset) => asset.file)).size).toBe(TAF_EXERCISES.length);
    expect(new Set(Object.values(TAF_MEDIA).map((asset) => asset.posterFile)).size).toBe(TAF_EXERCISES.length);
    expect(Object.values(TAF_MEDIA).every((asset) => asset.file.endsWith(".gif") && asset.storageFile.endsWith(".gif"))).toBe(true);
    expect(Object.values(TAF_MEDIA).every((asset) => asset.posterFile.endsWith(".webp") && asset.posterStorageFile.endsWith(".webp"))).toBe(true);
  });

  it("keeps source and creator credit on the two externally sourced GIFs", () => {
    const sourced = Object.values(TAF_MEDIA).filter((asset) => asset.kind === "sourced");
    expect(sourced).toHaveLength(2);
    expect(sourced.every((asset) => asset.source?.startsWith("https://commons.wikimedia.org/") && asset.credit)).toBe(true);
  });
});
