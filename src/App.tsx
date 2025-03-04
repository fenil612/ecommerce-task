import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProductView from "./pages/ProductView";
import Layout from "./components/Layout";

const App = () => (
  <Provider store={store}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          {/* Wrap routes that should have Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/view" element={<ProductView />} />
          </Route>

          {/* Routes without Layout */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </Provider>
);

export default App;
