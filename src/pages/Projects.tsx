"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Filter,
  Search,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 0,
      title: "IA para monitoreo de salud materna",
      description:
        "Proyecto piloto en comunidades rurales de Colombia para mejorar el acceso a servicios de salud materna mediante IA predictiva.",
      location: "Colombia",
      status: "Activo",
      impact: "35% mejora en indicadores de salud",
      startDate: "Ene 2023",
      endDate: "Dic 2023",
      partners: [
        "MinSalud Colombia",
        "UNICEF",
        "Fundación Tecnología para Todos",
      ],
      image: "health",
      tags: ["Salud", "IA", "Rural"],
    },
    {
      id: 1,
      title: "Redes de influencers por la acción climática juvenil",
      description:
        "Colaboración con jóvenes activistas digitales en Brasil y Argentina para promover acciones climáticas sostenibles.",
      location: "Brasil, Argentina",
      status: "En progreso",
      impact: "2M de personas alcanzadas",
      startDate: "Mar 2023",
      endDate: "Sep 2023",
      partners: [
        "Greenpeace",
        "Juventud por el Clima",
        "ONG Ambiental Brasil",
      ],
      image: "climate",
      tags: ["Clima", "Juventud", "Influencers"],
    },
    {
      id: 2,
      title: "Mapeo de conocimiento en políticas migratorias del Darién",
      description:
        "Análisis de información y actores clave en la región del Darién para mejorar políticas migratorias.",
      location: "Panamá, Colombia",
      status: "Completado",
      impact: "15 informes de política generados",
      startDate: "Jun 2022",
      endDate: "Dic 2022",
      partners: ["ACNUR", "Gobierno de Panamá", "Organización Migrante"],
      image: "migration",
      tags: ["Migración", "Política", "Darién"],
    },
    {
      id: 3,
      title: "Plataforma de educación financiera para comunidades indígenas",
      description:
        "Desarrollo de una plataforma accesible para educación financiera adaptada a contextos indígenas.",
      location: "Perú, Ecuador",
      status: "Activo",
      impact: "5,000 usuarios activos",
      startDate: "Feb 2023",
      endDate: "Nov 2023",
      partners: [
        "Banco Central",
        "Comunidades Ashuar",
        "ONG Desarrollo Sostenible",
      ],
      image: "finance",
      tags: ["Finanzas", "Indígenas", "Educación"],
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || project.tags.includes(filter);
    return matchesSearch && matchesFilter;
  });

  const statusColors: Record<string, string> = {
    Activo: "bg-green-100 text-green-800",
    "En progreso": "bg-yellow-100 text-yellow-800",
    Completado: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Proyectos y Casos de Impacto
            </motion.h1>
            <motion.p
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Resultados tangibles en toda la región a través de innovación
              responsable
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                Descargar Informe Anual
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar proyectos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Todos los proyectos</option>
                <option value="Salud">Salud</option>
                <option value="Clima">Clima</option>
                <option value="Migración">Migración</option>
                <option value="Finanzas">Finanzas</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros avanzados
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="h-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <Card
                      className={`h-full cursor-pointer ${selectedProject === project.id
                          ? "ring-2 ring-blue-500"
                          : ""
                        }`}
                    >
                      <img
                        src="/images/ertd.jpeg"
                        alt="IA para monitoreo de salud materna"
                        className="rounded-t-lg w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {project.title}
                          </CardTitle>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}
                          >
                            {project.status}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          {project.description}
                        </p>

                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>{project.location}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                            {project.impact}
                          </span>
                          <Button variant="ghost" size="sm">
                            Ver detalles
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No se encontraron proyectos que coincidan con los criterios
                    de búsqueda.
                  </p>
                </div>
              )}
            </div>

            {/* Project Detail */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Detalles del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                  {projects[selectedProject] && (
                    <div>
                      <img
                        src="/images/ertd.jpeg"
                        alt="IA para monitoreo de salud materna"
                        className="rounded-lg w-full h-48 object-cover mb-6"
                      />

                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {projects[selectedProject].title}
                      </h3>

                      <p className="text-gray-600 mb-6">
                        {projects[selectedProject].description}
                      </p>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                          <span className="text-gray-700">
                            {projects[selectedProject].location}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                          <span className="text-gray-700">
                            {projects[selectedProject].startDate} -{" "}
                            {projects[selectedProject].endDate}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <TrendingUp className="mr-2 h-5 w-5 text-gray-500" />
                          <span className="text-gray-700 font-semibold">
                            {projects[selectedProject].impact}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <Users className="mr-2 h-5 w-5 text-gray-500" />
                          <span className="text-gray-700">
                            {projects[selectedProject].partners.length} aliados
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Aliados Estratégicos
                        </h4>
                        <ul className="space-y-2">
                          {projects[selectedProject].partners.map(
                            (partner, index) => (
                              <li key={index} className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                <span className="text-gray-600">{partner}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {projects[selectedProject].tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Button className="w-full">
                        Descargar Informe Completo
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Visualization */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Impacto Regional
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestros proyectos han generado resultados medibles en toda
              América Latina y el Caribe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                value: "25+",
                label: "Países Alcanzados",
                description: "Presencia en toda la región latinoamericana",
              },
              {
                value: "150K+",
                label: "Personas Impactadas",
                description: "Beneficiarios directos e indirectos",
              },
              {
                value: "42",
                label: "Proyectos Completados",
                description: "Soluciones implementadas con éxito",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl font-bold text-blue-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <p className="text-gray-600">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Distribución Geográfica
            </h3>
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl w-full h-96 flex items-center justify-center">
              <p className="text-gray-500">
                Mapa interactivo de proyectos en Latinoamérica
              </p>
            </div>
          </div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default ProjectsPage;