//---------- React ----------
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//---------- Styles ----------
import "./global.css";

//---------- Components ----------
import App from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
