export const getProducts = async () => {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?limit=20"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
// {llamada a categorias}
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};
