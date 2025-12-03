"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Database,
  Users,
  Rocket,
  ChevronRight,
  BarChart3,
  Zap,
  Shield,
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const services = [
    {
      id: 0,
      title: "Estrategia y Consultoría en IA Social",
      icon: <Brain className="h-8 w-8" />,
      description:
        "Diseñamos estrategias que usan inteligencia artificial de manera ética y responsable para mejorar políticas públicas, programas sociales y comunicación con comunidades.",
      color: "from-blue-500 to-blue-700",
      items: [
        "Diagnóstico y diseño de proyectos IA",
        "Integración de IA en campañas sociales",
        "Evaluación de impacto y gobernanza de datos",
      ],
      stats: [
        { value: "95%", label: "Precisión en predicciones" },
        { value: "40%", label: "Reducción de costos" },
        { value: "3x", label: "Velocidad de implementación" },
      ],
    },
    {
      id: 1,
      title: "Intermediación de conocimiento",
      icon: <Database className="h-8 w-8" />,
      description:
        "Facilitamos la creación, transferencia y aplicación de conocimiento entre sectores, usando enfoques de knowledge brokering y plataformas colaborativas.",
      color: "from-green-500 to-green-700",
      items: [
        "Mapas de actores",
        "Curaduría de información",
        "Redes de aprendizaje e innovación",
      ],
      stats: [
        { value: "200+", label: "Actores conectados" },
        { value: "50+", label: "Bases de datos integradas" },
        { value: "85%", label: "Eficiencia en transferencia" },
      ],
    },
    {
      id: 2,
      title: "Marketing de Influencia y Comunicación de Impacto",
      icon: <Users className="h-8 w-8" />,
      description:
        "Combinamos la analítica de datos y el poder de las comunidades digitales para promover comportamientos sostenibles, salud, equidad e inclusión.",
      color: "from-purple-500 to-purple-700",
      items: [
        "Campañas de salud pública",
        "Clima, derechos humanos y migración",
      ],
      stats: [
        { value: "2M+", label: "Personas alcanzadas" },
        { value: "75%", label: "Tasa de engagement" },
        { value: "15x", label: "Alcance orgánico" },
      ],
    },
    {
      id: 3,
      title: "Proyectos Piloto",
      icon: <Rocket className="h-8 w-8" />,
      description:
        "Ejecutamos pilotos regionales en colaboración con gobiernos, ONGs y el sector privado.",
      color: "from-orange-500 to-orange-700",
      items: [
        "IA para monitoreo de salud materna en comunidades rurales",
        "Redes de influencers por la acción climática juvenil",
        "Mapeo de conocimiento en políticas migratorias del Darién",
      ],
      stats: [
        { value: "15", label: "Proyectos activos" },
        { value: "98%", label: "Tasa de éxito" },
        { value: "30+", label: "Comunidades impactadas" },
      ],
    },
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Soluciones Innovadoras con <br />Impacto Medible
            </motion.h1>
            <motion.p
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transformamos desafíos complejos en oportunidades de impacto
              sostenible a través de tecnología, conocimiento y colaboración.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-900 border-white hover:bg-blue-800 hover:text-white"
              >
                Descargar Nuestro Portafolio
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones integrales diseñadas para maximizar el impacto social y
              tecnológico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setActiveService(service.id)}
              >
                <Card
                  className={`h-full cursor-pointer border-l-4 border-l-blue-800 ${
                    activeService === service.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-4`}
                    >
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button variant="ghost" className="p-0 h-auto font-medium">
                      Ver detalles
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service View */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {services[activeService].title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {services[activeService].description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {services[activeService].items.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{
                      x: 5,
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${services[activeService].color} flex items-center justify-center text-white mr-4 flex-shrink-0`}
                      >
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Casos de Éxito
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "IA para monitoreo de salud materna",
                      description:
                        "Proyecto piloto en comunidades rurales de Colombia para mejorar el acceso a servicios de salud materna mediante IA predictiva.",
                      impact: "35% mejora en indicadores de salud",
                    },
                    {
                      title:
                        "Redes de influencers por la acción climática juvenil",
                      description:
                        "Colaboración con jóvenes activistas digitales en Brasil y Argentina para promover acciones climáticas sostenibles.",
                      impact: "2M de personas alcanzadas",
                    },
                  ].map((caseStudy, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            {caseStudy.title}
                          </h4>
                          <p className="text-gray-600 mb-3">
                            {caseStudy.description}
                          </p>
                        </div>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                          {caseStudy.impact}
                        </span>
                      </div>
                      <Button variant="link" className="p-0 h-auto">
                        Ver detalles
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Métricas de Impacto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {services[activeService].stats.map((stat, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-600">{stat.label}</span>
                          <span className="font-bold text-gray-900">
                            {stat.value}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className={`bg-gradient-to-r ${services[activeService].color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.min(100, parseInt(stat.value))}%`,
                            }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5" />
                    Proceso de Implementación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "Diagnóstico inicial",
                      "Diseño de solución",
                      "Desarrollo e implementación",
                      "Monitoreo y evaluación",
                    ].map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${services[activeService].color} flex items-center justify-center text-white text-sm font-bold mr-3`}
                        >
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Process Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Un enfoque estructurado para garantizar resultados medibles
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-700 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                {
                  title: "Descubrimiento",
                  icon: <Shield className="h-6 w-6" />,
                  description: "Entendemos tus desafíos y objetivos",
                },
                {
                  title: "Estrategia",
                  icon: <Brain className="h-6 w-6" />,
                  description: "Diseñamos soluciones personalizadas",
                },
                {
                  title: "Implementación",
                  icon: <Zap className="h-6 w-6" />,
                  description: "Ejecutamos con metodología ágil",
                },
                {
                  title: "Impacto",
                  icon: <BarChart3 className="h-6 w-6" />,
                  description: "Medimos y optimizamos resultados",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center relative z-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="w-20 h-20 bg-white text-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-blue-200">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default ServicesPage;