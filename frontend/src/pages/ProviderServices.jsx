// src/pages/ProviderServices.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProviderServices() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    if (!user) return;

    const loadServices = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3001/provider/services/${user.id}?page=${page}&limit=9`
        );
        const data = await res.json();
        setServices(data.services);
        setFiltered(data.services);
        setTotalPages(data.totalPages);
      } catch (err) {
        alert("Error al cargar servicios");
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, [user, page]);

  // Filtrar según query
  useEffect(() => {
    if (!query) {
      setFiltered(services);
      return;
    }

    const f = services.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        (s.subtitle && s.subtitle.toLowerCase().includes(query)) ||
        (s.category && s.category.toLowerCase().includes(query))
    );
    setFiltered(f);
  }, [query, services]);

  if (!user || user.role !== "PROVIDER") {
    return <p>Sin acceso</p>;
  }

  return (
    <div className="px-8 py-10">
      {/* 🔹 Header con botón CREAR SERVICIO */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mis servicios</h1>

        <button
          onClick={() => navigate("/provider/services/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Crear servicio
        </button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : filtered.length === 0 ? (
        <p>No se encontraron servicios para "{query}"</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((s) => {
              const imgUrl = s.img
                ? s.img.startsWith("http")
                  ? s.img
                  : s.img.startsWith("/")
                  ? `http://localhost:3001${s.img}`
                  : `http://localhost:3001/uploads/${s.img}`
                : "https://via.placeholder.com/300x200?text=Sin+Imagen";

              return (
                <Link
                  key={s.id}
                  to={`/provider/services/${s.id}`}
                  className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    className="w-full h-40 object-cover rounded mb-4"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x200?text=No+Disponible")
                    }
                  />
                  <h2 className="text-xl font-semibold">{s.title}</h2>
                  <p className="text-gray-600">{s.subtitle}</p>
                  <p className="text-blue-600 font-bold mt-2">
                    S/. {s.price}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* 🔹 Paginación */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Anterior
            </button>

            <span className="text-lg font-medium">
              Página {page} de {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded ${
                page === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
