"use client";

import React, { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AnimatedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("ES");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "INICIO", href: "/" },
    { name: "QUIÉNES SOMOS", href: "/about" },
    { name: "QUÉ HACEMOS", href: "/services" },
    { name: "PROYECTOS", href: "/projects" },
    { name: "INFORMACIÓN PÚBLICA", href: "/public-info" },
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
                alt="Hemispher-IA"
                className="h-10 w-auto"
              />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
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

            {/* Language Selector */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 border-blue-800 text-blue-800 hover:bg-blue-50"
              >
                <Globe className="h-4 w-4" />
                <span>{language}</span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="absolute right-4 top-4 md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-blue-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="space-y-1 bg-white px-2 pb-3 pt-2 shadow-lg sm:px-3">
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
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center gap-1 border-blue-800 text-blue-800"
              >
                <Globe className="h-4 w-4" />
                <span>{language}</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default AnimatedNavbar;
