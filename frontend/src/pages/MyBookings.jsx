import React, { useState, useEffect } from "react";

export default function MyBookingsFakeUI() {
  const [loading, setLoading] = useState(true);
  const [fakeReservations, setFakeReservations] = useState([]);

  useEffect(() => {
    // Simula carga por 1 segundo
    setTimeout(() => {
      setFakeReservations([
        {
          id: 1,
          serviceName: "Corte de Cabello Premium",
          providerName: "Barbería Elegante",
          date: "2025-01-14",
          time: "3:00 PM",
          status: "Confirmado",
          notes: "Llega 5 minutos antes."
        },
        {
          id: 2,
          serviceName: "Clases de Guitarra",
          providerName: "MusikAcademy",
          date: "2025-01-20",
          time: "10:00 AM",
          status: "Pendiente",
          notes: "-"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20 text-blue-600 text-lg font-semibold">
        Cargando tus reservas...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">
        Mis Reservas
      </h2>

      <div className="space-y-5">
        {fakeReservations.map((r) => (
          <div
            key={r.id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
          >
            <div className="text-xl font-semibold text-gray-900 mb-2">
              {r.serviceName}
            </div>

            <div className="text-gray-700">
              <span className="font-medium">Proveedor:</span> {r.providerName}
            </div>

            <div className="text-gray-700">
              <span className="font-medium">Fecha:</span> {r.date}
            </div>

            <div className="text-gray-700">
              <span className="font-medium">Hora:</span> {r.time}
            </div>

            <div
              className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                r.status === "Confirmado"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {r.status}
            </div>

            <div className="mt-3 text-gray-700">
              <span className="font-medium">Notas:</span> {r.notes}
            </div>

            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Ver Detalles
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
