"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquare,
  Settings,
  Menu,
  X,
  PenTool,
  Palette
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Page Builder",
      href: "/admin/builder",
      icon: PenTool,
      highlight: true,
    },
    {
      title: "Contenido",
      href: "/admin/content",
      icon: FileText,
    },
    {
      title: "Multimedia",
      href: "/admin/media",
      icon: Image,
    },
    {
      title: "Comentarios",
      href: "/admin/comments",
      icon: MessageSquare,
    },
    {
      title: "Configuracion",
      href: "/admin/settings",
      icon: Settings,
    },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block md:w-64 bg-white border-r`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">Admin HemispherIA</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => navigate(item.href)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate("/")}>
                Ver sitio
              </Button>
              <Button variant="outline">
                Cerrar sesión
              </Button>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;