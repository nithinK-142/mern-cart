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
import Shop from "./pages/shop/index.tsx";
import { CheckoutPage } from "./pages/checkout/index.tsx";
import { PurchasedItemsPage } from "./pages/purchased-items/index.tsx";
import Test from "./pages/test/index.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <Shop />
          </ProtectedRoute>
        }
      />
      <Route path="auth" element={<AuthPage />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="purchased-items"
        element={
          <ProtectedRoute>
            <PurchasedItemsPage />
          </ProtectedRoute>
        }
      />
      <Route path="test" element={<Test />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
