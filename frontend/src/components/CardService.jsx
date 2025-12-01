// --- src/components/CardService.jsx ---
import React from "react";
import { Link } from "react-router-dom";

export default function CardService(props) {
  const { id, title, subtitle, price } = props;

  // Aceptar todas las variaciones pero PRIORIDAD a "img"
  const rawImage = props.img || props.image || props.picture || null;

  /**
   * Construcción robusta del URL:
   * - Si ya viene con http → usar tal cual
   * - Si viene con "/" → asumir ruta del backend
   * - Si solo es "foto.jpg" → ruta /uploads/
   */
  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : rawImage.startsWith("/")
      ? `http://localhost:3001${rawImage}`
      : `http://localhost:3001/uploads/${rawImage}`
    : "https://via.placeholder.com/300x200?text=Sin+Imagen";

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white">
      {/* Imagen */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/300x200?text=No+Disponible")
        }
      />

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>

        {subtitle && (
          <p className="text-sm text-gray-500 mb-2">{subtitle}</p>
        )}

        <p className="text-blue-600 font-bold text-lg mb-3">
          S/ {price}
        </p>

        {/* Botón Ver Detalle */}
        <Link
          to={`/services/${id}`}
          className="inline-block bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
}