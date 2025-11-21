"use client";

import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/components/admin/Dashboard";
import ContentManager from "@/components/admin/ContentManager";
import MediaManager from "@/components/admin/MediaManager";
import PageBuilder from "@/components/admin/PageBuilder";

const Admin = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Routes>
      {/* Page Builder - Full screen without layout */}
      <Route path="builder" element={<PageBuilder />} />
      <Route path="builder/:slug" element={<PageBuilder />} />

      {/* Admin routes with layout */}
      <Route
        path="*"
        element={
          <AdminLayout>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="content" element={<ContentManager />} />
              <Route path="media" element={<MediaManager />} />
              <Route path="comments" element={<div className="p-6"><h1 className="text-3xl font-bold mb-4">Comentarios</h1><p className="text-gray-600">Sistema de comentarios proximamente...</p></div>} />
              <Route path="settings" element={<div className="p-6"><h1 className="text-3xl font-bold mb-4">Configuracion</h1><p className="text-gray-600">Configuracion del sitio proximamente...</p></div>} />
            </Routes>
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default Admin;
