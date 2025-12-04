"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Video,
  ExternalLink,
  Filter,
  ChevronRight,
  Globe,
  Bookmark,
  Share2
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const EventosPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("Próximos");

  const filters = ["Próximos", "Pasados", "Webinars", "Talleres", "Conferencias"];

  const events = [
    {
      id: 1,
      title: "Cumbre Latinoamericana de IA Ética 2025",
      description: "Encuentro regional sobre gobernanza, políticas y aplicaciones responsables de inteligencia artificial.",
      date: "2025-03-15",
      endDate: "2025-03-17",
      time: "09:00 - 18:00",
      location: "Ciudad de Panamá, Panamá",
      type: "Conferencia",
      format: "Presencial + Virtual",
      attendees: 450,
      status: "upcoming",
      image: "/images/hemispher-ia-desarrollo-web-01.jpeg",
      featured: true,
      speakers: ["Wolfgang Friedl", "Expertos regionales IA"],
      price: "Gratuito (Registro requerido)"
    },
    {
      id: 2,
      title: "Webinar: Knowledge Brokering para ONGs",
      description: "Sesión práctica sobre metodologías de intermediación de conocimiento en organizaciones del tercer sector.",
      date: "2025-01-28",
      time: "15:00 - 16:30 (GMT-5)",
      location: "Online",
      type: "Webinar",
      format: "Virtual",
      attendees: 120,
      status: "upcoming",
      featured: false,
      speakers: ["Erika Martínez", "Jorge Acuña"],
      price: "Gratuito"
    },
    {
      id: 3,
      title: "Taller: Marketing de Influencia para Impacto Social",
      description: "Capacitación intensiva sobre diseño de campañas con influencers para causas sociales y ambientales.",
      date: "2025-02-10",
      endDate: "2025-02-11",
      time: "10:00 - 17:00",
      location: "Madrid, España",
      type: "Taller",
      format: "Presencial",
      attendees: 35,
      status: "upcoming",
      featured: true,
      speakers: ["Jorge Acuña", "Equipo Hemispher-IA"],
      price: "$150 USD"
    },
    {
      id: 4,
      title: "Foro Regional: Migración y Tecnología en Centroamérica",
      description: "Diálogo multi-actor sobre uso de tecnología para gestión humanitaria de flujos migratorios.",
      date: "2024-11-20",
      time: "14:00 - 18:00",
      location: "Ciudad de Panamá, Panamá",
      type: "Conferencia",
      format: "Híbrido",
      attendees: 200,
      status: "past",
      featured: false,
      speakers: ["Wolfgang Friedl", "Socios internacionales"],
      price: "Gratuito"
    },
    {
      id: 5,
      title: "Webinar: Datos Abiertos para Políticas Públicas",
      description: "Casos de uso de datos abiertos en diseño de políticas públicas en América Latina.",
      date: "2024-10-15",
      time: "16:00 - 17:30 (GMT-5)",
      location: "Online",
      type: "Webinar",
      format: "Virtual",
      attendees: 280,
      status: "past",
      featured: false,
      speakers: ["Equipo técnico"],
      price: "Gratuito"
    },
    {
      id: 6,
      title: "Taller: Comunicación Climática con Jóvenes",
      description: "Workshop práctico sobre narrativas y estrategias digitales para movilización climática juvenil.",
      date: "2024-09-05",
      endDate: "2024-09-06",
      time: "09:00 - 16:00",
      location: "São Paulo, Brasil",
      type: "Taller",
      format: "Presencial",
      attendees: 50,
      status: "past",
      featured: false,
      speakers: ["Especialistas en clima"],
      price: "Gratuito para activistas"
    }
  ];

  const filteredEvents = events.filter(event => {
    if (selectedFilter === "Próximos") return event.status === "upcoming";
    if (selectedFilter === "Pasados") return event.status === "past";
    if (selectedFilter === "Webinars") return event.type === "Webinar";
    if (selectedFilter === "Talleres") return event.type === "Taller";
    if (selectedFilter === "Conferencias") return event.type === "Conferencia";
    return true;
  });

  const upcomingEvents = events.filter(e => e.status === "upcoming");
  const stats = [
    { label: "Eventos este año", value: "12+", icon: Calendar },
    { label: "Participantes", value: "2.5K+", icon: Users },
    { label: "Países", value: "15+", icon: Globe },
    { label: "Webinars gratuitos", value: "100%", icon: Video }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Eventos y Actividades
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Únete a nuestros encuentros, talleres y webinars sobre IA ética, comunicación estratégica e innovación social en América Latina.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-purple-200" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-purple-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-500 flex-shrink-0" />
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={`whitespace-nowrap ${
                  selectedFilter === filter
                    ? "bg-purple-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      {selectedFilter === "Próximos" && (
        <section className="py-12 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Eventos Destacados
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.filter(e => e.featured).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full overflow-hidden border-l-4 border-l-purple-600 hover:shadow-2xl transition-shadow">
                    <div className="relative h-48 bg-gradient-to-br from-purple-500 to-indigo-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar className="h-20 w-20 text-white/30" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-white text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{event.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-700">
                          <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                          {new Date(event.date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                          {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long'
                          })}`}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <Clock className="h-4 w-4 mr-2 text-purple-600" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                          {event.location} • {event.format}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <Users className="h-4 w-4 mr-2 text-purple-600" />
                          {event.attendees} participantes esperados
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm font-semibold text-purple-900">
                          {event.price}
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button className="bg-purple-900 hover:bg-purple-800">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Registrarse
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Events */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedFilter === "Próximos" ? "Próximos Eventos" :
             selectedFilter === "Pasados" ? "Eventos Pasados" : selectedFilter}
            <span className="text-gray-500 text-lg ml-3">
              ({filteredEvents.length})
            </span>
          </h2>

          <div className="space-y-4">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Date Badge */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex flex-col items-center justify-center text-white">
                          <div className="text-2xl font-bold">
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-xs uppercase">
                            {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
                              {event.type}
                            </span>
                            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                              {event.format}
                            </span>
                            {event.status === "upcoming" && (
                              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                                Próximamente
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-3">{event.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center text-sm text-gray-700">
                            <Clock className="h-4 w-4 mr-2 text-purple-600" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <MapPin className="h-4 w-4 mr-2 text-purple-600" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <Users className="h-4 w-4 mr-2 text-purple-600" />
                            {event.attendees} participantes
                          </div>
                          <div className="flex items-center text-sm font-semibold text-purple-900">
                            {event.price}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {event.status === "upcoming" ? (
                            <>
                              <Button size="sm" className="bg-purple-900 hover:bg-purple-800">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Registrarse ahora
                              </Button>
                              <Button variant="outline" size="sm">
                                <Bookmark className="h-4 w-4 mr-2" />
                                Guardar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4 mr-2" />
                                Compartir
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="outline" size="sm">
                                <Video className="h-4 w-4 mr-2" />
                                Ver grabación
                              </Button>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Materiales
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No hay eventos en esta categoría
              </h3>
              <p className="text-gray-500">
                Prueba con otro filtro o revisa próximamente
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Calendar className="h-16 w-16 mx-auto mb-4 text-purple-200" />
            <h2 className="text-3xl font-bold mb-4">
              No te pierdas nuestros eventos
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Recibe notificaciones sobre próximos talleres, webinars y conferencias de Hemispher-IA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button className="bg-white text-purple-900 hover:bg-purple-50 px-8">
                Suscribirse
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default EventosPage;
