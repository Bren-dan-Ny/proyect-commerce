// Header.jsx
import logotipo from "../assets/logotipo.png";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoriteContext";
import "../styles/header.css";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const { cartItems } = useCart();
  const { favorites } = useFavorites();

  return (
    <header className="bg-light d-flex align-items-center p-3 position-relative justify-content-center">
      {/* Contenedor izquierdo: Toggle + Menú */}
      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <i className="bi bi-list"></i>
        </button>

        <NavLink to="/" className="text-decoration-none text-dark fw-semibold">
          Menú
        </NavLink>
      </div>

      {/* Logo centrado absolute */}
      <NavLink
        to="/"
        className="position-absolute top-50 start-50 translate-middle"
        style={{ maxHeight: "40px" }}
      >
        <img src={logotipo} alt="Logo" style={{ maxHeight: "50px" }} />
      </NavLink>

      {/* Contenedor derecho: íconos */}
      <div className="ms-auto d-flex align-items-center gap-4">
        <NavLink
          to="/favorites"
          className="nav-link position-relative text-dark"
        >
          <i className="bi bi-heart fs-4"></i>
          {favorites.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {favorites.length}
            </span>
          )}
        </NavLink>

        <NavLink to="/cart" className="nav-link position-relative text-dark">
          <i className="bi bi-cart fs-4"></i>
          {cartItems.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </NavLink>
      </div>
    </header>
  );
}
