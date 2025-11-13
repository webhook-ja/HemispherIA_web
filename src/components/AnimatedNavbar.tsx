"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AnimatedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navItems = [
    { name: "INICIO", href: "/" },
    { name: "QUIÉNES SOMOS", href: "/about" },
    { name: "QUÉ HACEMOS", href: "/services" },
    { name: "PROYECTOS", href: "/projects" },
    { name: "CONTACTO", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-0 md:h-16 md:py-0">
          <motion.div
            className="flex w-full items-center justify-center md:w-auto md:justify-start"
            whileHover={{ scale: 1.02 }}
          >
            <button
              type="button"
              className="flex w-full items-center justify-center focus:outline-none md:w-auto md:justify-start"
              onClick={() => navigate("/")}
            >
              <img
                src="/logo.jpeg"
                alt="HemispherIA"
                className="w-full max-h-32 object-contain md:max-h-16"
              />
            </button>
          </motion.div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
                className="text-gray-700 hover:text-blue-800 font-medium transition-colors relative py-2 cursor-pointer"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-800"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            <Button
              className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2"
              onClick={() => navigate("/contact")}
            >
              Contacto
            </Button>
          </div>

          <div className="flex w-full items-center justify-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-blue-800 focus:outline-none"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-2 bg-white px-4 pt-4 pb-6 shadow-lg">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full rounded-md px-3 py-2 text-center text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800 cursor-pointer"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="w-full border-t border-gray-200 pt-3">
                <Button
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white"
                  onClick={() => {
                    navigate("/contact");
                    setIsMenuOpen(false);
                  }}
                >
                  Contacto
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AnimatedNavbar;