import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import ProductList from "./Pages/Productlist";
import ProductDescription from "./Components/ProductDescription";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes path="/">
          <Route path="/" element={<Home />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-description" element={<ProductDescription />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
