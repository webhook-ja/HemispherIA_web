"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SectionType = 'vision' | 'filosofia' | 'equipo' | 'proyectos' | 'none';

interface Shape {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
}

const InteractiveMouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionType>('none');
  const [shapes, setShapes] = useState<Shape[]>([]);
  const shapeIdRef = useRef(0);

  // Detectar en qué sección está el mouse
  useEffect(() => {
    const checkSection = (e: MouseEvent) => {
      const elements = document.elementsFromPoint(e.clientX, e.clientY);

      // Buscar específicamente elementos con data-section
      for (const el of elements) {
        if (el instanceof HTMLElement) {
          const section = el.getAttribute('data-section');

          if (section === 'vision') {
            setCurrentSection('vision');
            return;
          }
          if (section === 'filosofia') {
            setCurrentSection('filosofia');
            return;
          }
          if (section === 'equipo') {
            setCurrentSection('equipo');
            return;
          }
          if (section === 'proyectos') {
            setCurrentSection('proyectos');
            return;
          }
        }
      }

      setCurrentSection('none');
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      checkSection(e);
    };

    const mouseLeaveHandler = () => {
      setIsVisible(false);
      setCurrentSection('none');
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseleave", mouseLeaveHandler);
    document.addEventListener("mouseenter", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseleave", mouseLeaveHandler);
      document.removeEventListener("mouseenter", mouseMoveHandler);
    };
  }, []);

  // Generar formas geométricas según la sección
  useEffect(() => {
    if (currentSection === 'none') {
      setShapes([]);
      return;
    }

    // Generar formas inmediatamente al entrar en una sección
    const generateShapes = () => {
      const newShapes: Shape[] = [];
      const numShapes = currentSection === 'equipo' ? 3 : currentSection === 'proyectos' ? 4 : 2;

      for (let i = 0; i < numShapes; i++) {
        const angle = (Math.PI * 2 / numShapes) * i;
        const distance = 40 + Math.random() * 30;

        newShapes.push({
          id: shapeIdRef.current++,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
          opacity: 0.6 + Math.random() * 0.4,
        });
      }

      setShapes(newShapes);
    };

    // Generar formas inmediatamente
    generateShapes();

    // Luego generar nuevas formas cada 1.5 segundos
    const interval = setInterval(generateShapes, 1500);

    return () => {
      clearInterval(interval);
      setShapes([]);
    };
  }, [currentSection]);

  // Renderizar diferentes formas según la sección
  const renderShape = (shape: Shape, index: number) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: `${mousePosition.x + shape.x}px`,
      top: `${mousePosition.y + shape.y}px`,
      opacity: shape.opacity,
    };

    switch (currentSection) {
      case 'vision':
        // Rectángulos rotando
        return (
          <motion.div
            key={shape.id}
            style={baseStyle}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: shape.scale,
              rotate: shape.rotation + 360,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 pointer-events-none"
          />
        );

      case 'filosofia':
        // Triángulos
        return (
          <motion.div
            key={shape.id}
            style={baseStyle}
            initial={{ scale: 0, rotate: shape.rotation }}
            animate={{
              scale: [shape.scale, shape.scale * 1.2, shape.scale],
              rotate: shape.rotation + 360,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="pointer-events-none"
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderBottom: '26px solid rgb(34, 197, 94)',
              }}
            />
          </motion.div>
        );

      case 'equipo':
        // Círculos concéntricos
        return (
          <motion.div
            key={shape.id}
            style={baseStyle}
            initial={{ scale: 0.5 }}
            animate={{
              scale: [0.5, shape.scale * 1.5, 0.5],
              opacity: [0.8, 0.3, 0.8],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
            className="w-10 h-10 rounded-full border-4 border-purple-500 pointer-events-none"
          />
        );

      case 'proyectos':
        // Hexágonos/Cuadrados
        return (
          <motion.div
            key={shape.id}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: shape.scale,
              rotate: [0, 90, 180, 270, 360],
              y: [0, -10, 0, 10, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-7 h-7 bg-gradient-to-tr from-orange-500 to-red-500 pointer-events-none"
            style={{
              ...baseStyle,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Esfera principal del cursor */}
      {isVisible && (
        <motion.div
          className="fixed rounded-full pointer-events-none z-50"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: currentSection !== 'none' ? 1.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 1000, damping: 50 }}
          style={{
            width: '24px',
            height: '24px',
            background: currentSection !== 'none'
              ? 'radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(99,102,241,0.4) 100%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(59,130,246,0.2) 100%)',
            boxShadow: currentSection !== 'none'
              ? '0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(99,102,241,0.4)'
              : '0 0 10px rgba(59,130,246,0.4)',
          }}
        />
      )}

      {/* Figuras geométricas interactivas */}
      <AnimatePresence>
        {isVisible && shapes.map((shape, index) => renderShape(shape, index))}
      </AnimatePresence>

      {/* Indicador de sección activa (opcional - para debugging) */}
      {isVisible && currentSection !== 'none' && (
        <motion.div
          className="fixed bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-xs font-mono pointer-events-none z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          Sección: {currentSection}
        </motion.div>
      )}
    </>
  );
};

export default InteractiveMouseFollower;
