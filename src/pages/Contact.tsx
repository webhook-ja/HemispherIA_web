"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Linkedin,
  Instagram,
  Twitter,
  Send,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Nos pondremos en contacto pronto.",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", organization: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Dirección",
      content: "Calle Luis Bonilla 104, Ciudad de Panamá",
      highlight: true
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "info@hemispher-ia.org",
      highlight: false
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Teléfono",
      content: "+507 6415 3572",
      highlight: false
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horario",
      content: "Lunes a Viernes: 9:00 AM - 6:00 PM",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Hablemos de Cómo Podemos Colaborar
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Estamos listos para ayudarte a transformar desafíos en oportunidades de impacto sostenible.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-blue-900 border-white hover:bg-blue-800 hover:text-white"
                >
                  Programar una reunión
                </Button>
                <Button 
                  size="lg" 
                  variant="ghost" 
                  className="text-white hover:bg-white/20"
                >
                  Ver ubicación
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-96 flex items-center justify-center">
                <p className="text-gray-500">Mapa interactivo de nuestra oficina</p>
              </div>
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg"
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity
                }}
              >
                <Phone className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Información de Contacto</h2>
                <p className="text-xl text-gray-600">
                  Estamos aquí para ayudarte. Comunícate con nosotros por cualquiera de estos medios.
                </p>
              </div>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-start p-6 rounded-xl ${
                      info.highlight 
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200" 
                        : "bg-gray-50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className={`p-3 rounded-lg mr-4 ${
                      info.highlight 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className={`${info.highlight ? "text-blue-800 font-medium" : "text-gray-600"}`}>
                        {info.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Síguenos en redes</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn" },
                    { icon: <Instagram className="h-5 w-5" />, name: "Instagram" },
                    { icon: <Twitter className="h-5 w-5" />, name: "Twitter" }
                  ].map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="w-12 h-12 rounded-full"
                      >
                        {social.icon}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
                  <p className="text-gray-600">
                    Completa el formulario y nuestro equipo se pondrá en contacto contigo.
                  </p>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
                      <p className="text-gray-600">
                        Gracias por contactarnos. Nos pondremos en contacto contigo pronto.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email corporativo
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu.empresa@dominio.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                          Organización
                        </label>
                        <Input
                          id="organization"
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          placeholder="Nombre de tu organización"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Mensaje
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Cuéntanos cómo podemos ayudarte..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            className="flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                          </motion.div>
                        ) : (
                          <span className="flex items-center justify-center">
                            Enviar Mensaje
                            <Send className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
              
              {/* Office Locations */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { city: "Ciudad de Panamá", country: "Panamá", address: "Calle Luis Bonilla 104" },
                  { city: "Bogotá", country: "Colombia", address: "Carrera 7 #100-20" }
                ].map((location, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="font-semibold text-gray-900">{location.city}</h4>
                    <p className="text-gray-600 text-sm">{location.country}</p>
                    <p className="text-gray-500 text-sm mt-1">{location.address}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Información útil para comenzar nuestra colaboración
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "¿Cuánto tiempo toma desarrollar un proyecto?",
                answer: "El tiempo varía según la complejidad, pero nuestros proyectos piloto típicamente se completan en 6-12 meses."
              },
              {
                question: "¿Qué tipo de organizaciones colaboran con Hemispher-IA?",
                answer: "Trabajamos con gobiernos, ONGs, instituciones académicas y empresas del sector privado comprometidas con el impacto social."
              },
              {
                question: "¿Ofrecen servicios de consultoría en otros países?",
                answer: "Sí, ofrecemos servicios remotos y presenciales en toda América Latina y el Caribe."
              },
              {
                question: "¿Cómo garantizan la ética en el uso de IA?",
                answer: "Seguimos estrictos principios de gobernanza de datos y tenemos un comité de ética que revisa todos nuestros proyectos."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default ContactPage;