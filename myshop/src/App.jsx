import { useEffect, useState } from "react";
import { getProducts } from "./services/productsApi";
import MyRoutes from "./routers/Routes";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data.products);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    })();
  }, []);

  return <MyRoutes products={products} />;
}

export default App;
