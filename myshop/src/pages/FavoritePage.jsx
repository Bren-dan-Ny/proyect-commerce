import { useFavorites } from "../context/FavoriteContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center" style={{ marginTop: "5rem" }}>
        <h3>No tienes productos en favoritos </h3>
        <p className="text-muted text-center">
          Cuando agregues productos, aparecerán aquí para que los veas rápido.
        </p>
        <a href="/" className="btn btn-danger mt-2">
          Volver a la tienda
        </a>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ minHeight: "100vh" }}>
      <nav aria-label="breadcrumb" className="mt-4 mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-dark">
              Inicio
            </Link>
          </li>
        </ol>
      </nav>
      <div className="d-flex justify-content-between mb-3">
        <h4>Mis Favoritos</h4>

        <button
          className="btn btn-outline-danger mb-3"
          onClick={() => {
            {
              clearFavorites();
            }
          }}
        >
          Vaciar favoritos
        </button>
      </div>

      <div className="row">
        {favorites.map((product) => (
          <div key={product.id} className="col-6 col-md-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
