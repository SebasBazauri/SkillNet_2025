// src/components/Header.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/LOGO.png"; // ⬅️ Import del logo

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const role = user?.role; // CLIENT o PROVIDER
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 🔹 Ocultar barra de búsqueda en /services/:id/book
  const showSearchBar =
    (location.pathname.startsWith("/services") &&
      !location.pathname.includes("/book")) ||
    location.pathname.startsWith("/provider/services");

  // 🔎 Manejo de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    if (location.pathname.startsWith("/services")) {
      navigate(`/services?q=${search}`);
    } else if (location.pathname.startsWith("/provider/services")) {
      navigate(`/provider/services?q=${search}`);
    }
  };

  return (
    <header className="w-full bg-white shadow px-8 py-4 flex items-center justify-between">
      
      {/* LOGO FIJO EN TODO EL SISTEMA */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="SkillNet Logo"
          className="h-12 object-contain"
        />
      </Link>

      {/* BARRA DE BÚSQUEDA */}
      {showSearchBar && (
        <form onSubmit={handleSearch} className="flex items-center w-96">
          <input
            type="text"
            className="border px-3 py-2 w-full rounded-l-md"
            placeholder={
              location.pathname.startsWith("/provider")
                ? "Buscar en mis servicios..."
                : "Buscar servicios..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 rounded-r-md">
            Buscar
          </button>
        </form>
      )}

      {/* NAVEGACIÓN */}
      <nav className="flex items-center gap-6 text-gray-700 font-medium">
        {/* 🔹 Opciones para usuarios NO autenticados */}
        {!isAuthenticated && (
          <>
            <Link to="/services" className="hover:text-blue-600">
              Explorar servicios
            </Link>
            <Link to="/become-provider" className="hover:text-blue-600">
              Convertirte en proveedor
            </Link>
            <Link to="/login" className="hover:text-blue-600">
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Registrarte
            </Link>
          </>
        )}

        {/* 🔹 Opciones para CLIENTE */}
        {isAuthenticated && role === "CLIENT" && (
          <>
            <Link to="/services" className="hover:text-blue-600">
              Explorar servicios
            </Link>

            <Link to="/become-provider" className="hover:text-blue-600">
              Convertirte en proveedor
            </Link>

            <Link to="/profile" className="hover:text-blue-600 ml-auto">
              Mi cuenta
            </Link>
          </>
        )}

        {/* 🔹 Opciones para PROVIDER */}
        {isAuthenticated && role === "PROVIDER" && (
          <>
            <Link to="/services" className="hover:text-blue-600">
              Explorar servicios
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1">
                Mi negocio ▾
              </button>

              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded p-3 w-48 z-50">
                <Link
                  className="block py-1 hover:text-blue-600"
                  to="/provider/services"
                >
                  Mis servicios
                </Link>
                <Link
                  className="block py-1 hover:text-blue-600"
                  to="/provider/mybookings"
                >
                  Mis reservas
                </Link>
                <Link
                  className="block py-1 hover:text-blue-600"
                  to="/dashboard/provider"
                >
                  Estadísticas
                </Link>
              </div>
            </div>

            <Link to="/profile" className="ml-auto hover:text-blue-600">
              Mi cuenta
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
