"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedCard = ({ children, className }: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative h-full"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      <Card className={`h-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
        {children}
      </Card>
      
      {/* Subtle hover effect */}
      <motion.div
        className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default AnimatedCard;