"use client";

import React, { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("ES");

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
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">Hemispher-IA</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span>{language}</span>
              </Button>
            </div>
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
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 py-2 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center justify-center space-x-1"
              >
                <Globe className="h-4 w-4" />
                <span>{language}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;