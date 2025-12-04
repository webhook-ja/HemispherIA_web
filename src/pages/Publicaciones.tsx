"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Download,
  Calendar,
  Tag,
  Search,
  Filter,
  ExternalLink,
  BookOpen,
  TrendingUp
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const PublicacionesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Todas",
    "Inteligencia Artificial",
    "Comunicación",
    "Desarrollo Sostenible",
    "Políticas Públicas",
    "Innovación Social"
  ];

  const publications = [
    {
      id: 1,
      title: "IA Ética en América Latina: Guía Práctica para Políticas Públicas",
      description: "Documento marco sobre implementación responsable de IA en gobiernos latinoamericanos, con casos de estudio de Colombia, Brasil y Panamá.",
      category: "Inteligencia Artificial",
      date: "2024-11-15",
      type: "Informe",
      pages: 85,
      downloads: 1240,
      tags: ["IA Ética", "Políticas Públicas", "LAC"],
      featured: true
    },
    {
      id: 2,
      title: "Knowledge Brokering en Redes de Innovación: Lecciones de la Región",
      description: "Análisis de 15 redes de intermediación de conocimiento en América Latina y el Caribe, metodologías y resultados medibles.",
      category: "Innovación Social",
      date: "2024-10-28",
      type: "Estudio",
      pages: 62,
      downloads: 856,
      tags: ["Knowledge Brokering", "Redes", "Innovación"],
      featured: true
    },
    {
      id: 3,
      title: "Marketing de Influencia para Salud Pública: Estrategias Basadas en Evidencia",
      description: "Guía metodológica para diseñar campañas de salud con influencers digitales en comunidades latinoamericanas.",
      category: "Comunicación",
      date: "2024-09-20",
      type: "Guía Metodológica",
      pages: 48,
      downloads: 1580,
      tags: ["Influencers", "Salud Pública", "Comunicación"],
      featured: false
    },
    {
      id: 4,
      title: "Mapeo de Actores en la Crisis Migratoria del Darién",
      description: "Investigación sobre actores, flujos de información y oportunidades de coordinación en políticas migratorias regionales.",
      category: "Políticas Públicas",
      date: "2024-08-12",
      type: "Investigación",
      pages: 120,
      downloads: 672,
      tags: ["Migración", "Darién", "Políticas"],
      featured: false
    },
    {
      id: 5,
      title: "Gobernanza de Datos para IA Social: Toolkit para ONGs",
      description: "Herramientas prácticas para organizaciones sociales que implementan proyectos de IA con enfoque en privacidad y ética.",
      category: "Inteligencia Artificial",
      date: "2024-07-05",
      type: "Toolkit",
      pages: 35,
      downloads: 2100,
      tags: ["Gobernanza", "Datos", "ONGs"],
      featured: false
    },
    {
      id: 6,
      title: "Comunicación Climática en Jóvenes Latinoamericanos: Estudio Multipaís",
      description: "Análisis de narrativas, plataformas y engagement en movimientos juveniles por el clima en 8 países de la región.",
      category: "Desarrollo Sostenible",
      date: "2024-06-18",
      type: "Estudio",
      pages: 95,
      downloads: 1340,
      tags: ["Clima", "Juventud", "Comunicación"],
      featured: false
    }
  ];

  const filteredPublications = publications.filter(pub => {
    const matchesCategory = selectedCategory === "Todas" || pub.category === selectedCategory;
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: "Publicaciones", value: publications.length, icon: FileText },
    { label: "Descargas Totales", value: "7.8K+", icon: Download },
    { label: "Países Alcanzados", value: "25+", icon: TrendingUp },
    { label: "Acceso Abierto", value: "100%", icon: BookOpen }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Publicaciones y Recursos
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Investigaciones, guías y herramientas de libre acceso para impulsar la innovación responsable en América Latina y el Caribe.
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
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-200" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar publicaciones, temas, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="h-5 w-5 text-gray-500 flex-shrink-0" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-blue-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      {selectedCategory === "Todas" && searchTerm === "" && (
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Publicaciones Destacadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publications.filter(pub => pub.featured).map((pub, index) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-l-4 border-l-blue-600 hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                          {pub.type}
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(pub.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-gray-900">
                        {pub.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{pub.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {pub.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{pub.pages} páginas</span>
                          <span className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {pub.downloads}
                          </span>
                        </div>
                        <Button className="bg-blue-900 hover:bg-blue-800">
                          <Download className="h-4 w-4 mr-2" />
                          Descargar PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Publications */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === "Todas" ? "Todas las Publicaciones" : selectedCategory}
            <span className="text-gray-500 text-lg ml-3">
              ({filteredPublications.length} {filteredPublications.length === 1 ? 'resultado' : 'resultados'})
            </span>
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium mr-2">
                              {pub.type}
                            </span>
                            <span className="text-gray-500 text-sm">{pub.category}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(pub.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">{pub.title}</h3>
                        <p className="text-gray-600 mb-3">{pub.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {pub.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1"
                            >
                              <Tag className="h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <span className="text-sm text-gray-600">{pub.pages} páginas</span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            {pub.downloads} descargas
                          </span>
                          <div className="ml-auto flex gap-2">
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Vista previa
                            </Button>
                            <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                              <Download className="h-4 w-4 mr-2" />
                              Descargar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron publicaciones
              </h3>
              <p className="text-gray-500">
                Intenta con otros términos de búsqueda o categorías
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Recibe nuestras nuevas publicaciones
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Suscríbete al boletín y mantente al día con investigaciones, recursos y herramientas de Hemispher-IA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8">
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

export default PublicacionesPage;
