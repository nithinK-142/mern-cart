import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ShopContextProvider } from "./context/shop-context";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/theme-provider";

function App() {
  return (
    <main className="h-screen">
      <ShopContextProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Header />
          <Outlet />
          {/* <Footer /> */}
          <Toaster />
        </ThemeProvider>
      </ShopContextProvider>
    </main>
  );
}

export default App;
