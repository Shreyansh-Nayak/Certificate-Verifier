import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";

export default function VerifyCertificate() {
  const [params] = useSearchParams();
  const prefilledId = params.get("certificateId");

  const [certificateId, setCertificateId] = useState(prefilledId || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const verify = async () => {
    if (!certificateId) {
      setError("Please enter a Certificate ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await API.get(
        `/certificates/verify/${certificateId}`
      );

      navigate("/result", {
        state: {
          certificate: res.data.data,
        },
      });

    } catch (err) {
      setError("Certificate not found or invalid ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: "80vh" }}>
      <div className="card" style={{ maxWidth: "500px", width: "100%", textAlign: "center" }}>
        <h2 className="mb-4">Verify Certificate</h2>
        <p className="mb-4">Enter the unique certificate ID to verify authenticity.</p>

        <div className="input-group">
          <input
            className="input-field"
            placeholder="Enter Certificate ID"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && verify()}
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={verify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {error && (
          <div style={{ marginTop: "1rem", color: "var(--danger-color)", padding: "0.5rem", border: "1px solid var(--danger-color)", borderRadius: "var(--radius-md)", backgroundColor: "#fef2f2" }}>
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
}
