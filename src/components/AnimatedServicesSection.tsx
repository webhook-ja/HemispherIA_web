"use client";

import React from "react";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedServicesSection = () => {
  const services = [
    {
      title: "Estrategia y Consultoría en IA Social",
      description: "Diseñamos estrategias que usan inteligencia artificial de manera ética y responsable para mejorar políticas públicas, programas sociales y comunicación con comunidades.",
      items: [
        "Diagnóstico y diseño de proyectos IA",
        "Integración de IA en campañas sociales",
        "Evaluación de impacto y gobernanza de datos"
      ]
    },
    {
      title: "Gestión del Conocimiento",
      description: "Facilitamos la creación, transferencia y aplicación de conocimiento entre sectores, usando enfoques de knowledge brokering y plataformas colaborativas.",
      items: [
        "Mapas de actores",
        "Curaduría de información",
        "Redes de aprendizaje e innovación"
      ]
    },
    {
      title: "Marketing de Influencia y Comunicación de Impacto",
      description: "Combinamos la analítica de datos y el poder de las comunidades digitales para promover comportamientos sostenibles, salud, equidad e inclusión.",
      items: [
        "Campañas de salud pública",
        "Clima, derechos humanos y migración"
      ]
    },
    {
      title: "Proyectos Piloto",
      description: "Ejecutamos pilotos regionales en colaboración con gobiernos, ONGs y el sector privado.",
      items: [
        "IA para monitoreo de salud materna en comunidades rurales",
        "Redes de influencers por la acción climática juvenil",
        "Mapeo de conocimiento en políticas migratorias del Darién"
      ]
    }
  ];

  return (
    <ContextualSection
      id="services"
      title="QUÉ HACEMOS"
      subtitle="Soluciones innovadoras con impacto medible"
      className="bg-gray-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <AnimatedCard key={index}>
            <div className="p-8">
              <h3 className="text-xl font-bold text-blue-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </ContextualSection>
  );
};

export default AnimatedServicesSection;