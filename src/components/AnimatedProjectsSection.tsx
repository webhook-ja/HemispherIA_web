"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedProjectsSection = () => {
  const projects = [
    {
      title: "IA para monitoreo de salud materna",
      description: "Proyecto piloto en comunidades rurales de Colombia para mejorar el acceso a servicios de salud materna mediante IA predictiva.",
      location: "Colombia",
      impact: "35% mejora en indicadores de salud"
    },
    {
      title: "Redes de influencers por la acción climática juvenil",
      description: "Colaboración con jóvenes activistas digitales en Brasil y Argentina para promover acciones climáticas sostenibles.",
      location: "Brasil, Argentina",
      impact: "2M de personas alcanzadas"
    },
    {
      title: "Mapeo de conocimiento en políticas migratorias del Darién",
      description: "Análisis de información y actores clave en la región del Darién para mejorar políticas migratorias.",
      location: "Panamá, Colombia",
      impact: "15 informes de política generados"
    },
    {
      title: "Plataforma de educación financiera para comunidades indígenas",
      description: "Desarrollo de una plataforma accesible para educación financiera adaptada a contextos indígenas.",
      location: "Perú, Ecuador",
      impact: "5,000 usuarios activos"
    }
  ];

  return (
    <ContextualSection
      id="projects"
      title="PROYECTOS Y CASOS"
      subtitle="Resultados tangibles en toda la región"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {projects.map((project, index) => (
          <AnimatedCard key={index} className="flex flex-col">
            <div className="p-8 flex-grow" data-section="proyectos">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-blue-800">{project.title}</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {project.location}
                </span>
              </div>
              <p className="text-gray-600 mb-6">{project.description}</p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-2 rounded inline-block">
                  {project.impact}
                </p>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      <div className="text-center">
        <Link to="/projects">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-800 text-blue-800 hover:bg-blue-50 px-8 py-3"
          >
            Ver todos los proyectos
          </Button>
        </Link>
      </div>
    </ContextualSection>
  );
};

export default AnimatedProjectsSection;