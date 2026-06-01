import { useRouteError, Link } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    return (
        <div className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <div className="bg-white p-5 rounded-5 shadow-lg border-0">
                        <div className="mb-4 d-inline-block p-4 bg-danger-subtle rounded-circle text-danger">
                            <i className="fas fa-exclamation-triangle display-4"></i>
                        </div>
                        <h1 className="display-4 fw-black text-dark mb-2">Oops...!!!</h1>
                        <h2 className="text-secondary mb-4">Something Went Wrong</h2>
                        <div className="alert alert-danger rounded-4 py-3 mb-4">
                            <span className="fw-bold">{err.status}</span>: {err.statusText || "Unknown Error"}
                        </div>
                        <p className="text-muted mb-5">The page you're looking for might be temporarily unavailable or has moved.</p>
                        <Link to="/" className="btn btn-dark btn-lg rounded-pill px-5 fw-bold shadow-sm hover-grow transition-all">
                            Back to Store
                        </Link>
                    </div>
                </div>
            </div>
            
            <style>{`
                .fw-black { font-weight: 900; }
                .hover-grow:hover { transform: scale(1.02); }
                .transition-all { transition: all 0.3s ease; }
            `}</style>
        </div>
    );
};

export default Error;