import { useNavigate } from "react-router-dom";
import "../styles/productCard.css";
import { useCartStore } from "../stores/useCartStore";
import { useFavoritesStore } from "../stores/useFavoritesStore";

function ProductCard({ product, onView = () => {}, showCategory = false }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    category,
    price,
    discountPercentage,
    rating,
    images,
    thumbnail,
    stock,
  } = product || {};

  const imageSrc =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : thumbnail || "https://via.placeholder.com/300x250?text=No+image";

  const safeRating =
    typeof rating === "number" && !isNaN(rating) ? rating : null;
  const discountValue = discountPercentage
    ? (price * discountPercentage) / 100
    : 0;
  const discountedPrice = (price - discountValue).toFixed(2);

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === id);

  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  const handleView = (e) => {
    e.preventDefault();
    onView();
    navigate(`/product/${id}`);
  };

  return (
    <div
      className={`product-card card h-100 ${isOutOfStock ? "opacity-75" : ""}`}
    >
      <div className="position-relative">
        <a
          href={`/product/${id}`}
          onClick={handleView}
          aria-label={`Ver detalles de ${title}`}
        >
          <div className="image-container overflow-hidden position-relative">
            <img
              src={imageSrc}
              alt={title}
              className="card-img-top img-fluid product-image"
              loading="lazy"
            />
          </div>
        </a>

        <div className="position-absolute top-0 start-0 d-flex flex-column gap-1 m-2">
          {discountPercentage > 0 && (
            <span className="badge bg-danger discount-badge">
              -{discountPercentage}%
            </span>
          )}
          {isLowStock && !isOutOfStock && (
            <span className="badge bg-warning text-dark stock-badge">
              Últimas {stock} unidades
            </span>
          )}
        </div>

        <button
          className="btn btn-sm btn-light fs-5 rounded-circle position-absolute top-0 end-0 m-2 favorite-btn"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product);
          }}
          aria-label={
            isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
          }
        >
          <i
            className={
              isFavorite ? "bi bi-heart-fill text-danger" : "bi bi-heart"
            }
          ></i>
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        {showCategory && (
          <small className="text-muted text-uppercase mb-1 category-text">
            {category}
          </small>
        )}
        <a
          href={`/product/${id}`}
          className="text-decoration-none text-dark product-title-link"
          onClick={handleView}
        >
          <h5 className="card-title mb-2 product-title clamp-2-lines">
            {title}
          </h5>
        </a>
        <div className="d-flex align-items-center mb-2">
          {safeRating ? (
            <div className="rating mb-3">
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))}
              <small className="ms-2 text-secondary">{rating}</small>
            </div>
          ) : (
            <small className="text-muted">Sin calificaciones</small>
          )}
        </div>
        <div className="mt-auto">
          <div className="d-flex align-items-center gap-2 price-container">
            <h5 className="mb-0 text-danger fw-bold current-price">
              S/.{discountedPrice}
            </h5>
            {discountPercentage > 0 && (
              <small className="text-muted text-decoration-line-through original-price">
                S/.{price?.toFixed(2)}
              </small>
            )}
          </div>
        </div>
        <div className="d-grid mt-3">
          <button
            className={`btn btn-add-to-cart ${isOutOfStock ? "btn-secondary" : "btn-danger"}`}
            onClick={() => !isOutOfStock && addToCart(product)}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? (
              "Agotado"
            ) : (
              <>
                <i className="bi bi-cart-plus me-1"></i>
                Añadir al carrito
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
