import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductView from "./pages/ProductView";
import Layout from "./components/Layout";

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;
