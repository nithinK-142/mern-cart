import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ShopContextProvider } from "./context/shop-context";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/theme-provider";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetCartData } from "./hooks/useGetCartData";
import { SearchContextProvider } from "./context/search-context";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Layout />
    </QueryClientProvider>
  );
}

function Layout() {
  const { productsLoading, purchasedItemsLoading } = useGetCartData();

  return (
    <main className="h-screen floating-scrollbar">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ShopContextProvider>
          <SearchContextProvider>
            <Header />
            <div className="relative px-10 pt-16 sm:px-20 md:px-32 lg:px-40">
              <Outlet />
            </div>
            {!productsLoading && !purchasedItemsLoading && <Footer />}
          </SearchContextProvider>
        </ShopContextProvider>
      </ThemeProvider>
    </main>
  );
}

export default App;
