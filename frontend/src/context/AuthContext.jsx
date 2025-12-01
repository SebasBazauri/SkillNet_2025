// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // ✅ Estado inicial desde localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // ✅ Login
  const login = async (email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Credenciales incorrectas");
    }

    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
  };

  // ✅ Signup
  const signup = async (name, email, password, role) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "No se pudo crear la cuenta");
    }

    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user, // ✅ útil para header y rutas privadas
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook para usar AuthContext
export const useAuth = () => useContext(AuthContext);
