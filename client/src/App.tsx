import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthPage } from "./pages/auth";
import { ShopPage } from "./pages/shop";
import { CheckoutPage } from "./pages/checkout";
import { PurchasedItemsPage } from "./pages/purchased-items";
import { ShopContextProvider } from "./context/shop-context";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/theme-provider";

function App() {
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Navbar />
            <Routes>
              <Route path="/" element={<ShopPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/purchased-items" element={<PurchasedItemsPage />} />
            </Routes>
            <Toaster />
          </ThemeProvider>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
