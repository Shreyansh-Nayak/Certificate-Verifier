import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center text-center" style={{ minHeight: '80vh' }}>
      <div className="mb-4">
        <h1 className="text-primary" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Certificate Verification System</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
          Securely verify and validate internship certificates with our blockchain-enabled platform.
        </p>
      </div>

      <div className="flex gap-4" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/verify">
          <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Verify Certificate
          </button>
        </Link>

        <Link to="/admin/login">
          <button className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
            Admin Login
          </button>
        </Link>
      </div>

      <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', width: '100%' }}>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>🔒</div>
          <h3>Secure</h3>
          <p>Tamper-proof certificate verification ensuring authenticity.</p>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--secondary-color)' }}>⚡</div>
          <h3>Fast</h3>
          <p>Instant verification results with just a few clicks.</p>
        </div>
        <div className="card text-center">
          <div style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--success-color)' }}>✅</div>
          <h3>Reliable</h3>
          <p>Trusted by institutions for verifying academic credentials.</p>
        </div>
      </div>
    </div>
  );
}
