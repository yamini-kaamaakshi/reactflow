import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "react-quill/dist/quill.snow.css"; // Import Quill editor styles


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
