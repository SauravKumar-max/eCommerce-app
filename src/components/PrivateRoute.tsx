import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { authState } = useAuth();
  const { login } = authState;
  const location = useLocation();
  return login ? children : <Navigate to="/login" state={{ from: location }} />;
}
