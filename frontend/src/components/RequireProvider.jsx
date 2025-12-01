import { Navigate } from "react-router-dom";

export default function RequireProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Debes registrarte o iniciar sesión para acceder.");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "PROVIDER") {
    alert("Solo proveedores pueden acceder a esta sección.");
    return <Navigate to="/dashboard/user" replace />;
  }

  return children;
}
