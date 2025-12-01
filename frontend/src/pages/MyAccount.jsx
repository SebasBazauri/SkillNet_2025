import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const MyAccount = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No has iniciado sesión</h2>
        <p className="text-gray-500 mt-2">
          Por favor inicia sesión para ver tu cuenta.
        </p>
      </div>
    );
  }

  const isProvider = user.role === "PROVIDER";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mi Cuenta</h1>
          <p className="text-gray-500">Gestiona tu información personal</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Perfil */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-6">
        <img
          src={user.avatarUrl || "https://via.placeholder.com/80"}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div className="flex-1 space-y-1">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-700">{user.email}</p>
          <p className="text-sm text-gray-500">
            Registrado: {new Date(user.createdAt).toLocaleDateString()}
          </p>

          <span className="inline-block mt-2 bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Rol: {user.role === "CLIENT" ? "Cliente" : "Proveedor"}
          </span>
        </div>
      </div>

      {/* ----------------- TABS ENLAZADOS ------------------- */}
      <div className="space-y-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">

          {/* Editar Perfil */}
          <Link
            to="/account/edit"
            className="py-2 px-4 bg-gray-200 rounded-lg font-medium text-center hover:bg-gray-300"
          >
            Editar Perfil
          </Link>

          {/* Mis Reservas */}
          <Link
            to={isProvider ? "/provider/mybookings" : "/client/mybookings"}
            className="py-2 px-4 bg-gray-200 rounded-lg font-medium text-center hover:bg-gray-300"
          >
            Mis Reservas
          </Link>

          {/* Mis Estadísticas (dependiendo del rol) */}
          <Link
            to={isProvider ? "/dashboard/provider" : "/dashboard/client"}
            className="py-2 px-4 bg-gray-200 rounded-lg font-medium text-center hover:bg-gray-300"
          >
            Mis Estadísticas
          </Link>

          {/* Mis Servicios (solo proveedor) */}
          {isProvider && (
            <Link
              to="/provider/services"
              className="py-2 px-4 bg-gray-200 rounded-lg font-medium text-center hover:bg-gray-300"
            >
              Mis Servicios
            </Link>
          )}

        </div>

        {/* Sección de contenido */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-lg font-semibold">Contenido de la sección</h3>
          <p className="text-gray-600 mt-2">
            (Indícame qué sección quieres que implemente ahora.)
          </p>
        </div>

      </div>
    </div>
  );
};

export default MyAccount;
