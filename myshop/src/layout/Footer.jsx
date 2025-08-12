import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="ecommerce-footer">
      <div className="footer-container">
        <div className="footer-middle">
          <div className="footer-column">
            <h5>Compañía</h5>
            <ul>
              <li>
                <Link to="#">Sobre nosotros</Link>
              </li>
              <li>
                <Link to="#">Trabaja con nosotros</Link>
              </li>
              <li>
                <Link to="#">Prensa</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h5>Ayuda</h5>
            <ul>
              <li>
                <Link to="#">Contacto</Link>
              </li>
              <li>
                <Link to="#">Preguntas frecuentes</Link>
              </li>
              <li>
                <Link to="#">Devoluciones</Link>
              </li>
              <li>
                <Link to="#">Envíos</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h5>Legal</h5>
            <ul>
              <li>
                <Link to="#">Política de privacidad</Link>
              </li>
              <li>
                <Link to="#">Términos y condiciones</Link>
              </li>
              <li>
                <Link to="#">Política de cookies</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} MiTiendaOnline. Todos los derechos
            reservados.
          </p>
          <div className="footer-links">
            <Link to="#" className="text-light">
              Mapa del sitio
            </Link>
            <span className="divider">|</span>
            <Link to="#" className="text-light">
              Accesibilidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
