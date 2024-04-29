import { Navigate, useLocation } from "react-router-dom";
import { AuthService } from "../../services/auth.service";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = AuthService.check();

  if (!isAuthenticated) {
    AuthService.logout();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
