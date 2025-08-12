import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import "../styles/productDetails.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.images?.[0] || null);
        setQuantity(1);
      })
      .catch(console.error);
  }, [id]);

  if (!product) return <p className="loading">Cargando producto...</p>;

  const discountValue = product.price * (product.discountPercentage / 100);
  const finalPrice = (product.price - discountValue).toFixed(2);
  const isOutOfStock = product.stock === 0;

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigate("/productos"); // Ajusta esta ruta a la real de tu página productos
  };
  return (
    <>
      <nav aria-label="breadcrumb" className="container mt-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-dark">
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to={`/category/${product.category}`}
              className="text-dark text-truncate"
              style={{ maxWidth: "150px", display: "inline-block" }}
            >
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      <div
        className="product-detail container"
        style={{ marginTop: "6rem", marginBottom: "6rem" }}
      >
        <div className="row g-4 ">
          <div className="col-12 d-flex flex-column flex-md-row gap-4 mb-4">
            <div className="thumbnails-container d-flex flex-row flex-md-column gap-2">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Vista ${i + 1}`}
                  className={`img-thumbnail thumb ${
                    img === mainImage ? "selected" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                  style={{
                    cursor: "pointer",
                    maxWidth: "80px",
                    maxHeight: "80px",
                  }}
                />
              ))}
            </div>

            <div
              className="main-image flex-shrink-0"
              style={{ maxWidth: "100%", flexBasis: "50%" }}
            >
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.title}
                  className="img-fluid rounded shadow-sm"
                  style={{
                    maxHeight: "400px",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
              ) : (
                <p>No hay imagen disponible</p>
              )}
            </div>

            <div className="product-info flex-grow-1">
              <h2>{product.title}</h2>
              <p className="text-muted mb-1">
                {product.brand} · {product.category}
              </p>

              <div className="rating mb-3">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
                <span className="ms-2">{product.rating} / 5</span>
              </div>

              <div className="price-section mb-3">
                <span className="final-price fs-3 fw-bold">
                  S/.{finalPrice}
                </span>{" "}
                {product.discountPercentage > 0 && (
                  <>
                    <span className="original-price text-muted text-decoration-line-through ms-2">
                      S/.{product.price}
                    </span>
                    <span className="badge bg-danger ms-2">
                      -{product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              <p className="mb-4">{product.description}</p>

              <p className={product.stock > 0 ? "text-success" : "text-danger"}>
                {product.stock > 0
                  ? `Stock disponible: ${product.stock}`
                  : "Sin stock"}
              </p>

              {product.stock > 0 && (
                <div className="quantity-selector mb-3 d-flex align-items-center gap-3">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    style={{ maxWidth: "70px" }}
                    value={quantity}
                    min={1}
                    max={product.stock}
                    onChange={(e) => {
                      let val = Number(e.target.value);
                      if (val < 1) val = 1;
                      if (val > product.stock) val = product.stock;
                      setQuantity(val);
                    }}
                  />
                  <button
                    className="btn btn-danger"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                  <button
                    className={`btn btn-add-to-cart ${
                      isOutOfStock ? "btn-secondary" : "btn-danger"
                    }`}
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
              )}
            </div>
          </div>
        </div>

        {product.reviews?.length > 0 && (
          <div className="reviews mt-5">
            <h4 className="mb-4">Reseñas de usuarios</h4>
            <div className="d-flex flex-wrap gap-3">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="card"
                  style={{ minWidth: "250px", flex: "1 1 300px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-person fs-5 pe-2"></i>
                      {review.reviewerName}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {"★".repeat(review.rating) +
                        "☆".repeat(5 - review.rating)}
                      <span className="ms-2">{review.rating} / 5</span>
                    </h6>
                    <p className="card-text">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
