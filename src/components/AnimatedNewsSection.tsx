"use client";

import React from "react";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedNewsSection = () => {
  const newsItems = [
    {
      title: "Nuevo acuerdo con universidades latinoamericanas",
      excerpt: "HemispherIA firma colaboración con 15 universidades para impulsar investigación en IA ética.",
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
    <ContextualSection
      id="news"
      title="NOTICIAS Y BLOG"
      subtitle="Contenido fresco, tono periodístico y visual moderno."
      context="news"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <AnimatedCard key={index} context="news">
            <div className="p-6">
              <h3 className="text-lg font-bold text-red-600 mb-3">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.excerpt}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </ContextualSection>
  );
};

export default AnimatedNewsSection;