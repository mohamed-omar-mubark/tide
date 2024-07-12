import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";

// react router
import { BrowserRouter } from "react-router-dom";

// primereact
import "primereact/resources/themes/lara-light-teal/theme.css";
// primeflex
import "primeflex/primeflex.css";
// primeicons
import "primeicons/primeicons.css";

// styles
import "./assets/styles/app.scss";
import "./assets/styles/home.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
