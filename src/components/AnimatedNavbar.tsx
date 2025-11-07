"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Globe, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const AnimatedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("ES");
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "INICIO", href: "#home" },
    { name: "QUIÉNES SOMOS", href: "#about" },
    { name: "QUÉ HACEMOS", href: "#services" },
    { name: "PROYECTOS", href: "#projects" },
    { name: "HUB", href: "#hub" },
    { name: "NOTICIAS", href: "#news" },
    { name: "ÚNETE", href: "#join" },
    { name: "CONTACTO", href: "#contact" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex-shrink-0 flex items-center">
              <motion.span 
                className="text-xl font-bold text-blue-600"
                whileHover={{ textShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
              >
                HemispherIA
              </motion.span>
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
                onClick={() => setLanguage(language === "ES" ? "EN" : language === "EN" ? "PT" : "ES")}
              >
                <Globe className="h-4 w-4" />
                <span>{language}</span>
              </Button>
            </div>
            
            {/* Sound Toggle */}
            <motion.button
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            >
              <Volume2 className={`h-4 w-4 ${isSoundEnabled ? 'text-blue-600' : 'text-gray-400'}`} />
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="px-3 py-2 border-t border-gray-200 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center space-x-1"
                  onClick={() => setLanguage(language === "ES" ? "EN" : language === "EN" ? "PT" : "ES")}
                >
                  <Globe className="h-4 w-4" />
                  <span>{language}</span>
                </Button>
                
                <motion.button
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                >
                  <Volume2 className={`h-4 w-4 ${isSoundEnabled ? 'text-blue-600' : 'text-gray-400'}`} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AnimatedNavbar;