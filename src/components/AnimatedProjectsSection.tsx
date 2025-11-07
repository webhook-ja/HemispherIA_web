"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedProjectsSection = () => {
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
    <ContextualSection
      id="projects"
      title="PROYECTOS Y CASOS"
      subtitle="Mostrar resultados tangibles. Visual: mapas, fotografías, gráficos de impacto."
      context="projects"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {projects.map((project, index) => (
          <AnimatedCard key={index} context="projects" className="flex flex-col">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-bold text-purple-600 mb-3">{project.title}</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <div className="mt-auto">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                  {project.location}
                </span>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      <div className="text-center">
        <Button 
          size="lg" 
          variant="outline"
          className="border-purple-500 text-purple-600 hover:bg-purple-50"
        >
          Ver todos los proyectos
        </Button>
      </div>
    </ContextualSection>
  );
};

export default AnimatedProjectsSection;