import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
// import "flowbite";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  /* </StrictMode> */
);
