"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionAnimationsProps {
  type: 'vision' | 'filosofia' | 'equipo' | 'proyectos';
}

interface Shape {
  id: number;
  x: string;
  y: string;
  delay: number;
}

const SectionAnimations: React.FC<SectionAnimationsProps> = ({ type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    if (!isHovered) {
      setShapes([]);
      return;
    }

    // Generar posiciones aleatorias dentro de la sección
    const numShapes = type === 'equipo' ? 3 : type === 'proyectos' ? 4 : 2;
    const newShapes: Shape[] = [];

    for (let i = 0; i < numShapes; i++) {
      newShapes.push({
        id: i,
        x: `${20 + Math.random() * 60}%`,
        y: `${20 + Math.random() * 60}%`,
        delay: i * 0.2,
      });
    }

    setShapes(newShapes);
  }, [isHovered, type]);

  const renderShape = (shape: Shape) => {
    switch (type) {
      case 'vision':
        // Rectángulos sutiles
        return (
          <motion.div
            key={shape.id}
            className="absolute pointer-events-none"
            style={{
              left: shape.x,
              top: shape.y,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 1, 0],
              opacity: [0, 0.3, 0.3, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut"
            }}
          >
            <div className="w-6 h-6 bg-blue-500/20 backdrop-blur-sm" />
          </motion.div>
        );

      case 'filosofia':
        // Triángulos sutiles
        return (
          <motion.div
            key={shape.id}
            className="absolute pointer-events-none"
            style={{
              left: shape.x,
              top: shape.y,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.2, 1, 0],
              opacity: [0, 0.25, 0.25, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut"
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '12px solid transparent',
                borderRight: '12px solid transparent',
                borderBottom: '20px solid rgba(34, 197, 94, 0.2)',
              }}
            />
          </motion.div>
        );

      case 'equipo':
        // Círculos concéntricos sutiles
        return (
          <motion.div
            key={shape.id}
            className="absolute pointer-events-none"
            style={{
              left: shape.x,
              top: shape.y,
            }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{
              scale: [0.3, 1.5, 1.5, 0.3],
              opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut"
            }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-purple-500/25" />
          </motion.div>
        );

      case 'proyectos':
        // Hexágonos sutiles
        return (
          <motion.div
            key={shape.id}
            className="absolute pointer-events-none"
            style={{
              left: shape.x,
              top: shape.y,
            }}
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 1, 0],
              opacity: [0, 0.3, 0.3, 0],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: shape.delay,
              ease: "linear"
            }}
          >
            <div
              className="w-5 h-5 bg-orange-500/20"
              style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              }}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ pointerEvents: 'none' }}
    >
      <AnimatePresence>
        {shapes.map((shape) => renderShape(shape))}
      </AnimatePresence>
    </div>
  );
};

export default SectionAnimations;
