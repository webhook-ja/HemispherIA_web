"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedJoinSection = () => {
  return (
    <ContextualSection
      id="join"
      title="ÚNETE / COLABORA"
      subtitle="Convocatoria abierta, tono invitacional y constructivo."
      context="join"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatedCard context="join">
          <div className="p-6">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Voluntariado y Fellows</h3>
            <p className="text-gray-700 mb-4">
              Programas de jóvenes líderes e investigadores en IA para impacto social.
            </p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Más información
            </Button>
          </div>
        </AnimatedCard>

        <AnimatedCard context="join">
          <div className="p-6">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Consultorías y Alianzas</h3>
            <p className="text-gray-700 mb-4">
              Convocatorias o propuestas para entidades interesadas en colaborar.
            </p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Explorar oportunidades
            </Button>
          </div>
        </AnimatedCard>

        <AnimatedCard context="join">
          <div className="p-6">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Bolsa de Innovación</h3>
            <p className="text-gray-700 mb-4">
              Espacio para presentar ideas o prototipos en colaboración con HemispherIA.
            </p>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
              Enviar propuesta
            </Button>
          </div>
        </AnimatedCard>
      </div>
    </ContextualSection>
  );
};

export default AnimatedJoinSection;