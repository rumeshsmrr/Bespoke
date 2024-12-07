import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import ProductDescription from "./Pages/ProductDescription";
import CartPage from "./Pages/CartPage";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/">
          <Route path="/" element={<Home />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route
            path="/product-description/:id"
            element={<ProductDescription />}
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <div id="payhere-modal"></div>
    </>
  );
}

export default App;
