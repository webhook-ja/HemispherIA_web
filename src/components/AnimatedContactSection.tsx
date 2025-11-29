"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import ContextualSection from "@/components/ContextualSection";

const AnimatedContactSection = () => {
  return (
    <ContextualSection
      id="contact"
      title="CONTACTO"
      subtitle="Hablemos de cómo podemos colaborar"
      className="bg-gray-50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <AnimatedCard>
          <div className="p-8">
            <h3 className="text-xl font-bold text-blue-800 mb-6">Información de Contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-800 mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Dirección</h4>
                  <p className="text-gray-600">Calle Luis Bonilla 104, Ciudad de Panamá</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-800 mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@hemispher-ia.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-800 mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Teléfono</h4>
                  <p className="text-gray-600">+507 6415 3572</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Horario de atención</h4>
              <p className="text-gray-600">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard>
          <div className="p-8">
            <h3 className="text-xl font-bold text-blue-800 mb-6">Envíanos un mensaje</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <Input 
                  id="name" 
                  placeholder="Tu nombre" 
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email corporativo
                </label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="tu.empresa@dominio.com" 
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                />
              </div>
              
              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                  Organización
                </label>
                <Input 
                  id="organization" 
                  placeholder="Nombre de tu organización" 
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Cuéntanos cómo podemos ayudarte..." 
                  rows={5} 
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3"
              >
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