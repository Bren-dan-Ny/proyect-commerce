import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import FavoritePage from "../pages/FavoritePage";
import ProductDetails from "../pages/ProductDetails";

export default function MyRoutes({ products }) {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home products={products} />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favorites" element={<FavoritePage />} />
        <Route path="category/:category" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}
