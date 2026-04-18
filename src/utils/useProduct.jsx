// useProduct.js  (put this in utils/ folder)
import { useState, useEffect } from "react";

const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`Product not found (Status: ${response.status})`);
        }
        const data = await response.json();

        // Ensure images array exists
        if (!data.images || data.images.length === 0) {
          data.images = [data.thumbnail];
        }

        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error }; // expose what component needs
};

export default useProduct;