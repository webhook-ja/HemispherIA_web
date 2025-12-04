"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Lock,
  Database,
  FileText,
  Eye,
  UserCheck,
  Globe,
  Calendar,
  Mail,
  AlertCircle
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const PrivacyPolicyPage = () => {
  const sections = [
    {
      icon: Database,
      title: "1. Información que recopilamos",
      content: [
        {
          subtitle: "Podemos recopilar:",
          items: [
            "Datos de identificación: nombre, correo electrónico, empresa (si aplica).",
            "Datos técnicos: dirección IP, tipo de navegador, sistema operativo, cookies.",
            "Datos de uso: páginas visitadas, tiempo de uso, interacciones con la plataforma.",
            "Contenido proporcionado por ti: prompts, archivos subidos, resultados generados (si usas nuestros modelos de IA)."
          ]
        }
      ]
    },
    {
      icon: FileText,
      title: "2. Finalidad del tratamiento",
      content: [
        {
          subtitle: "Utilizamos tus datos para:",
          items: [
            "Prestar y mejorar nuestros servicios de IA.",
            "Comunicarnos contigo (soporte, actualizaciones, respuestas a consultas).",
            "Cumplir con obligaciones legales.",
            "Analizar y optimizar el rendimiento del sitio."
          ]
        }
      ]
    },
    {
      icon: UserCheck,
      title: "3. Base legal para el tratamiento",
      content: [
        {
          subtitle: "El tratamiento se basa en:",
          items: [
            "Tu consentimiento (para cookies no esenciales o marketing).",
            "El cumplimiento de un contrato (cuando usas nuestros servicios).",
            "Intereses legítimos (seguridad, análisis interno)."
          ]
        }
      ]
    },
    {
      icon: Globe,
      title: "4. Compartir tus datos",
      content: [
        {
          subtitle: "No vendemos tus datos. Podemos compartirlos con:",
          items: [
            "Proveedores de servicios (alojamiento, análisis, soporte técnico), bajo estrictas cláusulas de confidencialidad.",
            "Autoridades competentes, si así lo exige la ley."
          ]
        }
      ]
    },
    {
      icon: Globe,
      title: "5. Transferencias internacionales",
      content: [
        {
          text: "Algunos de nuestros proveedores están fuera del Espacio Económico Europeo. En esos casos, garantizamos salvaguardas adecuadas (cláusulas contractuales tipo de la UE, etc.)."
        }
      ]
    },
    {
      icon: Eye,
      title: "6. Tus derechos",
      content: [
        {
          subtitle: "Tienes derecho a:",
          items: [
            "Acceder, rectificar o eliminar tus datos.",
            "Limitar u oponerte al tratamiento.",
            "Solicitar la portabilidad de tus datos.",
            "Retirar tu consentimiento en cualquier momento."
          ]
        },
        {
          text: "Puedes ejercer estos derechos contactándonos en:",
          email: "info@hemispher-ia.org"
        }
      ]
    },
    {
      icon: Calendar,
      title: "7. Conservación de datos",
      content: [
        {
          text: "Conservamos tus datos solo durante el tiempo necesario para cumplir con las finalidades descritas o según lo exija la ley."
        }
      ]
    },
    {
      icon: Lock,
      title: "8. Seguridad",
      content: [
        {
          text: "Implementamos medidas técnicas y organizativas para proteger tus datos contra el acceso no autorizado, pérdida o alteración."
        }
      ]
    },
    {
      icon: AlertCircle,
      title: "9. Actualizaciones",
      content: [
        {
          text: "Podemos actualizar esta política. La versión vigente siempre estará disponible en esta página."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-gray-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="h-16 w-16 mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              En Hemispher-IA, nos comprometemos a operar con transparencia, responsabilidad y respeto hacia nuestros usuarios. Esta sección legal contiene información esencial sobre cómo utilizamos tu información, los términos bajo los cuales accedes a nuestros servicios y las tecnologías que empleamos para mejorar tu experiencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-l-4 border-l-blue-600">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <FileText className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      Política de Privacidad
                    </h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        Última actualización: 4 de diciembre de 2025
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      En Hemispher-IA ("nosotros", "nuestro" o "la empresa") valoramos tu privacidad y estamos comprometidos con la protección de tus datos personales. Esta Política de Privacidad explica cómo recopilamos, utilizamos, compartimos y protegemos la información cuando utilizas nuestro sitio web, plataforma o servicios relacionados con inteligencia artificial.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Sections */}
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
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <section.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {section.title}
                        </h3>

                        {section.content.map((contentBlock, idx) => (
                          <div key={idx} className="mb-4 last:mb-0">
                            {contentBlock.subtitle && (
                              <p className="text-gray-700 font-medium mb-2">
                                {contentBlock.subtitle}
                              </p>
                            )}

                            {contentBlock.items && (
                              <ul className="space-y-2 ml-4">
                                {contentBlock.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="flex items-start">
                                    <span className="text-blue-600 mr-2 mt-1.5 flex-shrink-0">•</span>
                                    <span className="text-gray-700">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {contentBlock.text && (
                              <p className="text-gray-700 leading-relaxed">
                                {contentBlock.text}
                              </p>
                            )}

                            {contentBlock.email && (
                              <div className="mt-3 flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                                <Mail className="h-5 w-5 text-blue-600" />
                                <a
                                  href={`mailto:${contentBlock.email}`}
                                  className="text-blue-700 hover:text-blue-800 font-medium"
                                >
                                  {contentBlock.email}
                                </a>
                              </div>
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

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Mail className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Tienes dudas sobre tu privacidad?
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              Estamos comprometidos con la transparencia. Si tienes preguntas sobre cómo manejamos tus datos, contáctanos.
            </p>
            <a
              href="mailto:info@hemispher-ia.org"
              className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <Mail className="h-5 w-5" />
              info@hemispher-ia.org
            </a>
          </motion.div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Nuestros Principios de Privacidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Transparencia",
                description: "Te informamos claramente sobre qué datos recopilamos y cómo los usamos"
              },
              {
                icon: Lock,
                title: "Seguridad",
                description: "Implementamos medidas robustas para proteger tu información personal"
              },
              {
                icon: UserCheck,
                title: "Control",
                description: "Tienes derecho a acceder, modificar o eliminar tus datos en cualquier momento"
              }
            ].map((principle, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default PrivacyPolicyPage;
