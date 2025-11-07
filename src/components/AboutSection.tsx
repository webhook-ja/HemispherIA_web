"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">QUIÉNES SOMOS</h2>
          <p className="mt-4 text-lg text-gray-600">
            Tono inspirador, transparente y humano. Enfatizar el carácter latinoamericano y global.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Visión y Misión</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-blue-600 mb-2">
                Visión: Ser el principal nodo de conocimiento y colaboración en IA ética, comunicación y desarrollo sostenible de la región.
              </p>
              <p>
                Misión: Facilitar la adopción inteligente de tecnologías emergentes y la movilización de talento para resolver desafíos sociales, ambientales y económicos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filosofía HemispherIA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-blue-600 mb-2">
                En el corazón de HemispherIA está el Knowledge Brokering: el arte de conectar conocimiento disperso, comunidades diversas y oportunidades tecnológicas para generar impacto.
              </p>
              <p>
                Creemos en la inteligencia colectiva, la transparencia de datos y la inclusión como pilares de la transformación digital.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-blue-600 mb-2">
                Liderado por expertos en comunicación, IA, desarrollo y alianzas internacionales, nuestro equipo integra perspectivas locales y globales.
              </p>
              <p>
                (Aquí se insertan perfiles breves con foto y especialidad — por ejemplo, "Dirección General", "Estrategia y Conocimiento", "Investigación y Alianzas", etc.)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Socios Estratégicos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-blue-600 mb-2">
                Colaboramos con universidades, startups, organismos internacionales y redes de innovación que comparten nuestra visión de una región más equitativa y tecnológicamente preparada.
              </p>
              <p>
                (Logos, enlaces y descripciones breves de aliados principales.)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;