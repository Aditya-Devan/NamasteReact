import React from 'react';
import { Link } from 'react-router-dom';
import { HEADER_LOGO } from '../utils/constants';

const Footer = () => {
    return (
        <footer className="footer-compact bg-dark text-white pt-5 pb-3">
            <div className="container">
                <div className="row g-4 mb-4">
                    {/* Brand Section */}
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <img 
                                src={HEADER_LOGO} 
                                alt="Brand Logo" 
                                style={{ height: '32px', filter: 'brightness(0) invert(1)' }} 
                            />
                        </div>
                        <p className="text-secondary small mb-4" style={{ maxWidth: '400px', lineHeight: '1.6' }}>
                            Experience high-quality products delivered with speed and care. Your premier destination for shopping.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-sm-6 col-lg-3">
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>Store Details</h6>
                        <ul className="list-unstyled footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-sm-6 col-lg-3">
                        <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>Support</h6>
                        <ul className="list-unstyled footer-links">
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Returns & Refunds</a></li>
                        </ul>
                    </div>
                </div>

                {/* Lower Footer */}
                <div className="pt-4 border-top border-secondary border-opacity-25 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
                    <p className="text-secondary mb-0" style={{ fontSize: '0.7rem' }}>
                        &copy; {new Date().getFullYear()} Namaste React Store. All Rights Reserved.
                    </p>
                    <div className="d-flex gap-3 text-secondary" style={{ fontSize: '0.7rem' }}>
                        <a href="#" className="text-decoration-none text-reset hover-white">Terms of Service</a>
                        <a href="#" className="text-decoration-none text-reset hover-white">Privacy Policy</a>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-compact {
                    font-family: 'Inter', sans-serif;
                    background: #0f172a !important; /* Premium Slate Dark */
                }
                .footer-links li {
                    margin-bottom: 0.5rem;
                }
                .footer-links a {
                    color: #94a3b8; /* Muted Slate */
                    text-decoration: none;
                    font-size: 0.8rem;
                    transition: all 0.2s;
                }
                .footer-links a:hover {
                    color: #fff;
                    transform: translateX(3px);
                    display: inline-block;
                }
                .social-link {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #94a3b8;
                    font-size: 0.85rem;
                    text-decoration: none;
                    transition: all 0.3s;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .social-link:hover {
                    background: #fff;
                    color: #0f172a;
                    transform: translateY(-3px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                }
                .hover-white:hover {
                    color: #fff !important;
                }
                .shadow-xs {
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }
            `}</style>
        </footer>
    );
};

export default Footer;
