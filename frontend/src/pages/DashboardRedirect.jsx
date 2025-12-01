// src/pages/DashboardRedirect.jsx
import { Navigate } from "react-router-dom";

export default function DashboardRedirect({ user }) {
  if (!user) return <Navigate to="/login" replace />;

  return user.role === "PROVIDER"
    ? <Navigate to="/dashboard/provider" replace />
    : <Navigate to="/dashboard/user" replace />;
}
