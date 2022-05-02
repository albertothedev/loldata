import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import Champions from "./pages/Champions";
import Players from "./pages/Players";

import "normalize.css";
import "./styles/main.scss";
import store from "./redux";

const rootElement = document.getElementById("root");
if (rootElement === null) throw new Error("Root container missing in index.html");

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/champions" element={<Champions />} />

          <Route path="/players" element={<Players />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
