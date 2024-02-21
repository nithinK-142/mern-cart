import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout.tsx";
import AuthPage from "./pages/auth/index.tsx";
import Home from "./pages/home/index.tsx";
import { CheckoutPage } from "./pages/checkout/index.tsx";
import { PurchasedItemsPage } from "./pages/purchased-items/index.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="purchased-items" element={<PurchasedItemsPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
