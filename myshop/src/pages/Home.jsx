import ProductCard from "../components/ProductCard";
import { useRef } from "react";
import "../styles/home.css";

import banner_1 from "../assets/banner_1.png";
import banner_2 from "../assets/banner_2.png";
import banner_3 from "../assets/banner_3.png";
import banner_4 from "../assets/banner_4.png";

export default function Home({ products }) {
  const flashSalesRef = useRef(null);

  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const itemWidth = ref.current.firstChild?.offsetWidth || 250;
      const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // 3. Filtramos productos para Flash Sales
  const flashSalesProducts = [...products]
    .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
    .slice(0, 8);
  return (
    <div>
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div className="carousel-inner ">
            <div className="carousel-item active">
              <img
                src={banner_1}
                className="d-block w-100 object-fit-cover"
                alt="Promoción"
                loading="lazy"
              />
            </div>
            <div className="carousel-item">
              <img
                src={banner_2}
                className="d-block w-100 object-fit-cover"
                alt="Promoción"
                loading="lazy"
              />
            </div>
            <div className="carousel-item">
              <img
                src={banner_3}
                className="d-block w-100 object-fit-cover"
                alt="Promoción"
                loading="lazy"
              />
            </div>
            <div className="carousel-item">
              <img
                src={banner_4}
                className="d-block w-100 object-fit-cover"
                alt="Promoción"
                loading="lazy"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div
        className="container"
        style={{ marginTop: "5rem", marginBottom: "5rem" }}
      >
        <div className="d-flex align-items-center mb-4 px-2">
          <div
            className="rectangle bg-danger"
            style={{ width: "20px", height: "40px" }}
          ></div>
          <h6 className="px-3 text-danger ">Ofertas de hoy</h6>
        </div>

        {/* Carrusel de Flash Sales (8 productos) */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex px-2 align-items-center">
            <h2 className="fw-bold mb-">Ofertas Flash</h2>
          </div>
          <div className="d-flex px-4">
            <button
              className="btn btn-outline-secondary mx-2"
              onClick={() => handleScroll(flashSalesRef, "left")}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => handleScroll(flashSalesRef, "right")}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="flash-sales-container" ref={flashSalesRef}>
          {flashSalesProducts.map((product) => (
            <div key={product.id} className="flash-sales-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
