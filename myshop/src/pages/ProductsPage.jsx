import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
import "../styles/productsPage.css";

export default function ProductsPage() {
  const { category } = useParams();
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  if (loading) return <p className="container my-5">Cargando productos...</p>;
  if (error) return <p className="container my-5">Error: {error}</p>;
  if (products.length === 0)
    return <p className="container my-5">No hay productos</p>;

  return (
    <>
      <nav aria-label="breadcrumb" className="container mt-5">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-dark">
              Inicio
            </Link>
          </li>
          {category && (
            <li className="breadcrumb-item active" aria-current="page">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          )}
        </ol>
      </nav>

      <div
        className="container my-4"
        style={{ minHeight: "100vh", paddingBottom: "5rem" }}
      >
        <div className="row g-3">
          {products.map((p) => (
            <div key={p.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
