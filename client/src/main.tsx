import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const baseUrl = import.meta.env.BASE_URL;
    navigator.serviceWorker.register(`${baseUrl}sw.js`, { scope: baseUrl }).catch((error) => console.warn("Bella Fit: não foi possível registrar o modo offline", error));
  });
}

createRoot(document.getElementById("root")!).render(<App />);
