import { HEADER_LOGO } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark border-bottom border-secondary border-opacity-25 shadow-xs py-1 sticky-top footer-compact">
      <div className="container py-1 d-flex justify-content-between align-items-center px-3 px-lg-4">
        <Link to="/" className="navbar-brand py-0 me-0">
          <div className="logo-container-compact bg-white px-3 py-2 rounded-pill shadow-xs transition-all">
            <img 
              className="logo-compact" 
              src={HEADER_LOGO} 
              alt="Logo" 
              style={{ height: '24px', width: 'auto' }}
            />
          </div>
        </Link>


        <button 
          className="navbar-toggler border-0 shadow-none py-1 px-2" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
        >
          <span className="navbar-toggler-icon" style={{ width: '1.2rem', height: '1.2rem' }}></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-lg-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link-compact active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link-compact" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link-compact" to="/contact">Contact</Link>
            </li>
            <li className="nav-item ms-lg-3">
              <button className="btn btn-light btn-compact-premium-light position-relative border-0 px-3 py-2 rounded-pill d-flex align-items-center gap-2">
                <div className="cart-icon-wrapper-light">
                  <i className="fas fa-shopping-cart" style={{ fontSize: '0.9rem' }}></i>
                  <span className="cart-badge-dot-light">0</span>
                </div>
                <span className="fw-bold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>My Cart</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <style>{`
        .footer-compact {
            background: #0f172a !important; /* Premium Slate Dark */
        }
        .navbar {
            backdrop-filter: blur(12px);
            background-color: rgba(15, 23, 42, 0.95) !important;
            transition: all 0.3s ease;
        }
        .shadow-xs {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .nav-link-compact {
            color: #94a3b8; /* Muted Slate */
            font-size: 0.8rem;
            font-weight: 700;
            padding: 0.4rem 0.8rem;
            text-decoration: none;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .nav-link-compact:hover {
            color: #fff;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
        }
        .nav-link-compact.active {
            color: #fff;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 6px;
        }
        .btn-compact-premium-light {
            background: #fff;
            color: #0f172a;
            transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .btn-compact-premium-light:hover {
            background: #f8f9fa;
            transform: translateY(-1px);
            box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
        .btn-compact-premium-light:active {
            transform: scale(0.96);
        }
        .cart-icon-wrapper-light {
            position: relative;
            display: flex;
            align-items: center;
        }
        .cart-badge-dot-light {
            position: absolute;
            top: -4px;
            right: -6px;
            background: #ef4444;
            color: white;
            font-size: 10px;
            min-width: 16px;
            height: 16px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            border: 2px solid #fff;
        }
        .logo-compact:hover {
            opacity: 0.8;
            transform: scale(0.97);
        }
      `}</style>


    </nav>
  );
};

export default Header;