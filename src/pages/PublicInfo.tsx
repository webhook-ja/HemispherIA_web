"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Newspaper,
  Megaphone,
  Calendar,
  Mail,
  FileText,
  Download,
  ChevronRight,
  Check
} from "lucide-react";

const PublicInfoPage = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar suscripción real
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const newsItems = [
    {
      title: "Lanzamiento de Hemispher-IA: Nueva era para la IA ética en América Latina",
      date: "2024-11-24",
      category: "Institucional",
      excerpt: "Presentamos oficialmente nuestra iniciativa comprometida con el desarrollo sostenible...",
      image: "/images/hemispher-ia-desarrollo-web-04.png"
    },
    {
      title: "Primer Taller Regional sobre IA y Cambio Climático",
      date: "2024-11-20",
      category: "Proyectos",
      excerpt: "Expertos de 12 países se reunieron para explorar aplicaciones de IA en resiliencia climática...",
      image: "/images/hemispher-ia-desarrollo-web-01.jpeg"
    },
    {
      title: "Alianza estratégica con organismos internacionales",
      date: "2024-11-18",
      category: "Alianzas",
      excerpt: "Hemispher-IA firma acuerdos de colaboración con UNICEF y organismos regionales para proyectos de impacto social...",
      image: "/images/Socios Estratégicos.jpeg"
    },
    {
      title: "Nuevas oficinas en Ciudad del Saber, Panamá",
      date: "2024-11-15",
      category: "Institucional",
      excerpt: "Inauguramos nuestro nuevo espacio de innovación y co-creación en el corazón de la Ciudad del Saber...",
      image: "/images/oficinas1.jpeg"
    }
  ];

  const pressReleases = [
    {
      title: "Hemispher-IA anuncia alianza estratégica con organismos internacionales",
      date: "2024-11-22",
      file: "comunicado-alianza-2024.pdf"
    }
  ];

  const events = [
    {
      title: "Foro Regional: IA para el Desarrollo Sostenible",
      date: "2025-01-15",
      location: "Ciudad de Panamá",
      type: "Presencial + Virtual",
      status: "Inscripciones abiertas",
      image: "/images/oficinas2.jpeg"
    },
    {
      title: "Taller: Introducción al Knowledge Brokering",
      date: "2024-12-10",
      location: "Virtual",
      type: "Online",
      status: "Próximamente",
      image: "/images/Intermediación del Conocimiento.jpeg"
    },
    {
      title: "Webinar: Marketing de Influencia para Impacto Social",
      date: "2024-12-18",
      location: "Virtual",
      type: "Online",
      status: "Inscripciones abiertas",
      image: "/images/Marketing de Influencia y Comunicación de Impacto.jpeg"
    },
    {
      title: "Presentación de Proyectos Piloto 2024",
      date: "2024-12-20",
      location: "Ciudad del Saber, Panamá",
      type: "Presencial",
      status: "Próximamente",
      image: "/images/Proyectos Piloto.jpeg"
    }
  ];

  const statements = [
    {
      title: "Ética en la IA: Posición de Hemispher-IA sobre privacidad de datos",
      date: "2024-11-15",
      tags: ["Ética", "Privacidad", "Derechos Digitales"]
    },
    {
      title: "Sostenibilidad Digital: Hacia una IA responsable con el medio ambiente",
      date: "2024-11-10",
      tags: ["Sostenibilidad", "Medio Ambiente"]
    }
  ];

  const resources = [
    {
      title: "Guía: Implementación de IA Ética en Proyectos Sociales",
      type: "PDF",
      size: "2.5 MB",
      license: "CC BY 4.0",
      image: "/images/estrategia y consultoria de ia.jpeg"
    },
    {
      title: "Informe: Estado de la IA en América Latina 2024",
      type: "PDF",
      size: "5.1 MB",
      license: "CC BY-SA 4.0",
      image: "/images/hemispher-ia-desarrollo-web-20.jpeg"
    },
    {
      title: "Manual: Knowledge Brokering para Organizaciones Sociales",
      type: "PDF",
      size: "3.2 MB",
      license: "CC BY 4.0",
      image: "/images/Intermediación del Conocimiento.jpeg"
    },
    {
      title: "Toolkit: Marketing de Influencia con Propósito",
      type: "PDF",
      size: "4.8 MB",
      license: "CC BY-SA 4.0",
      image: "/images/Marketing de Influencia y Comunicación de Impacto.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              📰 Información Pública
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              En Hemispher-IA creemos en la transparencia, el diálogo abierto y la difusión del conocimiento. Aquí encontrarás las últimas noticias, comunicados oficiales, actualizaciones de proyectos, eventos destacados y recursos públicos que dan cuenta de nuestro trabajo por un futuro sostenible en América Latina y el Caribe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-12">
              <TabsTrigger value="news">
                <Newspaper className="h-4 w-4 mr-2" />
                Noticias
              </TabsTrigger>
              <TabsTrigger value="press">
                <Megaphone className="h-4 w-4 mr-2" />
                Comunicados
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="h-4 w-4 mr-2" />
                Eventos
              </TabsTrigger>
              <TabsTrigger value="newsletter">
                <Mail className="h-4 w-4 mr-2" />
                Boletines
              </TabsTrigger>
              <TabsTrigger value="statements">
                <FileText className="h-4 w-4 mr-2" />
                Declaraciones
              </TabsTrigger>
              <TabsTrigger value="resources">
                <Download className="h-4 w-4 mr-2" />
                Recursos
              </TabsTrigger>
            </TabsList>

            {/* Noticias */}
            <TabsContent value="news" className="mt-0">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Noticias</h2>
                <p className="text-gray-600 mb-8">
                  Compartimos avances, aprendizajes y reflexiones desde el corazón de nuestros proyectos. Descubre cómo la inteligencia artificial, la comunicación estratégica y la intermediación del conocimiento están generando impacto en la región.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow h-full overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="text-xs font-semibold text-white bg-blue-600 px-3 py-1 rounded-full shadow-lg">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{item.excerpt}</p>
                        <Button variant="ghost" className="text-blue-600">
                          Leer más <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Comunicados de Prensa */}
            <TabsContent value="press">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Comunicados de Prensa</h2>
                <p className="text-gray-600 mb-8">
                  Información oficial para medios de comunicación y aliados. Aquí publicamos anuncios institucionales, lanzamientos de iniciativas y declaraciones públicas de Hemispher-IA.
                </p>
              </div>

              <div className="space-y-4">
                {pressReleases.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Descargar PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Eventos */}
            <TabsContent value="events">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Eventos</h2>
                <p className="text-gray-600 mb-8">
                  Participa, conéctate y aprende. Te invitamos a nuestros foros, talleres, conferencias y laboratorios de innovación. Todos nuestros eventos están abiertos a la colaboración y el intercambio de ideas para impulsar soluciones con impacto regional.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {events.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-semibold text-white bg-green-600 px-3 py-1 rounded-full shadow-lg">
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">📅</span>
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">📍</span>
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">🎯</span>
                          {event.type}
                        </div>
                      </div>
                      <Button className="w-full">
                        Más información
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Boletines */}
            <TabsContent value="newsletter">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Boletines</h2>
                <p className="text-gray-600 mb-8">
                  Mantente al día con lo que hacemos. Nuestro boletín mensual reúne novedades, recursos destacados, oportunidades y voces del ecosistema Hemispher-IA. ¡Suscríbete y sé parte de la conversación!
                </p>

                <Card className="p-8">
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="text-center text-lg"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={subscribed}
                    >
                      {subscribed ? (
                        <>
                          <Check className="mr-2 h-5 w-5" />
                          ¡Suscrito!
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-5 w-5" />
                          Suscribirse al Boletín
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 mt-4">
                    Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
                  </p>
                </Card>

                {/* Boletines anteriores */}
                <div className="mt-12 text-left">
                  <h3 className="text-xl font-bold mb-4">Boletines Anteriores</h3>
                  <div className="space-y-3">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Boletín #1 - Noviembre 2024</h4>
                          <p className="text-sm text-gray-500">Lanzamiento oficial de Hemispher-IA</p>
                        </div>
                        <Download className="h-5 w-5 text-gray-400" />
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Declaraciones Públicas */}
            <TabsContent value="statements">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Declaraciones Públicas</h2>
                <p className="text-gray-600 mb-8">
                  Hemispher-IA emite posiciones públicas sobre temas clave relacionados con la ética en la inteligencia artificial, la sostenibilidad digital, los derechos digitales y el desarrollo regional. Aquí encontrarás nuestros pronunciamientos institucionales.
                </p>
              </div>

              <div className="space-y-4">
                {statements.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <Button variant="ghost" className="mt-4 text-blue-600">
                        Leer declaración completa <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recursos Abiertos */}
            <TabsContent value="resources">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Recursos Abiertos</h2>
                <p className="text-gray-600 mb-8">
                  Compartimos informes, guías, herramientas y materiales generados en nuestros procesos de investigación y co-creación. Todos están disponibles bajo licencias abiertas para fomentar el conocimiento colaborativo en la región.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <Download className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2">{resource.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>{resource.type}</span>
                        <span>•</span>
                        <span>{resource.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {resource.license}
                        </span>
                        <Button variant="default" size="sm">
                          Descargar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default PublicInfoPage;
