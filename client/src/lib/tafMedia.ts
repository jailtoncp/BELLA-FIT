import type { TafDemoKind } from "./tafService";

export interface TafMediaAsset {
  /** File copied from github-pages-assets/taf during the Pages build. */
  file: string;
  posterFile: string;
  /** Uploaded copy served by the Manus preview. */
  storageFile: string;
  posterStorageFile: string;
  /** Original line-art movement drawn for BELLA FIT, or third-party animation. */
  kind: "original" | "sourced";
  source?: string;
  credit?: string;
}

/**
 * Each TAF modality has a looping GIF. Original schematics are drawn by
 * scripts/generate-taf-gifs.py; Commons-sourced demonstrations retain visible credit.
 */
export const TAF_MEDIA: Record<TafDemoKind, TafMediaAsset> = {
  rower: { file: "rower.gif", posterFile: "rower-poster.webp", storageFile: "rower_d630a8f0.gif", posterStorageFile: "rower-poster_cc2c9b3c.webp", kind: "original" },
  "distance-run": { file: "running.gif", posterFile: "running-poster.webp", storageFile: "running-optimized_f290e3b5.gif", posterStorageFile: "running-poster_a89c6a90.webp", kind: "sourced", source: "https://commons.wikimedia.org/wiki/File:Running.gif", credit: "Fengalon · domínio público" },
  sprint: { file: "sprint.gif", posterFile: "sprint-poster.webp", storageFile: "sprint_27ee59e2.gif", posterStorageFile: "sprint-poster_ae49fde1.webp", kind: "original" },
  "static-bar": { file: "static-bar.gif", posterFile: "static-bar-poster.webp", storageFile: "static-bar_f6edbeb9.gif", posterStorageFile: "static-bar-poster_67917fa9.webp", kind: "original" },
  "pull-up": { file: "pull-up.gif", posterFile: "pull-up-poster.webp", storageFile: "pull-up_d3c4a899.gif", posterStorageFile: "pull-up-poster_7365a9f7.webp", kind: "sourced", source: "https://commons.wikimedia.org/wiki/File:Pullup.gif", credit: "Extremistpullup · CC BY-SA 3.0" },
  jump: { file: "jump-real.gif", posterFile: "jump-real-poster.webp", storageFile: "jump-real_1fd4112f.gif", posterStorageFile: "jump-real-poster_0040a2be.webp", kind: "sourced", source: "https://commons.wikimedia.org/wiki/File:Descriptive_Zoopraxography_Athlete,_Standing_Long_Jump_Animated.gif", credit: "Eadweard Muybridge (1893) · sequência histórica · domínio público" },
  rope: { file: "rope.gif", posterFile: "rope-poster.webp", storageFile: "rope_7fd646e0.gif", posterStorageFile: "rope-poster_bf97173b.webp", kind: "original" },
  shuttle: { file: "shuttle.gif", posterFile: "shuttle-poster.webp", storageFile: "shuttle_084b7844.gif", posterStorageFile: "shuttle-poster_7b6f998a.webp", kind: "original" },
  "push-up": { file: "push-up-real.gif", posterFile: "push-up-real-poster.webp", storageFile: "push-up-real_2f1a59c1.gif", posterStorageFile: "push-up-real-poster_9cf1968a.webp", kind: "sourced", source: "https://commons.wikimedia.org/wiki/File:Navy-seal-buds-training-push-ups.ogv", credit: "United States Navy SEALs · domínio público nos EUA" },
};
