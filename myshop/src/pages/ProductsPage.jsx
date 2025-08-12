import { getProducts, getProductsByCategory } from "../services/productsApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import "../styles/productsPage.css";

export default function ProductsPage({ selectedCategory }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = category
          ? await getProductsByCategory(category)
          : await getProducts();
        setProducts(data.products || []);
      } catch (error) {
        setError(error.message || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (products.length === 0) return <p>No hay productos</p>;
  return (
    <>
      {" "}
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
            <div key={p.id} className="col-6 col-sm-6 col-md-4 col-lg-3 ">
              <ProductCard
                product={p}
                onFavorite={(prod) => console.log("fav", prod.id)}
                onAddToCart={handleAddToCart}
                onView={() => console.log("view", p.id)} // función para el click "ver"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
