"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Mail, FileText, Eye, Users } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  organization: string;
  message: string;
  created_at: string;
  read: boolean;
}

interface Stats {
  totalContacts: number;
  unreadContacts: number;
  totalContent: number;
  publishedContent: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, contactsRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/contacts')
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (contactsRes.ok) {
          const contactsData = await contactsRes.json();
          setContacts(contactsData.slice(0, 5)); // Last 5 contacts
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/contacts/${id}/read`, { method: 'PATCH' });
      setContacts(contacts.map(c => c.id === id ? { ...c, read: true } : c));
      if (stats) {
        setStats({ ...stats, unreadContacts: stats.unreadContacts - 1 });
      }
    } catch (error) {
      console.error('Error marking contact as read:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'Hace unos minutos';
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays < 7) return `Hace ${diffDays} dias`;
    return date.toLocaleDateString('es-ES');
  };

  // Chart data
  const trafficData = [
    { name: 'Lun', visits: 4000 },
    { name: 'Mar', visits: 3000 },
    { name: 'Mie', visits: 2000 },
    { name: 'Jue', visits: 2780 },
    { name: 'Vie', visits: 1890 },
    { name: 'Sab', visits: 2390 },
    { name: 'Dom', visits: 3490 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 400 },
    { name: 'Mobile', value: 300 },
    { name: 'Tablet', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Panel de Administracion</h1>
        <p className="text-gray-600">Estadisticas y metricas del sitio web</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensajes Totales</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalContacts || 0}</div>
            <p className="text-xs text-muted-foreground">Formularios de contacto</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sin Leer</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats?.unreadContacts || 0}</div>
            <p className="text-xs text-muted-foreground">Mensajes pendientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contenido Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalContent || 0}</div>
            <p className="text-xs text-muted-foreground">Paginas y articulos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicado</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.publishedContent || 0}</div>
            <p className="text-xs text-muted-foreground">Contenido visible</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Trafico por Dia</CardTitle>
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
            <CardTitle>Trafico por Dispositivo</CardTitle>
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
            <CardTitle>Ultimos Mensajes de Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay mensajes aun</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{contact.name}</h4>
                        {!contact.read && (
                          <Badge variant="destructive" className="text-xs">Nuevo</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                      {contact.organization && (
                        <p className="text-sm text-gray-500">{contact.organization}</p>
                      )}
                      <p className="text-gray-600 mt-1 line-clamp-2">{contact.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-400">{formatDate(contact.created_at)}</p>
                        {!contact.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(contact.id)}
                          >
                            Marcar como leido
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
