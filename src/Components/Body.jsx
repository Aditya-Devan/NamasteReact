import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


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
    <div className="container py-3 animate-fadeIn">
      {/* Search and Filter Section - Compact */}
      <div className="row g-2 align-items-center mb-4">
        <div className="col-md-7 col-lg-8">
          <div className="input-group shadow-xs rounded-3 overflow-hidden border border-light-subtle bg-white">
            <span className="input-group-text bg-white border-0 ps-3 pe-2">
              <i className="fas fa-search text-muted small"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 py-2 shadow-none"
              style={{ fontSize: '0.9rem' }}
              placeholder="Search products..."
              value={searchTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="btn btn-dark px-3 fw-bold small" 
              style={{ fontSize: '0.85rem' }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="col-md-5 col-lg-4">
          <div className="d-flex gap-2 justify-content-md-end">
            <button 
              className="btn btn-white border shadow-xs rounded-3 px-3 py-2 fw-semibold d-flex align-items-center gap-2" 
              style={{ fontSize: '0.8rem' }}
              onClick={handleTopRated}
            >
              <i className="fas fa-star text-warning"></i> Top Rated
            </button>
            <button 
              className="btn btn-white border shadow-xs rounded-3 px-3 py-2 fw-semibold d-flex align-items-center gap-2" 
              style={{ fontSize: '0.8rem' }}
              onClick={handleReset}
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count Compact */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-secondary fw-semibold" style={{ fontSize: '0.8rem' }}>
          Displaying <span className="text-dark fw-bold">{filteredProducts.length}</span> items
        </span>
      </div>

      {/* Product Cards Grid - More Compact 5-column grid on LG */}
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col">
            <Link to={"/product/" + product.id} className="text-decoration-none h-100 d-block">
              <ProductCard resData={product} />
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-5 mt-3 bg-white rounded-4 border border-light-subtle shadow-xs">
          <i className="fas fa-search display-3 text-light mb-3 d-block"></i>
          <h5 className="fw-bold text-dark">No products found</h5>
          <p className="text-muted small mb-3">Try different keywords</p>
          <button className="btn btn-dark btn-sm rounded-pill px-4" onClick={handleReset}>
            View all
          </button>
        </div>
      )}

      <style>{`
        .shadow-xs {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .btn-white {
            background-color: white;
            color: #333;
        }
        .btn-white:hover {
            background-color: #f8f9fa;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>

  );
};

export default Body;