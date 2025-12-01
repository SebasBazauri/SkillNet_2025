// src/routes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import { useAuth } from "./context/AuthContext";

// Páginas públicas
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ServiceListings from "./pages/ServiceListings";
import ServiceDetail from "./pages/ServiceDetail";

// Páginas del proveedor
import ProviderServices from "./pages/ProviderServices";
import CreateService from "./pages/CreateService";
import EditService from "./pages/EditService";
import ProviderServiceDetail from "./pages/ProviderServiceDetail";

// Reservas
import BookingPage from "./pages/BookingPage";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";

// Dashboards
import ProviderDashboard from "./pages/ProviderDashboard";
import UserDashboard from "./pages/UserDashboard";
import DashboardRedirect from "./pages/DashboardRedirect";

// Perfil
import MyAccount from "./pages/MyAccount";

// Protecciones
import RequireAuth from "./components/RequireAuth";
import RequireProvider from "./components/RequireProvider";
import RequireClient from "./components/RequireClient";
import BecomeProvider from "./pages/BecomeProvider";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* ========================
          RUTAS PÚBLICAS
      ========================= */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Servicios públicos */}
      <Route path="/services" element={<ServiceListings />} />
      <Route path="/services/:id" element={<ServiceDetail />} />

      {/* ================
          RESERVAS
      ================= */}
      <Route
        path="/services/:id/book"
        element={
          <RequireAuth>
            <BookingPage currentUser={user} />
          </RequireAuth>
        }
      />

      <Route
        path="/booking-confirmation"
        element={
          <RequireAuth>
            <BookingConfirmation />
          </RequireAuth>
        }
      />

      {/* Mis reservas */}
      <Route
        path="/provider/mybookings"
        element={
          <RequireAuth>
            <MyBookings currentUser={user} />
          </RequireAuth>
        }
      />
      <Route
        path="/client/mybookings"
        element={
          <RequireAuth>
            <MyBookings currentUser={user} />
          </RequireAuth>
        }
      />

      {/* ========================
          DASHBOARDS
      ========================= */}

      {/* Acceso universal */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardRedirect user={user} />
          </RequireAuth>
        }
      />

      {/* Tablero proveedor */}
      <Route
        path="/dashboard/provider"
        element={
          <RequireProvider>
            <ProviderDashboard />
          </RequireProvider>
        }
      />

      {/* Tablero cliente */}
      <Route
        path="/dashboard/client"
        element={
          <RequireClient>
            <UserDashboard />
          </RequireClient>
        }
      />
      <Route path="/become-provider" element={<BecomeProvider />} />

      {/* ========================
          RUTAS DEL PROVEEDOR
      ========================= */}
      <Route
        path="/provider/services"
        element={
          <RequireProvider>
            <ProviderServices />
          </RequireProvider>
        }
      />

      <Route
        path="/provider/services/create"
        element={
          <RequireProvider>
            <CreateService />
          </RequireProvider>
        }
      />

      <Route
        path="/provider/services/:id"
        element={
          <RequireProvider>
            <ProviderServiceDetail />
          </RequireProvider>
        }
      />

      <Route
        path="/provider/services/edit/:id"
        element={
          <RequireProvider>
            <EditService />
          </RequireProvider>
        }
      />

      {/* ========================
          PERFIL
      ========================= */}
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <MyAccount />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
