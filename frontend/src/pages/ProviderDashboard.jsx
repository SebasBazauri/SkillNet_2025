import React, { useEffect, useState } from "react";

export default function ProviderDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        earnings: 1240,
        totalServices: 5,
        totalBookings: 32,
        rating: 4.8
      });

      setRecentBookings([
        {
          id: 1,
          service: "Corte de Cabello",
          client: "Juan Pérez",
          date: "2025-01-15",
          time: "2:00 PM",
        },
        {
          id: 2,
          service: "Clases de Guitarra",
          client: "Daniela Ruiz",
          date: "2025-01-14",
          time: "11:00 AM",
        }
      ]);

      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20 text-blue-600">
        Cargando panel del proveedor...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Panel del Proveedor
      </h1>

      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500">Ganancias del mes</p>
          <p className="text-2xl font-bold text-gray-900">
            S/ {stats.earnings}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500">Servicios Publicados</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.totalServices}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500">Reservas Recibidas</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.totalBookings}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
          <p className="text-gray-500">Rating Promedio</p>
          <p className="text-2xl font-bold text-gray-900">
            ⭐ {stats.rating}
          </p>
        </div>
      </div>

      {/* BOTÓN CREAR SERVICIO */}
      <div className="mb-6">
        <button className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
          Crear nuevo servicio
        </button>
      </div>

      {/* ÚLTIMAS RESERVAS */}
      <h2 className="text-xl font-semibold text-gray-900 mb-3">
        Últimas reservas
      </h2>

      <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
        {recentBookings.length === 0 ? (
          <p className="text-gray-600">No hay reservas recientes.</p>
        ) : (
          recentBookings.map((b) => (
            <div key={b.id} className="border-b py-3 last:border-none">
              <p className="font-semibold text-gray-900">{b.service}</p>
              <p className="text-gray-700">Cliente: {b.client}</p>
              <p className="text-gray-500 text-sm">
                {b.date} — {b.time}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
