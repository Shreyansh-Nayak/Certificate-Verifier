import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "nav-link active" : "nav-link";
    };

    return (
        <nav className="navbar">
            <div className="container flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    {/* Simple Icon placeholder if no image available */}
                    <div style={{ width: '30px', height: '30px', backgroundColor: 'var(--primary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>C</div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>CertVerifier</span>
                </Link>

                <div className="flex gap-4">
                    <Link to="/" className={isActive("/")}>
                        Home
                    </Link>
                    <Link to="/verify" className={isActive("/verify")}>
                        Verify
                    </Link>
                    <Link to="/admin/login" className={isActive("/admin/login")}>
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
}
