import React, { useState } from 'react';

const ProductCard = ({ resData }) => {
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
    thumbnail,
  } = resData;

  const discountedPrice = discountPercentage > 0 
    ? (price - (price * discountPercentage / 100)).toFixed(2)
    : price.toFixed(2);
  
  const originalPrice = price.toFixed(2);
  const ratingValue = parseFloat(rating).toFixed(1);
  const isOutOfStock = stock === 0;

  return (
    <div className="card h-100 border-0 shadow-xs card-premium transition-all overflow-hidden rounded-4">
      {/* Image Section */}
      <div className="position-relative bg-light p-2 text-center d-flex align-items-center justify-content-center" style={{ height: '170px' }}>
        <img 
          src={thumbnail} 
          className="card-img-top h-100 object-fit-contain transition-transform duration-500 card-image" 
          alt={title} 
        />
        {discountPercentage > 0 && (
          <span className="position-absolute top-0 start-0 badge rounded-2 bg-danger m-2 shadow-xs px-2 py-1" style={{ fontSize: '0.65rem', fontWeight: '800' }}>
            -{discountPercentage}%
          </span>
        )}
        <button 
          className={`position-absolute top-0 end-0 btn btn-sm m-2 rounded-circle shadow-xs bg-white border-0 p-1 d-flex align-items-center justify-content-center ${isWishlisted ? 'text-danger' : 'text-muted'}`}
          style={{ width: '28px', height: '28px', transition: 'all 0.2s', zIndex: 2 }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsWishlisted(!isWishlisted); }}
        >
          <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`} style={{ fontSize: '0.85rem' }}></i>
        </button>
      </div>

      {/* Info Section */}
      <div className="card-body d-flex flex-column p-3 gap-1">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="text-uppercase text-secondary fw-bold" style={{ fontSize: '0.55rem', letterSpacing: '0.05em' }}>
            {category}
          </span>
          <div className="d-flex align-items-center text-warning" style={{ fontSize: '0.75rem' }}>
            <i className="fas fa-star me-1" style={{ fontSize: '0.7rem' }}></i>
            <span className="fw-bold text-dark">{ratingValue}</span>
          </div>
        </div>

        <h6 className="card-title fw-bold text-dark text-truncate mb-1" style={{ fontSize: '0.9rem' }} title={title}>{title}</h6>
        
        <p className="card-text text-muted mb-2 line-clamp-2" style={{ fontSize: '0.75rem', lineHeight: '1.4', height: '2.1rem', overflow: 'hidden' }}>
          {description}
        </p>

        <div className="d-flex align-items-baseline gap-2 mb-2 mt-auto">
          <span className="h5 fw-bold text-primary mb-0">${discountedPrice}</span>
          {discountPercentage > 0 && (
            <span className="text-muted text-decoration-line-through fw-medium" style={{ fontSize: '0.7rem' }}>${originalPrice}</span>
          )}
        </div>

        {!isOutOfStock ? (
          <div className="d-grid pt-1">
            <button className="btn btn-dark rounded-3 py-1 fw-bold shadow-xs btn-compact-glow d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '0.75rem' }}>
              <i className="fas fa-shopping-cart" style={{ fontSize: '0.7rem' }}></i>
              <span>Add to Cart</span>
            </button>
          </div>
        ) : (
          <div className="d-grid pt-1">
            <button className="btn btn-light disabled rounded-3 py-1 fw-bold text-secondary" style={{ fontSize: '0.75rem' }} disabled>
              Out of Stock
            </button>
          </div>
        )}
      </div>

      <style>{`
        .card-premium {
          border: 1px solid rgba(0,0,0,0.03) !important;
          background: #fff;
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
        }
        .card-premium:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05) !important;
          border-color: rgba(0,0,0,0.08) !important;
        }
        .card-premium:hover .card-image {
          transform: scale(1.06);
        }
        .card-image {
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .shadow-xs {
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .btn-compact-glow:active {
          transform: scale(0.97);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
