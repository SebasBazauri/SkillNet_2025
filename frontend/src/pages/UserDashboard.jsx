import React, { useEffect, useState } from "react";

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalBookings: 12,
        favorites: 3
      });

      setRecentBookings([
        {
          id: 1,
          service: "Clases de Inglés",
          provider: "Academia London",
          date: "2025-01-12",
          time: "4:00 PM",
        },
        {
          id: 2,
          service: "Entrenamiento Personal",
          provider: "FitLife",
          date: "2025-01-10",
          time: "8:00 AM",
        },
      ]);

      setRecommended([
        { id: 1, name: "Masajes Terapéuticos", provider: "Relax Pro" },
        { id: 2, name: "Clases de Fotografía", provider: "FotoArt" },
      ]);

      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20 text-blue-600">
        Cargando tu panel...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Panel del Cliente
      </h1>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500">Reservas Totales</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.totalBookings}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500">Servicios Favoritos</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.favorites}
          </p>
        </div>
      </div>

      {/* ÚLTIMAS RESERVAS */}
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        Últimas reservas
      </h2>

      <div className="bg-white rounded-xl shadow border border-gray-200 p-5 mb-8">
        {recentBookings.map((b) => (
          <div key={b.id} className="border-b py-3 last:border-none">
            <p className="font-semibold text-gray-900">{b.service}</p>
            <p className="text-gray-700">Proveedor: {b.provider}</p>
            <p className="text-gray-500 text-sm">
              {b.date} — {b.time}
            </p>
          </div>
        ))}
      </div>

      {/* RECOMENDADOS */}
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        Te puede interesar
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {recommended.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow border border-gray-200 p-5"
          >
            <p className="text-lg font-semibold text-gray-900">{r.name}</p>
            <p className="text-gray-600 text-sm">{r.provider}</p>

            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Ver servicio
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
