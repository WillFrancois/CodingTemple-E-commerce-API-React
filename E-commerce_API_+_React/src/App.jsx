import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navigation from "./components/NavBar";

import Customer from "./components/customer/Customer";
import CustomerDetails from "./components/customer/CustomerDetails";

import Product from "./components/product/Product";
import ProductDetails from "./components/product/ProductDetails";
import NewProductForm from "./components/product/NewProductForm";

import PlaceOrder from "./components/order/PlaceOrder";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/customer" element={<Customer />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />

        <Route path="/product" element={<Product />} />
        <Route path="/product/add" element={<NewProductForm />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/order" element={<PlaceOrder />} />
      </Routes>
    </>
  );
}

import "bootstrap/dist/css/bootstrap.min.css";

export default App;
