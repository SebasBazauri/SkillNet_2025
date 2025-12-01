// src/pages/ServiceDetail.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/services/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!service) return <p>No se encontró el servicio.</p>;

  // === Construcción del URL de la imagen ===
  const imgUrl = service.img
    ? service.img.startsWith("http")
      ? service.img
      : service.img.startsWith("/")
      ? `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}${service.img}`
      : `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/uploads/${service.img}`
    : "https://via.placeholder.com/600x400?text=Sin+Imagen";

  // === Navegación al formulario de reserva ===
  const handleBook = () => {
    const serviceId = service?.id || id;
    navigate(`/services/${serviceId}/book`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* BACK */}
      <Link to="/services" className="text-blue-600 underline mb-4 inline-block">
        ← Volver
      </Link>

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{service.subtitle}</p>

      {/* IMAGE */}
      <img
        src={imgUrl}
        alt={service.title}
        className="w-full h-72 object-cover rounded-lg shadow-md mb-6"
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/600x400?text=No+Disponible")
        }
      />

      {/* DESCRIPTION */}
      <p className="text-gray-700 text-lg mb-6">{service.description}</p>

      {/* PRICE */}
      <div className="text-2xl font-semibold mb-6">S/. {service.price}</div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4">
        <button
          onClick={handleBook}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Reservar servicio
        </button>

        {/* Si es dueño del servicio → puede editar */}
        {user && user.id === service.providerId && (
          <Link
            to={`/provider/services/${service.id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded"
          >
            ✏ Editar servicio
          </Link>
        )}
      </div>
    </div>
  );
}
