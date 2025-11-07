"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HubSection = () => {
  return (
    <section id="hub" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">HEMISPHERIA HUB</h2>
          <p className="mt-4 text-lg text-gray-600">
            Espacio dinámico de intercambio de conocimiento. Visualmente tipo "portal académico/colaborativo".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Publicaciones y Estudios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Documentos, policy briefs, papers y recursos descargables.
              </p>
              <Button variant="outline" className="w-full">
                Explorar publicaciones
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eventos y Webinars</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Agenda de actividades, charlas y formaciones en IA ética, comunicación y sostenibilidad.
              </p>
              <Button variant="outline" className="w-full">
                Ver agenda
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Red HemispherIA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Mapa interactivo de aliados y miembros. Formularios de inscripción, perfiles y enlaces a iniciativas locales.
              </p>
              <Button variant="outline" className="w-full">
                Unirse a la red
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HubSection;