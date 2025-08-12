import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <- importante para carousel
import "bootstrap-icons/font/bootstrap-icons.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import App from "./App.jsx";
import "./index.css";
import { FavoritesProvider } from "./context/FavoriteContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FavoritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
  </BrowserRouter>
);
