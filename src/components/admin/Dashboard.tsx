"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { Mail, FileText, Eye, Users, TrendingUp, HardDrive, Globe, Smartphone, Monitor, Tablet, Clock, Activity } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

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
  totalPages: number;
  publishedPages: number;
  totalAssets: number;
  totalStorageBytes: number;
  recentVisits: number;
  visitsToday: number;
  visitsByDevice: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  topPages: Array<{ page_path: string; count: string }>;
  visitsByDay: Array<{ date: string; visits: string }>;
}

interface Activity {
  id: number;
  username: string;
  action: string;
  details: object;
  created_at: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, contactsRes, activityRes] = await Promise.all([
          fetch('/api/stats', { headers }),
          fetch('/api/contacts?limit=5', { headers }),
          fetch('/api/activity?limit=10', { headers })
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (contactsRes.ok) {
          const contactsData = await contactsRes.json();
          setContacts(contactsData.contacts || []);
        }

        if (activityRes.ok) {
          const activityData = await activityRes.json();
          setActivities(activityData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/contacts/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
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

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatAction = (action: string) => {
    const actions: Record<string, string> = {
      login: 'Inicio de sesion',
      logout: 'Cerro sesion',
      create_page: 'Creo pagina',
      update_page: 'Actualizo pagina',
      delete_page: 'Elimino pagina',
      publish_page: 'Publico pagina',
      unpublish_page: 'Despublico pagina',
      upload_files: 'Subio archivos',
      delete_asset: 'Elimino archivo',
      create_content: 'Creo contenido',
      update_content: 'Actualizo contenido',
      delete_contact: 'Elimino contacto',
    };
    return actions[action] || action;
  };

  // Device chart data
  const deviceData = stats ? [
    { name: 'Desktop', value: stats.visitsByDevice.desktop, icon: Monitor },
    { name: 'Mobile', value: stats.visitsByDevice.mobile, icon: Smartphone },
    { name: 'Tablet', value: stats.visitsByDevice.tablet, icon: Tablet },
  ] : [];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  // Format visits by day for chart
  const trafficData = stats?.visitsByDay?.map(item => ({
    name: new Date(item.date).toLocaleDateString('es-ES', { weekday: 'short' }),
    visits: parseInt(item.visits)
  })) || [];

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Panel de Administracion</h1>
        <p className="text-gray-600">Bienvenido de vuelta. Aqui tienes un resumen de tu sitio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitas Hoy</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.visitsToday || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.recentVisits || 0} ultimos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensajes</CardTitle>
            <Mail className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalContacts || 0}</div>
            {(stats?.unreadContacts || 0) > 0 && (
              <p className="text-xs text-orange-600 font-medium">{stats?.unreadContacts} sin leer</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paginas</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPages || 0}</div>
            <p className="text-xs text-muted-foreground">{stats?.publishedPages || 0} publicadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Almacenamiento</CardTitle>
            <HardDrive className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(stats?.totalStorageBytes || 0)}</div>
            <p className="text-xs text-muted-foreground">{stats?.totalAssets || 0} archivos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Trafico Semanal
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {trafficData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Area type="monotone" dataKey="visits" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisits)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No hay datos de trafico aun</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Por Dispositivo
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {deviceData.some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
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
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>No hay datos aun</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Mensajes Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay mensajes aun</p>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm truncate">{contact.name}</h4>
                        {!contact.read && (
                          <Badge variant="destructive" className="text-xs">Nuevo</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{contact.email}</p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{contact.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-400">{formatDate(contact.created_at)}</p>
                        {!contact.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => markAsRead(contact.id)}
                          >
                            Marcar leido
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

        {/* Activity Log */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay actividad reciente</p>
            ) : (
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p>
                        <span className="font-medium">{activity.username || 'Sistema'}</span>
                        {' '}{formatAction(activity.action)}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(activity.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      {stats?.topPages && stats.topPages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Paginas Mas Visitadas (ultimos 7 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topPages.map((page, index) => (
                <div key={page.page_path} className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-400 w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium">{page.page_path}</p>
                  </div>
                  <Badge variant="secondary">{page.count} visitas</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
