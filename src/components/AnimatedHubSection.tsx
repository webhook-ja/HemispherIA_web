"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedHubSection = () => {
  return (
    <ContextualSection
      id="hub"
      title="HEMISPHERIA HUB"
      subtitle="Espacio dinámico de intercambio de conocimiento. Visualmente tipo 'portal académico/colaborativo'."
      context="hub"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatedCard context="hub">
          <div className="p-6">
            <h3 className="text-xl font-bold text-yellow-600 mb-4">Publicaciones y Estudios</h3>
            <p className="text-gray-700 mb-4">
              Documentos, policy briefs, papers y recursos descargables.
            </p>
            <Button variant="outline" className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50">
              Explorar publicaciones
            </Button>
          </div>
        </AnimatedCard>

        <AnimatedCard context="hub">
          <div className="p-6">
            <h3 className="text-xl font-bold text-yellow-600 mb-4">Eventos y Webinars</h3>
            <p className="text-gray-700 mb-4">
              Agenda de actividades, charlas y formaciones en IA ética, comunicación y sostenibilidad.
            </p>
            <Button variant="outline" className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50">
              Ver agenda
            </Button>
          </div>
        </AnimatedCard>

        <AnimatedCard context="hub">
          <div className="p-6">
            <h3 className="text-xl font-bold text-yellow-600 mb-4">Red HemispherIA</h3>
            <p className="text-gray-700 mb-4">
              Mapa interactivo de aliados y miembros. Formularios de inscripción, perfiles y enlaces a iniciativas locales.
            </p>
            <Button variant="outline" className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-50">
              Unirse a la red
            </Button>
          </div>
        </AnimatedCard>
      </div>
    </ContextualSection>
  );
};

export default AnimatedHubSection;