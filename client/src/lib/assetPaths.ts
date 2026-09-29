const BASE_URL = import.meta.env.BASE_URL;
const isGitHubPagesBuild = BASE_URL === "/BELLA-FIT/";

export function appAssetUrl(path: string): string {
  return `${BASE_URL}${path.replace(/^\/+/, "")}`;
}

export const HERO_IMAGE_URL = isGitHubPagesBuild
  ? appAssetUrl("media/bella-fit-training-hero.webp")
  : "/manus-storage/bella-fit-training-hero_303e3ce8.jpg";

export function exerciseImageUrl(key: string, manuscriptUrl: string): string {
  return isGitHubPagesBuild ? appAssetUrl(`media/exercises/${key}.gif`) : manuscriptUrl;
}
