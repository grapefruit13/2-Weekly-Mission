import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Suspense } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<div>is loading...</div>}>
    <App />
  </Suspense>
);
