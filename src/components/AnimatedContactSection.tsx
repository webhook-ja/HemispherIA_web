"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedContactSection = () => {
  return (
    <ContextualSection
      id="contact"
      title="CONTACTO"
      context="contact"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <AnimatedCard context="contact">
          <div className="p-6 space-y-6">
            <h3 className="text-xl font-bold text-pink-600 mb-4">Información de Contacto</h3>
            
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-pink-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Dirección</h4>
                <p className="text-gray-700">Calle Luis Bonilla 104, Ciudad de Panamá</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-pink-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-700">contact@hemispheria.org</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-pink-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Teléfono</h4>
                <p className="text-gray-700">+507 6415 3572</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Síguenos</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="border-pink-500 text-pink-600 hover:bg-pink-50">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-pink-500 text-pink-600 hover:bg-pink-50">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="border-pink-500 text-pink-600 hover:bg-pink-50">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard context="contact">
          <div className="p-6">
            <h3 className="text-xl font-bold text-pink-600 mb-4">Envíanos un mensaje</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <Input id="name" placeholder="Tu nombre" className="border-pink-200 focus:border-pink-500" />
              </div>
              
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                  Organización
                </label>
                <Input id="organization" placeholder="Nombre de tu organización" className="border-pink-200 focus:border-pink-500" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <Textarea id="message" placeholder="Tu mensaje aquí..." rows={5} className="border-pink-200 focus:border-pink-500" />
              </div>
              
              <Button className="w-full bg-pink-600 hover:bg-pink-700">
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </AnimatedCard>
      </div>
    </ContextualSection>
  );
};

export default AnimatedContactSection;