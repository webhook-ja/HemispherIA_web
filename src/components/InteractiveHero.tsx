"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const InteractiveHero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    // In a real implementation, this would play an actual sound
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  return (
    <section id="home" className="pt-16 bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-200 opacity-20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Conectamos conocimiento, talento y tecnología para un futuro sostenible en América Latina y el Caribe
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              HemispherIA impulsa soluciones innovadoras basadas en inteligencia artificial, comunicación estratégica y gestión del conocimiento. Creamos puentes entre la tecnología y el impacto social.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 relative group"
                onClick={playSound}
              >
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-white opacity-30"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.2 }}
                    exit={{ scale: 0.8 }}
                  />
                )}
                Explora nuestros proyectos
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="relative group"
                onClick={playSound}
              >
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-blue-100 opacity-50"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.2 }}
                    exit={{ scale: 0.8 }}
                  />
                )}
                Únete a la red
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost"
                className="relative group"
                onClick={playSound}
              >
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-gray-100 opacity-50"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.2 }}
                    exit={{ scale: 0.8 }}
                  />
                )}
                Conoce más
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl w-full h-96 flex items-center justify-center shadow-2xl">
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Play className="h-16 w-16 mx-auto text-white mb-4" />
                  <span className="text-white font-medium">Imagen dinámica de jóvenes, tecnología y comunidades</span>
                </motion.div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <span className="text-white font-bold">AI</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <span className="text-white font-bold">💡</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHero;