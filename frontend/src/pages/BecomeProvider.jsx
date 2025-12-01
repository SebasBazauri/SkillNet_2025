import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function BecomeProvider() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    businessName: "",
    serviceType: "",
    experience: "",
    description: "",
    document: null,
  });

  // Si no está logueado, no puede aplicar
  if (!user) {
    alert("Debes iniciar sesión para solicitar ser proveedor.");
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.businessName ||
      !form.serviceType ||
      !form.experience ||
      !form.description
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    // Aquí normalmente mandaríamos datos al backend.
    // Como lo quieres SOLO de frontend, solo mostramos la alerta:
    alert("Tu cuenta está en revisión para poder ser proveedor.");

    navigate("/profile");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-5">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Convertirme en Proveedor
      </h1>

      <p className="text-gray-600 mb-6">
        Completa este formulario para enviar tu solicitud. Nuestro equipo
        revisará tu información antes de activar tus funciones de proveedor.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-6 border border-gray-200"
      >
        {/* Nombre del negocio */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Nombre del negocio *
          </label>
          <input
            type="text"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej: Barbería Estilos Pro"
          />
        </div>

        {/* Tipo de servicio */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Tipo de servicio que ofrecerás *
          </label>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Seleccione…</option>
            <option value="belleza">Belleza y cuidado personal</option>
            <option value="clases">Clases / Educación</option>
            <option value="hogar">Servicios del hogar</option>
            <option value="tecnologia">Tecnología</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* Experiencia */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Años de experiencia *
          </label>
          <input
            type="number"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Ej: 3"
            min="0"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Describe tu servicio *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Explica brevemente qué ofreces…"
          ></textarea>
        </div>

        {/* Documento opcional */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Documento de respaldo (opcional)
          </label>
          <input
            type="file"
            name="document"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow"
        >
          Enviar solicitud
        </button>
      </form>
    </div>
  );
}
