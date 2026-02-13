import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VerifyCertificate from "./pages/VerifyCertificate";
import Result from "./pages/Result";
import IssueCertificate from "./pages/IssueCertificate";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="full-height flex flex-col">
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path="/result" element={<Result />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/admin/upload" element={<IssueCertificate />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
