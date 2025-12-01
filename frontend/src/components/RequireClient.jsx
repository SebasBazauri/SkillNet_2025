import { Navigate } from "react-router-dom";

export default function RequireClient({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Debes registrarte o iniciar sesión para acceder.");
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "CLIENT") {
    alert("Solo clientes pueden acceder a esta sección.");
    return <Navigate to="/dashboard/provider" replace />;
  }

  return children;
}
