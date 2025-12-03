"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InteractiveHero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="pt-16 bg-gradient-to-b from-white to-gray-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Conectamos conocimiento, talento y tecnología para un futuro sostenible en América Latina y el Caribe
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Hemispher-IA impulsa soluciones innovadoras basadas en inteligencia artificial, comunicación estratégica e intermediación del conocimiento. Creamos puentes entre la tecnología y el impacto social.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3"
                onClick={() => navigate("/projects")}
              >
                Explora nuestros proyectos
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
                onClick={() => navigate("/about")}
              >
                Conoce más
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <img
                src="/images/hemispher-ia-desarrollo-web-05.png"
                alt="Jóvenes, tecnología y comunidades"
                className="rounded-xl w-full h-auto object-cover shadow-lg"
              />

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shadow-md"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <span className="text-blue-800 font-bold text-sm">AI</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHero;