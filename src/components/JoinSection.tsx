"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const JoinSection = () => {
  return (
    <section id="join" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">ÚNETE / COLABORA</h2>
          <p className="mt-4 text-lg text-gray-600">
            Convocatoria abierta, tono invitacional y constructivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Voluntariado y Fellows</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Programas de jóvenes líderes e investigadores en IA para impacto social.
              </p>
              <Button className="w-full">Más información</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Consultorías y Alianzas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Convocatorias o propuestas para entidades interesadas en colaborar.
              </p>
              <Button className="w-full">Explorar oportunidades</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bolsa de Innovación</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Espacio para presentar ideas o prototipos en colaboración con HemispherIA.
              </p>
              <Button className="w-full">Enviar propuesta</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;