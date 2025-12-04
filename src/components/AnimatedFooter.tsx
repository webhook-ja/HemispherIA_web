"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-4">Hemispher-IA</h3>
            <p className="text-gray-400">
              Conectamos conocimiento, talento y tecnología para un futuro sostenible en América Latina y el Caribe.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Nuestra Organización</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">Quiénes Somos</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Qué Hacemos</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Proyectos</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/publicaciones" className="hover:text-white transition-colors">Publicaciones</Link></li>
              <li><Link to="/eventos" className="hover:text-white transition-colors">Eventos</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/alianzas" className="hover:text-white transition-colors">Alianzas</Link></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition-colors">Términos de Uso</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>© {new Date().getFullYear()} Hemispher-IA. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default AnimatedFooter;