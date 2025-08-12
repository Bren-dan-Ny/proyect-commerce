import { useCart } from "../context/CartContext";
import "../styles/cartPage.css";
import { useNavigate } from "react-router-dom";

import ProductDetails from "../pages/ProductDetails";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const discountValue = item.price * (item.discountPercentage / 100);
    return sum + (item.price - discountValue) * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center" style={{ marginTop: "5rem" }}>
        <i className="bi bi-cart-x fs-1 text-muted"></i>
        <p className="mt-3">Tu carrito está vacío.</p>
        <a href="/" className="btn btn-danger mt-2">
          Volver a la tienda
        </a>
      </div>
    );
  }

  return (
    <div
      className="container "
      style={{ marginTop: "5rem", marginBottom: "5rem" }}
    >
      <h2 className="mb-4">Carrito de compras</h2>

      {/* Versión Desktop (md y arriba) */}
      <div className="d-none d-md-block">
        {/* Encabezados */}
        <div className="row fw-bold border-bottom pb-2 mb-3">
          <div className="col-md-5">Producto</div>
          <div className="col-md-2 text-end">Precio</div>
          <div className="col-md-2 text-end">Descuento</div>
          <div className="col-md-1 text-center">Cantidad</div>
          <div className="col-md-2 text-end">Subtotal</div>
        </div>

        {/* Lista de productos */}
        {cartItems.map((item) => {
          const discountValue = item.price * (item.discountPercentage / 100);
          const subtotal = (item.price - discountValue) * item.quantity;

          return (
            <div
              key={`${item.id}-${item.quantity}`}
              className="row align-items-center border-bottom py-3"
            >
              {/* Producto */}
              <div className="col-md-5 d-flex align-items-center">
                <button
                  className="btn btn-link text-danger p-0 me-2"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Eliminar producto"
                >
                  <i className="bi bi-trash"></i>
                </button>
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="rounded me-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                )}
                <span>{item.title}</span>
              </div>

              {/* Precio */}
              <div className="col-md-2 text-end">
                S/.{item.price.toFixed(2)}
              </div>

              {/* Descuento */}
              <div className="col-md-2 text-end text-danger">
                -S/.{discountValue.toFixed(2)}
              </div>

              {/* Cantidad */}
              <div className="col-md-1 text-center">
                <div
                  className="input-group input-group-sm mx-auto"
                  style={{ maxWidth: "120px" }}
                >
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="col-md-2 text-end fw-bold text-success">
                S/.{subtotal.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Versión Mobile (sm y abajo) */}
      <div className="d-md-none">
        {cartItems.map((item) => {
          const discountValue = item.price * (item.discountPercentage / 100);
          const subtotal = (item.price - discountValue) * item.quantity;

          return (
            <div
              key={`${item.id}-${item.quantity}`}
              className="card mb-3 border-light shadow-sm"
            >
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title mb-2">{item.title}</h5>
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Eliminar producto"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>

                {item.thumbnail && (
                  <div className="text-center my-2">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="rounded"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      onClick={() => navigate(`/product/${item.id}`)} // <--- navegación en click
                    />
                  </div>
                )}

                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Precio:</span>
                  <span>S/.{item.price.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Descuento:</span>
                  <span className="text-danger">
                    S/.{discountValue.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="text-muted">Cantidad:</span>
                  <div
                    className="input-group input-group-sm"
                    style={{ width: "110px" }}
                  >
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-3 pt-2 border-top">
                  <span className="fw-bold">Subtotal:</span>
                  <span className="fw-bold text-success">
                    S/.{subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumen (compartido para ambas versiones) */}
      <div className="row" style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <div className="col-md-4 offset-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="mb-3">Resumen del pedido</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>
                  Productos:{" "}
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
                <span>S/.{totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-danger py-2">
                  <i className="bi bi-credit-card me-2"></i>Finalizar compra
                </button>
                <button
                  className="btn btn-outline-dark py-2"
                  onClick={clearCart}
                >
                  <i className="bi bi-trash me-2"></i>Vaciar carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
