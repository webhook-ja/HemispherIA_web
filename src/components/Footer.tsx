"use client";

import React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">HemispherIA</h3>
            <p className="text-gray-400">
              Conectamos conocimiento, talento y tecnología para un futuro sostenible en América Latina y el Caribe.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white">Inicio</a></li>
              <li><a href="#about" className="hover:text-white">Quiénes Somos</a></li>
              <li><a href="#services" className="hover:text-white">Qué Hacemos</a></li>
              <li><a href="#projects" className="hover:text-white">Proyectos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#hub" className="hover:text-white">HemispherIA Hub</a></li>
              <li><a href="#news" className="hover:text-white">Noticias</a></li>
              <li><a href="#join" className="hover:text-white">Únete</a></li>
              <li><a href="#" className="hover:text-white">Publicaciones</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Idioma</h4>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-white border-gray-700 hover:bg-gray-800">
                ES
              </Button>
              <Button variant="outline" size="sm" className="text-white border-gray-700 hover:bg-gray-800">
                EN
              </Button>
              <Button variant="outline" size="sm" className="text-white border-gray-700 hover:bg-gray-800">
                PT
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} HemispherIA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;