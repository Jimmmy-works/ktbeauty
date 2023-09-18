import { useState } from "react";
import "./tailwind.scss";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { PATHS } from "./contants/path";
import HomePage from "./page/HomePage";
import Shop from "./page/Shop";
import Blog from "./page/Blog";
import AboutPage from "./page/AboutPage";
import ContactPage from "./page/ContactPage";
import ShopDetail from "./page/Shop/ShopDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.SHOP.INDEX} element={<Shop />} />
          <Route path={PATHS.SHOP.DETAIL} element={<ShopDetail />} />
          <Route path={PATHS.BLOG.INDEX} element={<Blog />} />
          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
