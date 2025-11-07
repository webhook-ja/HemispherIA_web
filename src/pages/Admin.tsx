"use client";

import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/components/admin/Dashboard";
import ContentManager from "@/components/admin/ContentManager";
import MediaManager from "@/components/admin/MediaManager";

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="content" element={<ContentManager />} />
        <Route path="media" element={<MediaManager />} />
        <Route path="comments" element={<div>Comentarios</div>} />
        <Route path="settings" element={<div>Configuración</div>} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;