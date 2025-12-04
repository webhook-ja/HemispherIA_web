"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Scale,
  ShieldAlert,
  Copyright,
  AlertTriangle,
  RefreshCw,
  MapPin,
  CheckCircle2
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const TermsOfServicePage = () => {
  const sections = [
    {
      icon: CheckCircle2,
      title: "1. Uso de los servicios",
      content: [
        {
          items: [
            "Nuestros servicios están destinados a usuarios mayores de 16 años (o la edad de consentimiento en tu jurisdicción).",
            "Prohibido usar la plataforma para fines ilegales, dañinos, fraudulentos o que infrinjan derechos de terceros.",
            "No está permitido intentar acceder a sistemas no autorizados, sobrecargar servidores o usar bots para explotar nuestros modelos sin autorización."
          ]
        }
      ]
    },
    {
      icon: Copyright,
      title: "2. Propiedad intelectual",
      content: [
        {
          items: [
            "Todo el contenido, software, marcas y tecnología de Hemispher-IA son propiedad exclusiva de la empresa o de sus licenciantes.",
            "Los resultados generados por nuestros modelos de IA pueden usarse libremente por ti, siempre que no infrinjan leyes ni derechos de terceros.",
            "No asumimos responsabilidad por el contenido generado si incluye datos que tú hayas proporcionado."
          ]
        }
      ]
    },
    {
      icon: ShieldAlert,
      title: "3. Limitación de responsabilidad",
      content: [
        {
          items: [
            "Nuestros servicios se proporcionan \"tal cual\". No garantizamos que estén libres de errores, interrupciones o que cumplan con tus expectativas específicas.",
            "No seremos responsables de daños indirectos, incidentales o consecuentes derivados del uso de la plataforma."
          ]
        }
      ]
    },
    {
      icon: RefreshCw,
      title: "4. Modificaciones",
      content: [
        {
          text: "Nos reservamos el derecho de modificar, suspender o descontinuar cualquier parte de los servicios en cualquier momento."
        }
      ]
    },
    {
      icon: Scale,
      title: "5. Legislación aplicable",
      content: [
        {
          text: "Estos términos se rigen por las leyes de la República de Panamá. Cualquier disputa se someterá a los tribunales competentes de Ciudad de Panamá."
        }
      ]
    }
  ];

  const guidelines = [
    {
      icon: CheckCircle2,
      title: "Uso Permitido",
      items: [
        "Investigación y desarrollo",
        "Proyectos educativos",
        "Aplicaciones comerciales legítimas",
        "Colaboración académica"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Uso Prohibido",
      items: [
        "Actividades ilegales",
        "Spam o contenido malicioso",
        "Ingeniería inversa",
        "Reventa no autorizada"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Scale className="h-16 w-16 mx-auto mb-6 text-indigo-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Términos de Uso
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-4">
              Al acceder o utilizar el sitio web y los servicios de Hemispher-IA, aceptas estos Términos de Uso.
            </p>
            <p className="text-lg text-indigo-200">
              Si no estás de acuerdo, por favor no utilices nuestra plataforma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-l-4 border-l-indigo-600">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <FileText className="h-8 w-8 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      Condiciones Generales
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <RefreshCw className="h-4 w-4" />
                      <span className="text-sm">
                        Última actualización: 4 de diciembre de 2025
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Estos términos establecen las reglas y regulaciones para el uso de los servicios de Hemispher-IA. Al acceder a nuestra plataforma, aceptas cumplir con estos términos en su totalidad.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <section.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {section.title}
                        </h3>

                        {section.content.map((contentBlock, idx) => (
                          <div key={idx} className="mb-4 last:mb-0">
                            {contentBlock.items && (
                              <ul className="space-y-3">
                                {contentBlock.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="flex items-start">
                                    <span className="text-indigo-600 mr-3 mt-1.5 flex-shrink-0">•</span>
                                    <span className="text-gray-700 leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {contentBlock.text && (
                              <p className="text-gray-700 leading-relaxed">
                                {contentBlock.text}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Directrices de Uso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${index === 0 ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        index === 0 ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <guideline.icon className={`h-6 w-6 ${
                          index === 0 ? 'text-green-600' : 'text-red-600'
                        }`} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {guideline.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {guideline.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            index === 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jurisdiction Notice */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MapPin className="h-16 w-16 mx-auto mb-6 text-indigo-200" />
            <h2 className="text-3xl font-bold mb-4">
              Jurisdicción y Ley Aplicable
            </h2>
            <p className="text-xl text-indigo-100 mb-6">
              Estos términos se rigen por las leyes de la <strong>República de Panamá</strong>.
            </p>
            <p className="text-lg text-indigo-200">
              Cualquier disputa derivada del uso de nuestros servicios se someterá a los tribunales competentes de Ciudad de Panamá.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Importante
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      <strong>Aceptación de términos:</strong> El uso continuado de nuestros servicios constituye la aceptación de estos términos y cualquier modificación posterior.
                    </p>
                    <p>
                      <strong>Actualizaciones:</strong> Nos reservamos el derecho de actualizar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente tras su publicación.
                    </p>
                    <p>
                      <strong>Notificaciones:</strong> Es tu responsabilidad revisar periódicamente estos términos para estar al tanto de cualquier cambio.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default TermsOfServicePage;
