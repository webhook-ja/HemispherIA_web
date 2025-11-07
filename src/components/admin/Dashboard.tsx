"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  
  // Datos de ejemplo para estadísticas
  const trafficData = [
    { name: 'Lun', visits: 4000 },
    { name: 'Mar', visits: 3000 },
    { name: 'Mié', visits: 2000 },
    { name: 'Jue', visits: 2780 },
    { name: 'Vie', visits: 1890 },
    { name: 'Sáb', visits: 2390 },
    { name: 'Dom', visits: 3490 },
  ];
  
  const deviceData = [
    { name: 'Desktop', value: 400 },
    { name: 'Mobile', value: 300 },
    { name: 'Tablet', value: 100 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-gray-600">Estadísticas y métricas del sitio web</p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Estadísticas de Tráfico</h2>
          <p className="text-gray-600">Vistas y visitantes en el último período</p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={timeRange === "7d" ? "default" : "outline"}
            onClick={() => setTimeRange("7d")}
          >
            7 días
          </Button>
          <Button 
            variant={timeRange === "30d" ? "default" : "outline"}
            onClick={() => setTimeRange("30d")}
          >
            30 días
          </Button>
          <Button 
            variant={timeRange === "90d" ? "default" : "outline"}
            onClick={() => setTimeRange("90d")}
          >
            90 días
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitas Totales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,482</div>
            <p className="text-xs text-muted-foreground">+12% respecto al mes anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Páginas Vistas</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42,128</div>
            <p className="text-xs text-muted-foreground">+8% respecto al mes anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Rebote</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.4%</div>
            <p className="text-xs text-muted-foreground">-2.1% respecto al mes anterior</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tráfico por Día</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tráfico por Dispositivo</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Comentarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div>
                  <h4 className="font-semibold">Juan Pérez</h4>
                  <p className="text-gray-600">Excelente contenido, muy útil para nuestra organización.</p>
                  <p className="text-sm text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div>
                  <h4 className="font-semibold">María González</h4>
                  <p className="text-gray-600">¿Tienen planes para expandirse a otros países de la región?</p>
                  <p className="text-sm text-gray-500">Hace 1 día</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;