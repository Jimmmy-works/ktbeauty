import { useState } from "react";
import "./tailwind.scss";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { PATHS } from "./contants/path";
import HomePage from "./page/HomePage";
import Shop from "./page/Shop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.SHOP.INDEX} element={<Shop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
