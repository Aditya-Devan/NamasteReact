import React from 'react';

const About = () => {
  return (
    <div className="container py-4 mt-2 mb-4 animate-fadeIn">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          <div className="bg-white rounded-4 shadow-sm overflow-hidden border border-light-subtle">
            <div className="row g-0">
              {/* Sidebar Branding - Dark Slate */}
              <div className="col-md-5 bg-dark-slate p-3 p-md-4 text-white d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-1 ls-1">The Mission</h4>
                  <p className="small text-secondary mb-4">Pioneering Joy in Commerce</p>
                  
                  <div className="d-flex flex-column gap-3 mt-4">
                    {[
                        { icon: 'fa-trophy', label: '10K+ Orders Delivered', desc: 'Successfully fulfilled globally' },
                        { icon: 'fa-star', label: '4.8 Customer Rating', desc: 'Based on verified reviews' },
                        { icon: 'fa-bolt', label: 'Rapid Shipping', desc: 'Domestic express delivery' }
                    ].map((item, i) => (
                        <div key={i} className="d-flex align-items-center gap-3">
                            <div className="p-2 bg-white bg-opacity-10 rounded-3 border border-white border-opacity-10 shadow-xs"><i className={`fas ${item.icon} small text-info`}></i></div>
                            <div>
                                <p className="m-0 small fw-bold">{item.label}</p>
                                <p className="text-secondary m-0" style={{fontSize: '0.65rem'}}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-auto">
                    <p className="text-secondary small m-0 fw-bold ls-1" style={{fontSize: '0.55rem', letterSpacing: '0.1em'}}>ESTABLISHED 2024</p>
                    <p className="small m-0 fw-medium opacity-75">Namaste React Ecosystem</p>
                </div>
              </div>

              {/* Main Content - Clean White */}
              <div className="col-md-7 p-3 p-md-4 bg-white d-flex flex-column gap-3">
                <div className="border-bottom pb-3">
                    <h3 className="fw-bold text-dark mb-2">Who We Are</h3>
                    <p className="text-muted small m-0" style={{lineHeight: '1.6'}}>
                        Welcome to <span className="text-primary fw-bold">Namaste React Store</span>, your premier portal for premium products curated with precision. We bridge the gap between world-class artisans and your doorstep, ensuring every click results in a smile.
                    </p>
                </div>

                <div className="row g-3">
                    <div className="col-12">
                        <label className="text-secondary fw-bold ms-1 mb-2" style={{fontSize: '0.55rem', letterSpacing: '0.1em'}}>CORE PILLARS</label>
                    </div>
                    {[
                        { title: 'Quality Focus', desc: 'Rigorous 24-point quality inspection for every product departure.' },
                        { title: 'Global Reach', desc: 'Bridging continents through state-of-the-art logistics partners.' },
                        { title: 'Customer First', desc: '24/7 dedicated support via AI and human experts.' }
                    ].map((pillar, idx) => (
                        <div key={idx} className="col-12">
                            <div className="p-3 bg-light rounded-3 border border-light-subtle shadow-xs hover-glow transition-all">
                                <h6 className="fw-bold text-dark mb-1">{pillar.title}</h6>
                                <p className="text-muted m-0 small">{pillar.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-3 border-top">
                    <button className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold ls-1">
                        VIEW PHILOSOPHY
                    </button>
                </div>
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
        .text-info {
           color: #60a5fa !important;
        }
        .ls-1 { letter-spacing: 0.1em; }
        .hover-glow:hover { 
            transform: translateX(4px);
            background: #fff !important;
            border-color: #dee2e6 !important;
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

export default About;
