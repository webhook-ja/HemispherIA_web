"use client";

import React from "react";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedAboutSection = () => {
  return (
    <ContextualSection
      id="about"
      title="QUIÉNES SOMOS"
      subtitle="Tono inspirador, transparente y humano. Enfatizar el carácter latinoamericano y global."
      context="about"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatedCard context="about">
          <div className="p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Visión y Misión</h3>
            <p className="font-semibold text-blue-800 mb-2">
              Visión: Ser el principal nodo de conocimiento y colaboración en IA ética, comunicación y desarrollo sostenible de la región.
            </p>
            <p className="text-gray-700">
              Misión: Facilitar la adopción inteligente de tecnologías emergentes y la movilización de talento para resolver desafíos sociales, ambientales y económicos.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard context="about">
          <div className="p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Filosofía HemispherIA</h3>
            <p className="font-semibold text-blue-800 mb-2">
              En el corazón de HemispherIA está el Knowledge Brokering: el arte de conectar conocimiento disperso, comunidades diversas y oportunidades tecnológicas para generar impacto.
            </p>
            <p className="text-gray-700">
              Creemos en la inteligencia colectiva, la transparencia de datos y la inclusión como pilares de la transformación digital.
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard context="about">
          <div className="p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Equipo</h3>
            <p className="font-semibold text-blue-800 mb-2">
              Liderado por expertos en comunicación, IA, desarrollo y alianzas internacionales, nuestro equipo integra perspectivas locales y globales.
            </p>
            <p className="text-gray-700">
              (Aquí se insertan perfiles breves con foto y especialidad — por ejemplo, "Dirección General", "Estrategia y Conocimiento", "Investigación y Alianzas", etc.)
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard context="about">
          <div className="p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Socios Estratégicos</h3>
            <p className="font-semibold text-blue-800 mb-2">
              Colaboramos con universidades, startups, organismos internacionales y redes de innovación que comparten nuestra visión de una región más equitativa y tecnológicamente preparada.
            </p>
            <p className="text-gray-700">
              (Logos, enlaces y descripciones breves de aliados principales.)
            </p>
          </div>
        </AnimatedCard>
      </div>
    </ContextualSection>
  );
};

export default AnimatedAboutSection;