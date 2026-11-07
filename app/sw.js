/* AIDOS-VITI-040 service worker — GENERATED at build time (scripts/build-pwa.mjs). Do not edit the built copy.
 *
 * Rules:
 *  - it caches ONLY same-origin application files (the app shell). Requests to the paired PC (another origin) and any non-GET request are never touched.
 *  - no secret, no user data and no pairing credential is ever in a cached file or in this script: the data lives in IndexedDB.
 *  - a new copy installs next to the running one and WAITS: it takes over only when the page asks (after checking that nothing is being typed or
 *    saved), or when every window of the app has been closed. It never calls skipWaiting by itself.
 */
const BUILD = "4919e2a82812";
const CACHE = "aidos-shell-" + BUILD;
const ASSETS = ["./","./apple-touch-icon.png","./assets/commons-champagne-formation-pruning-1-Cx3Nm3ge.gif","./assets/commons-double-guyot-gros-manseng-B0IRin08.jpg","./assets/commons-grape-vine-cuttings-rooted-DK0MkrBD.jpg","./assets/commons-guyot-1-before-winter-pruning-B-3C_B12.svg","./assets/commons-guyot-2-after-winter-pruning-CqbXSGwI.svg","./assets/commons-guyot-erziehung-aufbau-HXsFHRAw.jpg","./assets/commons-low-cordon-training-8UbTprCA.svg","./assets/fb471-fig12-first-year-shoots-tied-BUl26fW9.png","./assets/fb471-fig13-vines-headed-back-CFPS-Fod.png","./assets/fb471-fig17-renewal-system-progression-D6beQCsn.png","./assets/fb471-fig2-bundle-of-cuttings-CuBStXdK.png","./assets/fb471-fig30-cane-system-third-year-9VxiesNU.png","./assets/index-CGZkG_Mp.js","./assets/index-Dv-yp5vV.css","./assets/sql-wasm-DfANybxk.wasm","./assets/sql-wasm-DhxvFf6G.js","./assets/sql-wasm-ecmoRXcv.js","./assets/today-BdLO8ecz.js","./assets/web-C1pG3jYz.js","./icon-192.png","./icon-512.png","./icon-64.png","./index.html","./manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS.map((u) => new Request(u, { cache: "reload" })))));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // old shells go; databases (IndexedDB) are not caches and are never touched here
      for (const key of await caches.keys()) if (key.startsWith("aidos-shell-") && key !== CACHE) await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // the PC, weather services, anything else: straight to the network
  if (url.pathname.endsWith("/version.json") && url.searchParams.has("latest")) return; // the update check must see the network
  if (req.mode === "navigate") {
    event.respondWith(caches.match(new URL("./index.html", self.registration.scope).href).then((hit) => hit || fetch(req)));
    return;
  }
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
