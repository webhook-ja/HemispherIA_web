"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cookie,
  Settings,
  Eye,
  BarChart3,
  Globe,
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const CookiesPolicyPage = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    technical: true, // Always enabled
    analytics: false,
    preferences: false,
    advertising: false
  });

  const cookieTypes = [
    {
      icon: Shield,
      title: "Técnicas",
      description: "Esenciales para el funcionamiento del sitio (p. ej., sesión de usuario). No requieren consentimiento.",
      required: true,
      examples: ["Sesión de usuario", "Seguridad", "Carrito de compras"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: BarChart3,
      title: "Analíticas",
      description: "Nos ayudan a entender cómo usas la plataforma (p. ej., Google Analytics). Requieren tu consentimiento.",
      required: false,
      examples: ["Google Analytics", "Métricas de uso", "Mapas de calor"],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Settings,
      title: "De preferencias",
      description: "Recuerdan tu configuración (idioma, región).",
      required: false,
      examples: ["Idioma", "Región", "Tema visual"],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Eye,
      title: "Publicitarias",
      description: "(Si aplica) Personalizan anuncios. Solo se usan con tu permiso explícito.",
      required: false,
      examples: ["Anuncios personalizados", "Remarketing", "Seguimiento publicitario"],
      color: "from-orange-500 to-red-600"
    }
  ];

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Análisis de tráfico web",
      type: "Analíticas",
      link: "https://policies.google.com/privacy"
    },
    {
      name: "Meta (Facebook)",
      purpose: "Interacción en redes sociales",
      type: "Publicitarias",
      link: "https://www.facebook.com/privacy/explanation"
    },
    {
      name: "Google Ads",
      purpose: "Publicidad personalizada",
      type: "Publicitarias",
      link: "https://policies.google.com/technologies/ads"
    }
  ];

  const handleToggle = (type: keyof typeof cookiePreferences) => {
    if (type !== 'technical') {
      setCookiePreferences(prev => ({
        ...prev,
        [type]: !prev[type]
      }));
    }
  };

  const handleAcceptAll = () => {
    setCookiePreferences({
      technical: true,
      analytics: true,
      preferences: true,
      advertising: true
    });
  };

  const handleRejectAll = () => {
    setCookiePreferences({
      technical: true, // Always enabled
      analytics: false,
      preferences: false,
      advertising: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-amber-900 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Cookie className="h-16 w-16 mx-auto mb-6 text-amber-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Política de Cookies
            </h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Hemispher-IA utiliza cookies y tecnologías similares para mejorar tu experiencia de usuario, analizar el rendimiento del sitio y ofrecer contenido personalizado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-l-4 border-l-amber-600">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Cookie className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      ¿Qué son las cookies?
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <RefreshCw className="h-4 w-4" />
                      <span className="text-sm">
                        Última actualización: 4 de diciembre de 2025
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo al visitar un sitio web. Nos permiten recordar tus preferencias, medir el tráfico y optimizar funcionalidades.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Tipos de cookies que usamos
          </h2>

          <div className="space-y-6">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 bg-gradient-to-br ${cookie.color} rounded-lg flex items-center justify-center`}>
                          <cookie.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {cookie.title}
                          </h3>
                          {cookie.required ? (
                            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                              Necesarias
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                              Opcionales
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {cookie.description}
                        </p>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2 font-medium">Ejemplos:</p>
                          <div className="flex flex-wrap gap-2">
                            {cookie.examples.map((example, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>

                        {!cookie.required && (
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <span className="text-sm text-gray-600">
                              {cookiePreferences[index === 1 ? 'analytics' : index === 2 ? 'preferences' : 'advertising']
                                ? 'Activadas'
                                : 'Desactivadas'}
                            </span>
                            <Button
                              variant={cookiePreferences[index === 1 ? 'analytics' : index === 2 ? 'preferences' : 'advertising'] ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleToggle(index === 1 ? 'analytics' : index === 2 ? 'preferences' : 'advertising')}
                            >
                              {cookiePreferences[index === 1 ? 'analytics' : index === 2 ? 'preferences' : 'advertising']
                                ? <CheckCircle2 className="h-4 w-4 mr-2" />
                                : <XCircle className="h-4 w-4 mr-2" />}
                              {cookiePreferences[index === 1 ? 'analytics' : index === 2 ? 'preferences' : 'advertising']
                                ? 'Aceptar'
                                : 'Rechazar'}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Management */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Gestión de cookies
          </h2>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Puedes:</h3>
              <ul className="space-y-3 mb-6">
                {[
                  "Configurar tus preferencias mediante nuestro banner de cookies al ingresar al sitio.",
                  "Cambiar tus preferencias en cualquier momento desde el enlace \"Gestionar cookies\" en el pie de página.",
                  "Eliminar cookies desde la configuración de tu navegador."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      <strong>Importante:</strong> Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Cookie Preference Controls */}
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Settings className="h-12 w-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Preferencias de Cookies
                </h3>
                <p className="text-gray-600">
                  Gestiona tus preferencias de cookies aquí
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleAcceptAll}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Aceptar todas
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleRejectAll}
                >
                  <XCircle className="h-5 w-5 mr-2" />
                  Solo necesarias
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Terceros
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Algunas cookies son gestionadas por terceros (como Google, Meta, etc.). Estos terceros tienen sus propias políticas de privacidad.
          </p>

          <div className="space-y-4">
            {thirdPartyServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Globe className="h-8 w-8 text-gray-400" />
                        <div>
                          <h4 className="font-bold text-gray-900">{service.name}</h4>
                          <p className="text-sm text-gray-600">{service.purpose}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                          {service.type}
                        </span>
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                        >
                          Ver política →
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browser Settings */}
      <section className="py-16 bg-gradient-to-r from-amber-900 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Settings className="h-16 w-16 mx-auto mb-6 text-amber-200" />
            <h2 className="text-3xl font-bold mb-4">
              Configuración del navegador
            </h2>
            <p className="text-xl text-amber-100 mb-6">
              Puedes configurar o eliminar cookies directamente desde tu navegador
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {['Chrome', 'Firefox', 'Safari', 'Edge'].map((browser, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Globe className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm font-medium">{browser}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default CookiesPolicyPage;
