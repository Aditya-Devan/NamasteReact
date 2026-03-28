import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    <div className="product-page">
      {/* Success Toast */}
      {showSuccessMessage && (
        <div className="success-toast">
          <div className="toast-content">
            <span className="toast-icon">✓</span>
            <span>Added to cart! ({quantity} item{quantity !== 1 ? 's' : ''})</span>
          </div>
        </div>
      )}

      {/* Main Product Section */}
      <div className="product-container">
        <div className="product-grid">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image">
              <img
                src={hasImages ? product.images[selectedImage] : product.thumbnail}
                alt={product.title}
              />
            </div>
            {hasImages && product.images.length > 1 && (
              <div className="thumbnail-list">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`thumbnail-btn ${selectedImage === idx ? 'active' : ''}`}
                  >
                    <img src={img} alt={`${product.title} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            {/* Brand and Tags */}
            <div className="brand-tags">
              {product.brand && <span className="brand-badge">{product.brand}</span>}
              {product.tags && product.tags.map((tag) => (
                <span key={tag} className="tag-badge">#{tag}</span>
              ))}
              <span className="category-badge">{product.category}</span>
            </div>

            {/* Title */}
            <h1 className="product-title">{product.title}</h1>

            {/* Rating and Reviews */}
            <div className="rating-section">
              <RatingStars rating={product.rating} />
              <span className="rating-value">{product.rating}</span>
              <span className="review-count">
                ({product.reviews ? product.reviews.length : 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="price-section">
              <div className="price-wrapper">
                <span className="current-price">${discountedPrice.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="original-price">${product.price.toFixed(2)}</span>
                    <span className="discount-badge">{product.discountPercentage}% OFF</span>
                  </>
                )}
              </div>
              <p className="price-note">Tax included. Free shipping on orders over $50</p>
            </div>

            {/* Description */}
            <p className="product-description">{product.description}</p>

            {/* Stock Status */}
            <div className="stock-status">
              {isLowStock ? (
                <div className="low-stock">
                  <span className="warning-icon">⚠</span>
                  <span>Low Stock - Only {product.stock} left</span>
                </div>
              ) : product.stock > 0 ? (
                <div className="in-stock">
                  <span className="check-icon">✓</span>
                  <span>In Stock ({product.stock} available)</span>
                </div>
              ) : (
                <div className="out-of-stock">
                  <span className="warning-icon">✗</span>
                  <span>Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector and Add to Cart */}
            {product.stock > 0 && (
              <>
                <div className="cart-section">
                  <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    minOrder={product.minimumOrderQuantity || 1}
                    maxStock={product.stock}
                  />
                  <button onClick={handleAddToCart} className="add-to-cart-btn">
                    Add to Cart • ${totalPrice.toFixed(2)}
                  </button>
                </div>

                {/* Minimum Order Notice */}
                {product.minimumOrderQuantity > 1 && (
                  <p className="min-order-notice">
                    Minimum order quantity: {product.minimumOrderQuantity} units
                  </p>
                )}
              </>
            )}

            {/* Shipping and Warranty Info */}
            <div className="info-grid">
              <div className="info-card">
                <span className="info-icon">🚚</span>
                <div>
                  <p className="info-label">Shipping</p>
                  <p className="info-value">{product.shippingInformation || "Standard shipping"}</p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">🛡️</span>
                <div>
                  <p className="info-label">Warranty</p>
                  <p className="info-value">{product.warrantyInformation || "Standard warranty"}</p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">↺</span>
                <div>
                  <p className="info-label">Returns</p>
                  <p className="info-value">{product.returnPolicy || "30 days return policy"}</p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">📦</span>
                <div>
                  <p className="info-label">Weight</p>
                  <p className="info-value">{product.weight || "N/A"} {product.weight ? (product.weight < 10 ? "g" : "kg") : ""}</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="additional-info">
              {product.sku && <p>SKU: {product.sku}</p>}
              {product.meta?.barcode && <p>Barcode: {product.meta.barcode}</p>}
              {product.dimensions && (
                <p>Dimensions: {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="reviews-section">
          <div className="reviews-header">
            <div>
              <h2 className="reviews-title">Customer Reviews</h2>
              <div className="reviews-summary">
                <RatingStars rating={product.rating} />
                <span className="review-total">Based on {product.reviews.length} reviews</span>
              </div>
            </div>
            <button className="write-review-btn">
              <span>✍️</span>
              Write a Review
            </button>
          </div>
          <div className="reviews-list">
            {product.reviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        /* Global Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .product-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        }

        .product-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-grid {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 32px;
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 24px;
          }
        }

        /* Image Gallery */
        .image-gallery {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .main-image {
          aspect-ratio: 1;
          background: #f8f9fa;
          border-radius: 16px;
          overflow: hidden;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .main-image img:hover {
          transform: scale(1.05);
        }

        .thumbnail-list {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .thumbnail-btn {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #e9ecef;
          background: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .thumbnail-btn.active {
          border-color: #e83e8c;
          box-shadow: 0 4px 12px rgba(232, 62, 140, 0.2);
        }

        .thumbnail-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Product Info */
        .product-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .brand-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .brand-badge, .category-badge {
          background: #fce4ec;
          color: #e83e8c;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .category-badge {
          background: #e3f2fd;
          color: #1976d2;
        }

        .tag-badge {
          background: #f1f3f5;
          color: #6c757d;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .product-title {
          font-size: 28px;
          font-weight: 700;
          color: #212529;
          line-height: 1.3;
        }

        .rating-stars {
          display: flex;
          gap: 2px;
        }

        .star {
          font-size: 16px;
          color: #e9ecef;
        }

        .star.filled {
          color: #fbbf24;
        }

        .star.half-filled {
          position: relative;
          color: #fbbf24;
          clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
        }

        .rating-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rating-value {
          font-weight: 600;
          color: #212529;
        }

        .review-count {
          color: #6c757d;
          font-size: 14px;
        }

        .price-section {
          padding: 12px 0;
        }

        .price-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .current-price {
          font-size: 32px;
          font-weight: 700;
          color: #212529;
        }

        .original-price {
          font-size: 18px;
          color: #adb5bd;
          text-decoration: line-through;
        }

        .discount-badge {
          background: #d4edda;
          color: #155724;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .price-note {
          font-size: 12px;
          color: #6c757d;
          margin-top: 8px;
        }

        .product-description {
          color: #495057;
          line-height: 1.6;
        }

        .stock-status {
          margin: 8px 0;
        }

        .low-stock, .in-stock, .out-of-stock {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 500;
        }

        .low-stock {
          background: #fff3e0;
          color: #e67700;
        }

        .in-stock {
          background: #e6f9ed;
          color: #2b8c4a;
        }

        .out-of-stock {
          background: #ffe6e6;
          color: #dc3545;
        }

        .cart-section {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid #dee2e6;
          border-radius: 12px;
          overflow: hidden;
        }

        .qty-btn {
          width: 44px;
          height: 48px;
          background: white;
          border: none;
          font-size: 20px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .qty-btn:hover:not(:disabled) {
          background: #f8f9fa;
        }

        .qty-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .qty-value {
          width: 52px;
          text-align: center;
          font-weight: 500;
        }

        .add-to-cart-btn {
          flex: 1;
          background: linear-gradient(135deg, #e83e8c 0%, #9b4d96 100%);
          color: white;
          border: none;
          padding: 0 24px;
          height: 48px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .add-to-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(232, 62, 140, 0.3);
        }

        .min-order-notice {
          font-size: 12px;
          color: #868e96;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 16px;
          margin: 8px 0;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .info-icon {
          font-size: 22px;
        }

        .info-label {
          font-size: 11px;
          color: #868e96;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 13px;
          font-weight: 500;
          color: #212529;
        }

        .additional-info {
          font-size: 12px;
          color: #868e96;
          border-top: 1px solid #e9ecef;
          padding-top: 16px;
          margin-top: 8px;
        }

        .additional-info p {
          margin-bottom: 4px;
        }

        .reviews-section {
          max-width: 1200px;
          margin: 40px auto 0;
          background: white;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .reviews-title {
          font-size: 24px;
          font-weight: 700;
          color: #212529;
          margin-bottom: 8px;
        }

        .reviews-summary {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .review-total {
          font-size: 14px;
          color: #6c757d;
        }

        .write-review-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #212529;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 40px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .write-review-btn:hover {
          background: #343a40;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .review-card {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9ecef;
        }

        .review-card:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .reviewer-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .reviewer-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e83e8c, #9b4d96);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
        }

        .reviewer-name {
          font-weight: 600;
          color: #212529;
        }

        .review-date {
          font-size: 11px;
          color: #adb5bd;
          margin-top: 2px;
        }

        .review-comment {
          color: #495057;
          line-height: 1.5;
          margin-left: 52px;
        }

        .success-toast {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          animation: slideIn 0.3s ease-out;
        }

        .toast-content {
          background: #2b8c4a;
          color: white;
          padding: 12px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .toast-icon {
          font-size: 18px;
          font-weight: bold;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          .product-page {
            padding: 20px 16px;
          }
          .product-title {
            font-size: 24px;
          }
          .current-price {
            font-size: 28px;
          }
          .info-grid {
            grid-template-columns: 1fr;
          }
          .review-comment {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductPage;