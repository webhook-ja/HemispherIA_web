"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesSection = () => {
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
      title: "Intermediación del Conocimiento",
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
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">QUÉ HACEMOS</h2>
          <p className="mt-4 text-lg text-gray-600">
            Mostrar el valor práctico: qué ofrecemos, cómo trabajamos, resultados concretos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;