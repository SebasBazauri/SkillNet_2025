// src/pages/ServiceListings.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ServiceListings() {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleServiceClick = (service) => {
    if (!user) return navigate(`/services/${service.id}`);
    if (user.role === "PROVIDER" && user.id === service.providerId) {
      return navigate(`/provider/services/${service.id}`);
    }
    navigate(`/services/${service.id}`);
  };

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/services`);
        const data = await res.json();
        setServices(data);
        setFiltered(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services", err);
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered(services);
      setPage(1);
      return;
    }
    const result = services.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        (s.category && s.category.toLowerCase().includes(query))
    );
    setFiltered(result);
    setPage(1);
  }, [query, services]);

  if (loading) return <p className="text-center mt-10">Cargando servicios...</p>;

  const startIndex = (page - 1) * pageSize;
  const currentServices = filtered.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div className="px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Servicios disponibles</h1>

      {filtered.length === 0 && (
        <p className="text-gray-600 text-lg mt-10">
          No se encontraron servicios para: <b>{query}</b>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentServices.map((service) => {
          const imgUrl = service.img
            ? service.img.startsWith("http")
              ? service.img
              : service.img.startsWith("/")
              ? `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}${service.img}`
              : `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/uploads/${service.img}`
            : "https://via.placeholder.com/300x200?text=Sin+Imagen";

          return (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white cursor-pointer"
            >
              <img
                src={imgUrl}
                alt={service.title}
                className="w-full h-40 object-cover rounded mb-4"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/300x200?text=No+Disponible")
                }
              />
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="text-gray-600">{service.subtitle}</p>
              <p className="text-blue-600 font-bold mt-2">S/ {service.price}</p>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
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
      )}
    </div>
  );
}
