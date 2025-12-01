// src/pages/BookingConfirmation.jsx
import React from "react";
import img from "@/assets/placeholder.png";
import { Link } from "react-router-dom";

export default function BookingConfirmation() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
        <div className="flex items-center gap-4">
          <img
            src={img}
            alt="Confirmación"
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <h2 className="text-2xl font-bold">Reserva confirmada</h2>
            <p className="text-gray-600">
              Gracias por reservar. Te enviamos un correo con los detalles.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Detalles de la reserva</h3>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>Servicio: Ejemplo</li>
              <li>Fecha: 2025-11-22</li>
              <li>Hora: 10:00</li>
              <li>Proveedor: Nombre Proveedor</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Siguiente paso</h3>
            <p className="text-sm text-gray-600 mt-2">
              Contacta al proveedor si necesitas cambiar la hora o cancelar.
            </p>
            <Link
              to="/"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
