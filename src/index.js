import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "react-alice-carousel/lib/alice-carousel.css";
import { CryptoProvider } from "./CryptoContext"; // Import as CryptoProvider

ReactDOM.render(
  <React.StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
