import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CLIENT",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(form.name, form.email, form.password, form.role);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <label className="block mb-2 font-medium">Nombre completo</label>
        <input
          type="text"
          name="name"
          className="w-full p-3 border rounded mb-4"
          placeholder="Tu nombre"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium">Correo electrónico</label>
        <input
          type="email"
          name="email"
          className="w-full p-3 border rounded mb-4"
          placeholder="Tu email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium">Contraseña</label>
        <input
          type="password"
          name="password"
          className="w-full p-3 border rounded mb-4"
          placeholder="Tu contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label className="block mb-2 font-medium">Tipo de cuenta</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-6"
        >
          <option value="CLIENT">Cliente</option>
          <option value="PROVIDER">Proveedor</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
