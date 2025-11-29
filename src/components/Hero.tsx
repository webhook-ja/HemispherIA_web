"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="pt-16 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Conectamos conocimiento, talento y tecnología para un futuro sostenible en América Latina y el Caribe
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              HemispherIA impulsa soluciones innovadoras basadas en inteligencia artificial, comunicación estratégica e intermediación del conocimiento. Creamos puentes entre la tecnología y el impacto social.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explora nuestros proyectos
              </Button>
              <Button size="lg" variant="outline">
                Únete a la red
              </Button>
              <Button size="lg" variant="ghost">
                Conoce más
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
              <span className="text-gray-500">Imagen dinámica de jóvenes, tecnología y comunidades</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;