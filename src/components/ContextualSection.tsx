"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ContextualSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  context: "about" | "services" | "projects" | "hub" | "news" | "join" | "contact";
  className?: string;
}

const ContextualSection = ({ 
  id, 
  title, 
  subtitle, 
  children, 
  context,
  className = ""
}: ContextualSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Contextual colors and icons
  const getContextStyles = () => {
    switch (context) {
      case "about": 
        return { 
          bgColor: "bg-blue-50", 
          textColor: "text-blue-600",
          borderColor: "border-blue-500"
        };
      case "services": 
        return { 
          bgColor: "bg-green-50", 
          textColor: "text-green-600",
          borderColor: "border-green-500"
        };
      case "projects": 
        return { 
          bgColor: "bg-purple-50", 
          textColor: "text-purple-600",
          borderColor: "border-purple-500"
        };
      case "hub": 
        return { 
          bgColor: "bg-yellow-50", 
          textColor: "text-yellow-600",
          borderColor: "border-yellow-500"
        };
      case "news": 
        return { 
          bgColor: "bg-red-50", 
          textColor: "text-red-600",
          borderColor: "border-red-500"
        };
      case "join": 
        return { 
          bgColor: "bg-indigo-50", 
          textColor: "text-indigo-600",
          borderColor: "border-indigo-500"
        };
      case "contact": 
        return { 
          bgColor: "bg-pink-50", 
          textColor: "text-pink-600",
          borderColor: "border-pink-500"
        };
      default: 
        return { 
          bgColor: "bg-blue-50", 
          textColor: "text-blue-600",
          borderColor: "border-blue-500"
        };
    }
  };

  const { bgColor, textColor, borderColor } = getContextStyles();

  return (
    <section 
      id={id} 
      className={`py-16 ${bgColor} ${className} relative overflow-hidden`}
      ref={ref}
    >
      {/* Contextual background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute top-0 left-0 w-full h-1 ${borderColor}`}></div>
        <div className={`absolute bottom-0 left-0 w-full h-1 ${borderColor}`}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className={`text-3xl font-bold ${textColor}`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title}
          </motion.h2>
          
          {subtitle && (
            <motion.p 
              className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default ContextualSection;