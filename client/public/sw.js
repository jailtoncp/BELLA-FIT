const CACHE_NAME = "bella-fit-shell-v3";
const BASE_PATH = new URL("./", self.location.href).pathname;
const IS_GITHUB_PAGES = BASE_PATH === "/BELLA-FIT/";
const appUrl = (path) => `${BASE_PATH}${path}`;
const APP_SHELL = [
  appUrl(""),
  appUrl("manifest.webmanifest"),
  appUrl("icons/bella-fit.svg"),
  appUrl("icons/bella-fit-192.png"),
  appUrl("icons/bella-fit-512.png"),
];
const EXERCISE_NAMES = [
  "abdominal", "abducao", "afundo", "agachamento-sumo", "agachamento", "coice", "crossover", "crucifixo",
  "desenvolvimento", "elevacao-frontal", "elevacao-lateral", "elevacao-pelvica", "elevacao-pernas", "extensora",
  "flexora", "glute-bridge", "hack", "hip-thrust", "leg-press", "panturrilha", "passada", "prancha",
  "puxada-frontal", "remada-baixa", "remada-curvada", "remada-unilateral", "rosca-alternada", "rosca-direta",
  "rosca-martelo", "stiff", "supino", "triceps-frances", "triceps-pulley", "triceps-testa",
];
const MANUS_EXERCISES = [
  "abdominal_41ec89d4", "abducao_dc306907", "afundo_4f017c1d", "agachamento-sumo_2adf4d00",
  "agachamento_5569ce45", "coice_0b326a3a", "crossover_69def2fc", "crucifixo_543e626f",
  "desenvolvimento_4e6de706", "elevacao-frontal_08df8760", "elevacao-lateral_ccfa6019",
  "elevacao-pelvica_ac7b41a5", "elevacao-pernas_2059e679", "extensora_34e09ad1", "flexora_dce1fa38",
  "glute-bridge_d7364c5f", "hack_36dd6128", "hip-thrust_80b089d1", "leg-press_c59660bd",
  "panturrilha_534441a8", "passada_247a423f", "prancha_ab4633a6", "puxada-frontal_6017098e",
  "remada-baixa_31fcefb2", "remada-curvada_6ccfb294", "remada-unilateral_feb98070",
  "rosca-alternada_99315757", "rosca-direta_e0362fa3", "rosca-martelo_72efb3c1", "stiff_fe027d90",
  "supino_e6b3ecc2", "triceps-frances_2fc9f5f7", "triceps-pulley_70dedd2a", "triceps-testa_2e3d3ded",
];
const EXERCISE_ASSETS = IS_GITHUB_PAGES
  ? EXERCISE_NAMES.map((name) => appUrl(`media/exercises/${name}.gif`))
  : MANUS_EXERCISES.map((name) => `/manus-storage/${name}.gif`);
const HERO_ASSET = IS_GITHUB_PAGES
  ? appUrl("media/bella-fit-training-hero.webp")
  : "/manus-storage/bella-fit-training-hero_303e3ce8.jpg";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await Promise.all([...EXERCISE_ASSETS, HERO_ASSET].map((asset) => cache.add(asset).catch(() => undefined)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((name) => name.startsWith("bella-fit-") && name !== CACHE_NAME).map((name) => caches.delete(name))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).then((response) => {
      event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(appUrl(""), response.clone())));
      return response;
    }).catch(() => caches.match(appUrl("")).then((response) => response || Response.error())));
    return;
  }

  event.respondWith(caches.match(event.request).then((cached) => {
    if (cached) return cached;
    return fetch(event.request).then((response) => {
      if (response?.ok) event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone())));
      return response;
    });
  }));
});
