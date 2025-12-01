import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProviderServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [service, setService] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      const res = await fetch(`http://localhost:3001/services/${id}`);
      const data = await res.json();
      setService(data);
    };
    loadService();
  }, [id]);

  if (!service) return <p className="text-center mt-10">Cargando...</p>;

  // Seguridad
  if (!user || user.id !== service.providerId) {
    return <p className="text-center mt-10 text-red-600">No tienes acceso</p>;
  }

  const handleDelete = async () => {
    await fetch(`http://localhost:3001/services/${id}`, {
      method: "DELETE",
    });

    navigate("/provider/services");
  };

  // === Construcción del URL de la imagen igual que en ServiceDetail ===
  const imgUrl = service.img
    ? service.img.startsWith("http")
      ? service.img
      : service.img.startsWith("/")
      ? `http://localhost:3001${service.img}`
      : `http://localhost:3001/uploads/${service.img}`
    : "https://via.placeholder.com/600x400?text=Sin+Imagen";

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* BACK */}
      <Link
        to="/provider/services"
        className="text-blue-600 underline mb-4 inline-block"
      >
        ← Volver
      </Link>

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
      <p className="text-gray-600 text-lg mb-6">{service.subtitle}</p>

      {/* IMAGE (misma medida que ServiceDetail.jsx) */}
      <img
        src={imgUrl}
        alt={service.title}
        className="w-full h-72 object-cover rounded-lg shadow-md mb-6"
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/600x400?text=No+Disponible")
        }
      />

      {/* DESCRIPTION (copiado del ServiceDetail.jsx) */}
      <p className="text-gray-700 text-lg mb-6">{service.description}</p>

      {/* PRICE (idéntico) */}
      <div className="text-2xl font-semibold mb-6">S/. {service.price}</div>

      {/* ACTION BUTTONS (estilo respetando layout actual) */}
      <div className="flex gap-4">
        <Link
          to={`/provider/services/edit/${service.id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow"
        >
          ✏ Editar servicio
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow"
        >
          🗑 Eliminar
        </button>
      </div>
    </div>
  );
}
