"use client";

import React from "react";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedAboutSection = () => {
  return (
    <ContextualSection
      id="about"
      title="QUIÉNES SOMOS"
      subtitle="Líderes en innovación responsable con enfoque latinoamericano"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatedCard>
          <div className="p-8" data-section="vision">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Visión y Misión</h3>
            <p className="font-semibold text-gray-800 mb-3">
              Visión: Ser el principal nodo de conocimiento y colaboración en IA ética, comunicación y desarrollo sostenible de la región.
            </p>
            <p className="text-gray-600">
              Misión: Facilitar la adopción inteligente de tecnologías emergentes y la movilización de talento para resolver desafíos sociales, ambientales y económicos.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="p-8" data-section="filosofia">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Nuestra Filosofía</h3>
            <p className="font-semibold text-gray-800 mb-3">
              En el corazón de Hemispher-IA está el Knowledge Brokering: el arte de conectar conocimiento disperso, comunidades diversas y oportunidades tecnológicas para generar impacto.
            </p>
            <p className="text-gray-600">
              Creemos en la inteligencia colectiva, la transparencia de datos y la inclusión como pilares de la transformación digital.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="p-8" data-section="equipo">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Nuestro Equipo</h3>
            <p className="font-semibold text-gray-800 mb-3">
              Liderado por expertos en comunicación, IA, desarrollo y alianzas internacionales, nuestro equipo integra perspectivas locales y globales.
            </p>
            <p className="text-gray-600">
              Profesionales con experiencia en múltiples sectores y regiones, comprometidos con soluciones innovadoras y sostenibles.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard>
          <div className="p-8">
            <h3 className="text-xl font-bold text-blue-800 mb-4">Socios Estratégicos</h3>
            <p className="font-semibold text-gray-800 mb-3">
              Colaboramos con universidades, startups, organismos internacionales y redes de innovación que comparten nuestra visión de una región más equitativa y tecnológicamente preparada.
            </p>
            <p className="text-gray-600">
              Alianzas sólidas que amplían nuestro alcance y potencian el impacto de nuestras soluciones.
            </p>
          </div>
        </AnimatedCard>
      </div>
    </ContextualSection>
  );
};

export default AnimatedAboutSection;