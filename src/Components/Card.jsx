import React, { useState } from 'react';
import './style.css';

const ProductCard = ({ resData }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!resData) return null;

  const {
    title,
    description,
    category,
    price,
    discountPercentage = 0,
    rating,
    stock,
    tags = [],
    brand,
    thumbnail,
    reviews = []
  } = resData;

  const discountedPrice = discountPercentage > 0 
    ? (price - (price * discountPercentage / 100)).toFixed(2)
    : price.toFixed(2);
  
  const originalPrice = price.toFixed(2);
  const ratingValue = parseFloat(rating).toFixed(1);
  const isLowStock = stock < 20 && stock > 0;
  const isOutOfStock = stock === 0;

  const renderStars = (ratingValue) => {
    const stars = [];
    const numRating = parseFloat(ratingValue);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  const incrementQuantity = () => {
    if (quantity + 1 <= stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity - 1 >= 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="product-card-horizontal">
      {/* Image Section */}
      <div className="product-image-section">
        <img src={thumbnail} alt={title} />
        {discountPercentage > 0 && (
          <div className="discount-badge-horizontal">
            -{discountPercentage}%
          </div>
        )}
        {isOutOfStock && (
          <div className="out-of-stock-overlay-horizontal">
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="product-info-section">
        {/* Brand & Category */}
        <div className="product-meta-horizontal">
          {brand && <span className="brand-horizontal">{brand}</span>}
          {category && (
            <span className="category-horizontal">
              <i className="fas fa-tag"></i> {category}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="product-title-horizontal">{title}</h4>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="tags-horizontal">
            {tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="tag-horizontal">#{tag}</span>
            ))}
          </div>
        )}

        {/* Rating */}
        <div className="rating-section-horizontal">
          <div className="stars-horizontal">
            {renderStars(ratingValue)}
          </div>
          <span className="rating-value-horizontal">{ratingValue}</span>
          <span className="reviews-count-horizontal">
            ({reviews?.length || 0})
          </span>
        </div>

        {/* Price */}
        <div className="price-section-horizontal">
          {discountPercentage > 0 && (
            <span className="original-price-horizontal">${originalPrice}</span>
          )}
          <span className="discounted-price-horizontal">${discountedPrice}</span>
        </div>

        {/* Stock Status */}
        <div className="stock-status-horizontal">
          <span className={`status-badge-horizontal ${isOutOfStock ? 'out' : isLowStock ? 'low' : 'in'}`}>
            <i className={`fas ${isOutOfStock ? 'fa-times-circle' : isLowStock ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
            {isOutOfStock ? ' Out' : isLowStock ? ` Only ${stock}` : ` In Stock`}
          </span>
        </div>

        {/* Description */}
        <p className="description-horizontal">
          {description.length > 80 ? `${description.substring(0, 80)}...` : description}
        </p>

        {/* Quantity & Actions */}
        {!isOutOfStock && (
          <div className="actions-horizontal">
            <div className="quantity-horizontal">
              <button onClick={decrementQuantity} disabled={quantity <= 1} className="qty-btn-horizontal">
                <i className="fas fa-minus"></i>
              </button>
              <span className="quantity-value">{quantity}</span>
              <button onClick={incrementQuantity} disabled={quantity >= stock} className="qty-btn-horizontal">
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <button className="add-to-cart-btn-horizontal">
              <i className="fas fa-shopping-cart"></i>
              Add
            </button>
            <button 
              className={`wishlist-btn-horizontal ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`}></i>
            </button>
          </div>
        )}

        {isOutOfStock && (
          <button className="out-of-stock-btn-horizontal" disabled>
            <i className="fas fa-times-circle"></i> Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;