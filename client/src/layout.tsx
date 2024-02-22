import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ShopContextProvider } from "./context/shop-context";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/theme-provider";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";

function Layout() {
  const queryClient = new QueryClient();

  return (
    <main className="h-screen">
      <QueryClientProvider client={queryClient}>
        <ShopContextProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Toaster />
            <Header />
            <div className="px-10 sm:px-20 md:px-32 lg:px-40">
              <Outlet />
            </div>
            <Footer />
          </ThemeProvider>
        </ShopContextProvider>
      </QueryClientProvider>
    </main>
  );
}

export default Layout;
