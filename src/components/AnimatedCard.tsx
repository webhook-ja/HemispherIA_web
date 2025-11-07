"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  context?: "about" | "services" | "projects" | "hub" | "news" | "join" | "contact";
}

const AnimatedCard = ({ children, className, context = "about" }: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Contextual colors for different sections
  const getContextColor = () => {
    switch (context) {
      case "about": return "bg-blue-500";
      case "services": return "bg-green-500";
      case "projects": return "bg-purple-500";
      case "hub": return "bg-yellow-500";
      case "news": return "bg-red-500";
      case "join": return "bg-indigo-500";
      case "contact": return "bg-pink-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={className}>
        {children}
      </Card>
      
      {/* Animated border effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={`absolute inset-0 rounded-lg ${getContextColor()} opacity-20`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      
      {/* Corner accent */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={`absolute top-0 right-0 w-8 h-8 ${getContextColor()} rounded-bl-full`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ delay: 0.1 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedCard;