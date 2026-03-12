import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./api_services/auth/AuthAPIService";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import NotFoundPage from "./pages/not_found/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/404" element={<NotFoundPage />} />

      {/* Catch-all route for non-existent pages */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;