"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewsSection = () => {
  const newsItems = [
    {
      title: "Nuevo acuerdo con universidades latinoamericanas",
      excerpt: "Hemispher-IA firma colaboración con 15 universidades para impulsar investigación en IA ética.",
      date: "15 de mayo, 2023"
    },
    {
      title: "Lanzamiento de la iniciativa 'Jóvenes por el Clima'",
      excerpt: "Nuestra campaña de influencers digitales alcanza 2 millones de personas en 6 países.",
      date: "3 de abril, 2023"
    },
    {
      title: "Premio Innovación Social 2023",
      excerpt: "Reconocimiento internacional por nuestro trabajo en políticas migratorias con IA.",
      date: "20 de marzo, 2023"
    }
  ];

  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">NOTICIAS Y BLOG</h2>
          <p className="mt-4 text-lg text-gray-600">
            Contenido fresco, tono periodístico y visual moderno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;