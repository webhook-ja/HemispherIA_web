"use client";

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/components/admin/Dashboard";
import ContentManager from "@/components/admin/ContentManager";
import MediaManager from "@/components/admin/MediaManager";
import PageBuilder from "@/components/admin/PageBuilder";

const Admin = () => {
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
              <Route path="comments" element={<div>Comentarios</div>} />
              <Route path="settings" element={<div>Configuracion</div>} />
            </Routes>
          </AdminLayout>
        }
      />
    </Routes>
  );
};

export default Admin;
