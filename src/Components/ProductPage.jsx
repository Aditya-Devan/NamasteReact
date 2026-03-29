import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Helper function to render stars
const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star filled">★</span>
      ))}
      {hasHalfStar && (
        <span className="star half-filled">★</span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star empty">★</span>
      ))}
    </div>
  );
};

// Quantity Selector Component
const QuantitySelector = ({ quantity, onQuantityChange, minOrder, maxStock }) => {
  const increase = () => {
    if (quantity < maxStock) {
      onQuantityChange(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > minOrder) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="quantity-selector">
      <button onClick={decrease} disabled={quantity <= minOrder} className="qty-btn">−</button>
      <span className="qty-value">{quantity}</span>
      <button onClick={increase} disabled={quantity >= maxStock} className="qty-btn">+</button>
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">{review.reviewerName.charAt(0)}</div>
          <div>
            <p className="reviewer-name">{review.reviewerName}</p>
            <p className="review-date">{formatDate(review.date)}</p>
          </div>
        </div>
        <RatingStars rating={review.rating} />
      </div>
      <p className="review-comment">{review.comment}</p>
    </div>
  );
};

// Main Product Page Component
const ProductPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Fetch product data when component mounts or ID changes
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
        setProduct(data);
        
        // Set minimum order quantity if available, otherwise default to 1
        const minQty = data.minimumOrderQuantity || 1;
        setQuantity(minQty);
        
        // Ensure images array exists
        if (!data.images || data.images.length === 0) {
          data.images = [data.thumbnail];
        }
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

  // Calculate discounted price if discount exists
  const discountedPrice = product 
    ? product.price * (1 - (product.discountPercentage || 0) / 100) 
    : 0;
  const totalPrice = discountedPrice * quantity;
  const isLowStock = product && product.stock <= 5;
  const hasImages = product && product.images && product.images.length > 0;

  const handleAddToCart = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  // Loading State
  if (loading) {
    return (
      <div className="product-page">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading product details...</p>
        </div>
        <style>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
          }
          .loader {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #e83e8c;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="product-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Product Not Found</h2>
          <p>{error || "Unable to load product details. Please try again later."}</p>
          <button onClick={() => window.history.back()} className="back-btn">
            ← Go Back
          </button>
        </div>
        <style>{`
          .error-container {
            text-align: center;
            padding: 60px 20px;
            max-width: 500px;
            margin: 0 auto;
          }
          .error-icon {
            font-size: 64px;
            margin-bottom: 20px;
          }
          .error-container h2 {
            color: #dc3545;
            margin-bottom: 12px;
          }
          .back-btn {
            margin-top: 24px;
            padding: 12px 24px;
            background: #6c757d;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
          }
          .back-btn:hover {
            background: #5a6268;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container py-3 min-vh-100 animate-fadeIn product-page-compact">
      {/* Success Toast */}
      {showSuccessMessage && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1100 }}>
          <div className="toast show align-items-center text-white bg-dark border-0 shadow-lg rounded-4" role="alert">
            <div className="d-flex p-2">
              <div className="toast-body d-flex align-items-center gap-2">
                <i className="fas fa-check-circle text-success fs-5"></i>
                <span className="fw-medium">Added to your shopping cart!</span>
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowSuccessMessage(false)}></button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-4 shadow-sm overflow-hidden border border-light-subtle mb-3">
        <div className="row g-0">
          {/* Image Gallery Column */}
          <div className="col-lg-5 p-2 p-md-3 bg-light d-flex align-items-center justify-content-center">
            <div className="w-100 sticky-top" style={{ top: '1rem' }}>
              <div className="bg-white rounded-4 p-2 mb-2 text-center d-flex align-items-center justify-content-center shadow-xs main-image-container" style={{ height: '340px' }}>
                <img
                  src={hasImages ? product.images[selectedImage] : product.thumbnail}
                  alt={product.title}
                  className="img-fluid h-100 object-fit-contain transition-all product-image-zoom"
                />
              </div>
              {hasImages && product.images.length > 1 && (
                <div className="d-flex gap-2 overflow-auto pb-1 scrollbar-hidden justify-content-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`btn p-0 border-2 rounded-3 overflow-hidden shadow-xs flex-shrink-0 transition-all ${selectedImage === idx ? 'border-primary ring-active' : 'border-transparent opacity-60 hover-opacity-100'}`}
                      style={{ width: '55px', height: '55px' }}
                    >
                      <img src={img} alt="thumb" className="w-100 h-100 object-fit-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details Column */}
          <div className="col-lg-7 p-3 p-md-4 d-flex flex-column gap-2 bg-white">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1 text-uppercase fw-semibold" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-secondary">Store</Link></li>
                <li className="breadcrumb-item active text-primary">{product.category}</li>
              </ol>
            </nav>

            <div className="d-flex flex-wrap gap-2 align-items-center mb-1">
              {product.brand && <span className="badge bg-light text-dark border px-2 py-1 rounded text-uppercase" style={{ fontSize: '0.55rem', fontWeight: '800' }}>{product.brand}</span>}
              {product.tags && product.tags.slice(0, 2).map((tag) => (
                 <span key={tag} className="badge bg-white text-secondary border px-2 py-1 rounded small fw-normal">#{tag}</span>
              ))}
            </div>

            <div>
              <h1 className="h3 fw-bold text-dark mb-1">{product.title}</h1>
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex align-items-center text-warning" style={{ fontSize: '0.8rem' }}>
                  <RatingStars rating={product.rating} />
                  <span className="ms-2 fw-bold text-dark">{product.rating}</span>
                </div>
                <span className="text-muted" style={{ fontSize: '0.7rem' }}>• {product.reviews ? product.reviews.length : 0} reviews</span>
              </div>
            </div>

            <div className="py-1">
              <div className="d-flex align-items-baseline gap-2">
                <span className="h2 fw-bold text-primary mb-0">${discountedPrice.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <div className="d-flex align-items-center gap-2">
                    <span className="text-muted text-decoration-line-through fw-medium h5 mb-0">${product.price.toFixed(2)}</span>
                    <span className="badge bg-danger rounded-pill px-2 py-1" style={{ fontSize: '0.65rem' }}>-{product.discountPercentage}%</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-secondary mb-2 fw-normal" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>{product.description}</p>

            <div className="p-3 bg-light rounded-4 border border-light-subtle shadow-xs">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold text-dark" style={{ fontSize: '0.7rem' }}>AVAILABILITY</span>
                {isLowStock ? (
                  <span className="text-warning fw-bold" style={{ fontSize: '0.75rem' }}><i className="fas fa-exclamation-triangle me-1"></i>ONLY {product.stock} LEFT</span>
                ) : product.stock > 0 ? (
                  <span className="text-success fw-bold" style={{ fontSize: '0.75rem' }}><i className="fas fa-check me-1"></i>{product.stock} IN STOCK</span>
                ) : (
                  <span className="text-danger fw-bold" style={{ fontSize: '0.75rem' }}>OUT OF STOCK</span>
                )}
              </div>

              {product.stock > 0 && (
                <div className="row g-2">
                  <div className="col-5 col-sm-4">
                    <QuantitySelector
                      quantity={quantity}
                      onQuantityChange={setQuantity}
                      minOrder={product.minimumOrderQuantity || 1}
                      maxStock={product.stock}
                    />
                  </div>
                  <div className="col-7 col-sm-8">
                    <button onClick={handleAddToCart} className="btn btn-primary w-100 rounded-3 py-2 fw-bold shadow-sm btn-hover-effect d-flex align-items-center justify-content-center gap-2 h-100">
                      <i className="fas fa-shopping-cart small"></i>
                      <span className="d-none d-sm-inline">ADD TO CART • </span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Feature Icons Compact */}
            <div className="row g-2 pt-1">
              {[
                { icon: "fa-truck", label: "SHIPPING", value: product.shippingInformation || "Fast" },
                { icon: "fa-shield-alt", label: "WARRANTY", value: product.warrantyInformation || "2 Years" },
                { icon: "fa-undo", label: "RETURNS", value: product.returnPolicy || "30 Days" },
                { icon: "fa-box", label: "WEIGHT", value: `${product.weight}kg` }
              ].map((item, i) => (
                <div key={i} className="col-6 col-md-3">
                  <div className="p-2 border border-light-subtle rounded-3 bg-white h-100 d-flex flex-column gap-1">
                    <i className={`fas ${item.icon} text-primary-emphasis`} style={{ fontSize: '0.7rem' }}></i>
                    <span className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.45rem', letterSpacing: '0.05em' }}>{item.label}</span>
                    <span className="fw-semibold text-dark text-truncate w-100" style={{ fontSize: '0.65rem' }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section Compact */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="p-3 p-md-4 bg-white rounded-4 shadow-sm border border-light-subtle">
          <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <div>
              <h5 className="fw-bold text-dark mb-0">Customer Reviews</h5>
              <div className="d-flex align-items-center gap-2">
                <RatingStars rating={product.rating} />
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>({product.reviews.length})</span>
              </div>
            </div>
            <button className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold" style={{ fontSize: '0.75rem' }}>
              Write Review
            </button>
          </div>
          <div className="row g-2">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="col-12 col-md-6">
                <div className="p-2 px-3 border border-light-subtle rounded-3 h-100 bg-light-subtle transition-all hover-white shadow-hover">
                  <ReviewCard review={review} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .product-page-compact {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .main-image-container {
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }
        
        .product-image-zoom {
            transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .main-image-container:hover .product-image-zoom {
            transform: scale(1.08);
        }
        
        .ring-active {
            border-color: #0d6efd !important;
            box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.2);
        }
        
        .btn-hover-effect {
            transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .btn-hover-effect:active {
            transform: scale(0.98);
        }
        
        .shadow-xs {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        
        .shadow-hover:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            transform: translateY(-1px);
        }
        
        .hover-white:hover {
            background-color: white !important;
            border-color: #dee2e6 !important;
        }
        
        .rating-stars {
            display: flex;
            color: #ffc107;
            gap: 2px;
        }
        
        .star { font-size: 0.8rem; }
        
        .quantity-selector {
            display: flex;
            align-items: center;
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            overflow: hidden;
            width: 100%;
            height: 100%;
        }
        
        .qty-btn {
            border: none;
            background: none;
            padding: 4px 8px;
            font-weight: bold;
            flex: 1;
            transition: background 0.2s;
            font-size: 1rem;
        }
        
        .qty-btn:hover:not(:disabled) { background: #f8f9fa; color: #0d6efd; }
        .qty-btn:disabled { color: #dee2e6; }
        
        .qty-value {
            flex: 1;
            text-align: center;
            font-weight: 700;
            font-size: 0.9rem;
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
        }
        
        .review-card {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
        }
        
        .reviewer-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .reviewer-avatar {
            width: 28px;
            height: 28px;
            background: #e9ecef;
            color: #495057;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 0.75rem;
        }
        
        .reviewer-name { font-weight: 700; margin: 0; font-size: 0.8rem; }
        .review-date { font-size: 0.65rem; color: #adb5bd; margin: 0; }
        .review-comment { font-size: 0.8rem; line-height: 1.4; color: #495057; margin: 0; }
        
        .scrollbar-hidden::-webkit-scrollbar { display: none; }
        .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>

  );
};

export default ProductPage;