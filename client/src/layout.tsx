import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ShopContextProvider } from "./context/shop-context";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/theme-provider";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="h-screen">
      <ShopContextProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Header />
          <div className="px-10 sm:px-20 md:px-32 lg:px-40">
            <Outlet />
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </ShopContextProvider>
    </main>
  );
}

export default App;
