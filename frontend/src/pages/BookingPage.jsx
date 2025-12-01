// /pages/BookingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function BookingPage({ currentUser }) {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();

  // 🚨 Validación: si no hay usuario autenticado
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Acceso requerido</h2>
          <p className="text-gray-600 mb-4">
            Debes iniciar sesión para reservar un servicio.
          </p>
        </div>
      </div>
    );
  }

  const [service, setService] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [providerId, setProviderId] = useState(null);

  useEffect(() => {
    // Cargar detalle del servicio
    const fetchService = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/services/${serviceId}`
        );
        if (!res.ok) throw new Error('Error al cargar el servicio');
        const data = await res.json();
        setService(data);

        // Ajustar según la estructura de tu backend
        setProviderId(data.providerId || data.provider?.id || data.userId);
      } catch (err) {
        console.error(err);
        alert('No se pudo cargar el servicio');
      }
    };
    fetchService();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      alert('Selecciona fecha y hora');
      return;
    }

    if (!currentUser?.id) {
      alert('Debes iniciar sesión para crear una reserva');
      return;
    }

    setLoading(true);

    try {
      const body = {
        serviceId,
        userId: currentUser.id,
        providerId,
        date,
        time,
        notes,
      };

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/reservations`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error creando reserva');
      }

      const reservation = await res.json();
      navigate('/booking-confirmation', { state: { reservation } });
    } catch (err) {
      console.error(err);
      alert('No se pudo crear la reserva: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-semibold">Cargando servicio...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reservar: {service.title || service.name}
        </h2>

        <p className="text-gray-600 text-center mb-6">{service.description}</p>

        {/* Fecha */}
        <label className="block mb-2 font-medium">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full p-3 border rounded mb-4"
        />

        {/* Hora */}
        <label className="block mb-2 font-medium">Hora</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full p-3 border rounded mb-4"
        />

        {/* Notas */}
        <label className="block mb-2 font-medium">Notas (opcional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-3 border rounded mb-6"
        />

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Creando reserva...' : 'Confirmar reserva'}
        </button>
      </form>
    </div>
  );
}
