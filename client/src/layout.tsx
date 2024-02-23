import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ShopContextProvider } from "./context/shop-context";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/theme-provider";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetCartData } from "./hooks/useGetCartData";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

function Layout() {
  const { productsLoading, purchasedItemsLoading } = useGetCartData();

  return (
    <main className="h-screen">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <ShopContextProvider>
          <Toaster />
          <Header />
          <div className="relative px-10 sm:px-20 md:px-32 lg:px-40">
            <Outlet />
          </div>
          {!productsLoading && !purchasedItemsLoading && <Footer />}
        </ShopContextProvider>
      </ThemeProvider>
    </main>
  );
}

export default App;
