import ProductCard from "./Card";
import { useState, useEffect } from "react";
import "./style.css";

const Body = () => {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch("https://dummyjson.com/products");
      const json = await data.json();
      const products = json.products;

      setListOfProducts(products);
      setFilteredProducts(products);
      console.log(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filteredResList = listOfProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTxt.toLowerCase())
    );
    setFilteredProducts(filteredResList);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTopRated = () => {
    const filteredList = listOfProducts.filter(
      (product) => product.rating > 4
    );
    setFilteredProducts(filteredList);
  };

  const handleReset = () => {
    setSearchTxt("");
    setFilteredProducts(listOfProducts);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="body">
      {/* Search and Filter Section */}
      <div className="controls">
        <div className="search">
          <input
            type="text"
            className="search-box"
            placeholder="Search products by name..."
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>
            <i className="fas fa-search"></i> Search
          </button>
        </div>

        <div className="filter">
          <button className="filter-btn" onClick={handleTopRated}>
            <i className="fas fa-star"></i> Top Rated (4+)
          </button>
          <button className="reset-btn" onClick={handleReset}>
            <i className="fas fa-sync-alt"></i> Reset
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        <p>Showing {filteredProducts.length} products</p>
      </div>

      {/* Product Cards Grid */}
      <div className="res-contain">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} resData={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <h3>No products found</h3>
          <p>Try searching with different keywords</p>
          <button onClick={handleReset}>View all products</button>
        </div>
      )}
    </div>
  );
};

export default Body;