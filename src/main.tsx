import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./components/Routes/Routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="mx-8 md:mx-16">
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </div>
);
