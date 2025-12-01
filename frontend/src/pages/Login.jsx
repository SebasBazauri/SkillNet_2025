// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔹 usar AuthContext
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login(form.email, form.password);

      // 🔹 Redirigir según rol
      if (user.role === "PROVIDER") navigate("/");
      else navigate("/");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
          className="w-full p-3 border rounded mb-6"
          placeholder="Tu contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}