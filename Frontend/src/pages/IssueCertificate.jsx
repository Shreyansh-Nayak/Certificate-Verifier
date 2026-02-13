import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function IssueCertificate() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select an Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setStatus("");

      const res = await API.post(
        "/certificates/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setStatus(`✅ ${res.data.message}`);
      setFile(null);
      // Reset file input
      document.getElementById('fileInput').value = "";

    } catch (err) {
      console.error(err);
      setStatus(
        err.response?.data?.message || "❌ Upload failed. Please check the file format."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: "80vh" }}>
      <div className="card" style={{ maxWidth: "500px", width: "100%", textAlign: "center" }}>

        <div className="flex justify-between items-center mb-4">
          <h2 style={{ margin: 0 }}>Issue Certificates</h2>
          <button
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}
          >
            Logout
          </button>
        </div>

        <p className="mb-4 text-muted">Upload an Excel file (.xlsx) containing student details to generate certificates in bulk.</p>

        <div style={{ border: "2px dashed var(--border-color)", borderRadius: "var(--radius-lg)", padding: "2rem", marginBottom: "1.5rem", backgroundColor: "var(--background-color)" }}>
          <input
            id="fileInput"
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ width: "100%" }}
          />
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload & Issue"}
        </button>

        {status && (
          <div style={{ marginTop: "1rem", padding: "0.75rem", borderRadius: "var(--radius-md)", backgroundColor: status.includes("✅") ? "#dcfce7" : "#fee2e2", color: status.includes("✅") ? "var(--success-color)" : "var(--danger-color)" }}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
