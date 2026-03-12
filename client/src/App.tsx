import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import NotFoundPage from "./pages/not_found/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* 404 Page */}
      <Route path="/404" element={<NotFoundPage />} />

      {/* Root -> Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch-all route for non-existent pages */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;