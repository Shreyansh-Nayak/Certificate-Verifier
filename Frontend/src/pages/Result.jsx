import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const certificate = location.state?.certificate;

  if (!certificate) {
    return (
      <div className="container flex items-center justify-center p-4" style={{ minHeight: "80vh" }}>
        <div className="card text-center" style={{ maxWidth: "400px" }}>
          <p className="mb-4">No certificate data found.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: "80vh" }}>
      <div className="card text-center" style={{ maxWidth: "600px", width: "100%" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
        <h2 className="mb-4" style={{ color: "var(--success-color)" }}>Certificate Verified</h2>

        <div style={{ textAlign: "left", display: "grid", gap: "1rem", margin: "2rem 0", padding: "1.5rem", background: "var(--background-color)", borderRadius: "var(--radius-md)" }}>
          <div>
            <strong>Certificate ID:</strong>
            <div style={{ wordBreak: "break-all" }}>{certificate.certificateId}</div>
          </div>
          <div>
            <strong>Name:</strong>
            <div>{certificate.studentName}</div>
          </div>
          <div>
            <strong>Domain:</strong>
            <div>{certificate.domain}</div>
          </div>
          <div>
            <strong>Duration:</strong>
            <div>
              {new Date(certificate.startDate).toDateString()} - {new Date(certificate.endDate).toDateString()}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <a
            href={`http://localhost:5000/api/certificates/download/${certificate.certificateId}`}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Certificate (PDF)
          </a>

          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Verify Another
          </button>
        </div>
      </div>
    </div>
  );
}
