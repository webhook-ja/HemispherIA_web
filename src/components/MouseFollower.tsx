"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const mouseLeaveHandler = () => {
      setIsVisible(false);
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

  return (
    <>
      {isVisible && (
        <motion.div
          className="fixed w-3 h-3 rounded-full bg-blue-500 pointer-events-none z-50 opacity-30"
          animate={{
            x: mousePosition.x - 6,
            y: mousePosition.y - 6,
          }}
          transition={{ type: "spring", stiffness: 1000, damping: 50 }}
        />
      )}
    </>
  );
};

export default MouseFollower;