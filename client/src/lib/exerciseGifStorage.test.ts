import { describe, expect, it } from "vitest";
import { MAX_EXERCISE_GIF_BYTES, validateExerciseGif } from "./exerciseGifStorage";

function makeFile(contents: BlobPart[], name = "exercise.gif"): File {
  return new File(contents, name, { type: "image/gif" });
}

describe("local exercise GIF uploads", () => {
  it("accepts a GIF87a header", async () => {
    await expect(validateExerciseGif(makeFile(["GIF87a", new Uint8Array([0, 0, 0])]))).resolves.toBeUndefined();
  });

  it("accepts a GIF89a header", async () => {
    await expect(validateExerciseGif(makeFile(["GIF89a", new Uint8Array([0, 0, 0])]))).resolves.toBeUndefined();
  });

  it("rejects empty and non-GIF files", async () => {
    await expect(validateExerciseGif(makeFile([]))).rejects.toThrow("vazio");
    await expect(validateExerciseGif(makeFile(["not a gif"]))).rejects.toThrow("GIF válido");
  });

  it("rejects files larger than 12 MB", async () => {
    const file = makeFile(["GIF89a", new Uint8Array(MAX_EXERCISE_GIF_BYTES)]);
    await expect(validateExerciseGif(file)).rejects.toThrow("até 12 MB");
  });
});
