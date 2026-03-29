import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles.css";

const appRoot = document.querySelector<HTMLDivElement>("#app");

if (!appRoot) {
  throw new Error("App root not found.");
}

createRoot(appRoot).render(<App />);
