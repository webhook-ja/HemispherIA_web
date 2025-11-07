"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
  const projects = [
    {
      title: "IA para monitoreo de salud materna",
      description: "Proyecto piloto en comunidades rurales de Colombia para mejorar el acceso a servicios de salud materna mediante IA predictiva.",
      location: "Colombia"
    },
    {
      title: "Redes de influencers por la acción climática juvenil",
      description: "Colaboración con jóvenes activistas digitales en Brasil y Argentina para promover acciones climáticas sostenibles.",
      location: "Brasil, Argentina"
    },
    {
      title: "Mapeo de conocimiento en políticas migratorias del Darién",
      description: "Análisis de información y actores clave en la región del Darién para mejorar políticas migratorias.",
      location: "Panamá, Colombia"
    }
  ];

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">PROYECTOS Y CASOS</h2>
          <p className="mt-4 text-lg text-gray-600">
            Mostrar resultados tangibles. Visual: mapas, fotografías, gráficos de impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="mt-auto">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {project.location}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            Ver todos los proyectos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;