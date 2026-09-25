const CACHE_NAME = "bella-fit-shell-v2";
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/bella-fit.svg",
  "/icons/bella-fit-192.png",
  "/icons/bella-fit-512.png",
];
const EXERCISE_GIFS = [
  "/manus-storage/abdominal_41ec89d4.gif",
  "/manus-storage/abducao_dc306907.gif",
  "/manus-storage/afundo_4f017c1d.gif",
  "/manus-storage/agachamento-sumo_2adf4d00.gif",
  "/manus-storage/agachamento_5569ce45.gif",
  "/manus-storage/coice_0b326a3a.gif",
  "/manus-storage/crossover_69def2fc.gif",
  "/manus-storage/crucifixo_543e626f.gif",
  "/manus-storage/desenvolvimento_4e6de706.gif",
  "/manus-storage/elevacao-frontal_08df8760.gif",
  "/manus-storage/elevacao-lateral_ccfa6019.gif",
  "/manus-storage/elevacao-pelvica_ac7b41a5.gif",
  "/manus-storage/elevacao-pernas_2059e679.gif",
  "/manus-storage/extensora_34e09ad1.gif",
  "/manus-storage/flexora_dce1fa38.gif",
  "/manus-storage/glute-bridge_d7364c5f.gif",
  "/manus-storage/hack_36dd6128.gif",
  "/manus-storage/hip-thrust_80b089d1.gif",
  "/manus-storage/leg-press_c59660bd.gif",
  "/manus-storage/panturrilha_534441a8.gif",
  "/manus-storage/passada_247a423f.gif",
  "/manus-storage/prancha_ab4633a6.gif",
  "/manus-storage/puxada-frontal_6017098e.gif",
  "/manus-storage/remada-baixa_31fcefb2.gif",
  "/manus-storage/remada-curvada_6ccfb294.gif",
  "/manus-storage/remada-unilateral_feb98070.gif",
  "/manus-storage/rosca-alternada_99315757.gif",
  "/manus-storage/rosca-direta_e0362fa3.gif",
  "/manus-storage/rosca-martelo_72efb3c1.gif",
  "/manus-storage/stiff_fe027d90.gif",
  "/manus-storage/supino_e6b3ecc2.gif",
  "/manus-storage/triceps-frances_2fc9f5f7.gif",
  "/manus-storage/triceps-pulley_70dedd2a.gif",
  "/manus-storage/triceps-testa_2e3d3ded.gif",
  "/manus-storage/bella-fit-training-hero_303e3ce8.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await Promise.all(EXERCISE_GIFS.map((asset) => cache.add(asset).catch(() => undefined)));
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
      event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put("/", response.clone())));
      return response;
    }).catch(() => caches.match("/").then((response) => response || Response.error())));
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
