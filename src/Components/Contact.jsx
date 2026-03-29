import React from 'react';

const Contact = () => {
  return (
    <div className="container py-4 mt-2 mb-4 animate-fadeIn">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          <div className="bg-white rounded-4 shadow-sm overflow-hidden border border-light-subtle">
            <div className="row g-0">
              {/* Contact Sidebar - Dark Slate */}
              <div className="col-md-5 bg-dark-slate p-3 p-md-4 text-white d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-3 ls-1">Contact Hub</h4>
                  <div className="d-flex flex-column gap-3 mt-4">
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-2 bg-white bg-opacity-10 rounded-3 border border-white border-opacity-10"><i className="fas fa-envelope small"></i></div>
                      <div>
                        <p className="text-secondary small m-0 fw-bold ls-1" style={{fontSize: '0.55rem', letterSpacing: '0.05em'}}>SUPPORT EMAIL</p>
                        <p className="m-0 small fw-medium">help@namastereact.com</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-2 bg-white bg-opacity-10 rounded-3 border border-white border-opacity-10"><i className="fas fa-phone small"></i></div>
                      <div>
                        <p className="text-secondary small m-0 fw-bold ls-1" style={{fontSize: '0.55rem', letterSpacing: '0.05em'}}>DIRECT LINE</p>
                        <p className="m-0 small fw-medium">+1 (888) 123-4567</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="p-2 bg-white bg-opacity-10 rounded-3 border border-white border-opacity-10"><i className="fas fa-map-marker-alt small"></i></div>
                      <div>
                        <p className="text-secondary small m-0 fw-bold ls-1" style={{fontSize: '0.55rem', letterSpacing: '0.05em'}}>HEADQUARTERS</p>
                        <p className="m-0 small fw-medium">San Francisco, CA</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex gap-2 pt-4">
                  <a href="#" className="social-pill-compact">TW</a>
                  <a href="#" className="social-pill-compact">IN</a>
                  <a href="#" className="social-pill-compact">LI</a>
                </div>
              </div>

              {/* Form Section - Clean White */}
              <div className="col-md-7 p-3 p-md-4 bg-white">
                <h4 className="fw-bold text-dark mb-1">Direct Message</h4>
                <p className="text-muted small mb-3">Our team typically responds within 4 hours.</p>
                
                <form className="mt-2 text-start">
                  <div className="row g-2">
                    <div className="col-md-6 text-start">
                      <label className="text-secondary fw-bold ms-1" style={{fontSize: '0.55rem', letterSpacing: '0.05em'}}>FULL NAME</label>
                      <input type="text" className="form-control rounded-3 border-light bg-light py-2 px-3 small shadow-none" placeholder="Aditya Devan" style={{fontSize: '0.85rem'}} />
                    </div>
                    <div className="col-md-6 text-start">
                      <label className="text-secondary fw-bold ms-1" style={{fontSize: '0.55rem', letterSpacing: '0.05em'}}>EMAIL ADDRESS</label>
                      <input type="email" className="form-control rounded-3 border-light bg-light py-2 px-3 small shadow-none" placeholder="ad@example.com" style={{fontSize: '0.85rem'}} />
                    </div>
                    <div className="col-12 text-start">
                      <label className="text-secondary fw-bold ms-1" style={{fontSize: '0.55rem', letterSpacing: '0.05em'}}>YOUR INQUIRY</label>
                      <textarea className="form-control rounded-3 border-light bg-light py-2 px-3 small shadow-none" placeholder="Tell us how we can help..." style={{height: '100px', fontSize: '0.85rem'}}></textarea>
                    </div>
                    <div className="col-12 pt-1 mt-3">
                      <button className="btn btn-dark w-100 rounded-3 py-2 fw-bold ls-1 shadow-sm hover-grow transition-all bg-dark-slate border-0">
                        DISPATCH MESSAGE
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .bg-dark-slate {
          background: #0f172a !important;
        }
        .text-secondary {
          color: #94a3b8 !important;
        }
        .ls-1 { letter-spacing: 0.1em; }
        .hover-grow:hover { transform: scale(1.01); transition: all 0.2s ease; }
        
        .social-pill-compact {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            color: white;
            font-size: 0.65rem;
            font-weight: 800;
            text-decoration: none;
            transition: all 0.2s;
        }
        .social-pill-compact:hover {
            background: white;
            color: #0f172a;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>

  )
}

export default Contact;