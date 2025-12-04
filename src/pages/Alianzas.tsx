"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Globe,
  Users,
  Handshake,
  Award,
  Target,
  TrendingUp,
  Mail,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Star,
  Filter
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const AlianzasPage = () => {
  const [selectedType, setSelectedType] = useState("Todos");

  const partnerTypes = [
    "Todos",
    "Organizaciones Internacionales",
    "Gobiernos",
    "Universidades",
    "ONGs",
    "Sector Privado"
  ];

  const partners = [
    {
      id: 1,
      name: "Organización Panamericana de la Salud (OPS/OMS)",
      type: "Organizaciones Internacionales",
      country: "Regional",
      logo: "https://via.placeholder.com/200x100/0051a5/ffffff?text=OPS/OMS",
      description: "Colaboración en proyectos de IA para salud pública en comunidades vulnerables de América Latina.",
      projects: 3,
      since: "2023",
      featured: true,
      areas: ["Salud Pública", "IA Social", "Monitoreo"]
    },
    {
      id: 2,
      name: "Banco Interamericano de Desarrollo (BID)",
      type: "Organizaciones Internacionales",
      country: "Regional",
      logo: "https://via.placeholder.com/200x100/1e88e5/ffffff?text=BID",
      description: "Alianza estratégica para iniciativas de innovación social y transformación digital en LAC.",
      projects: 5,
      since: "2022",
      featured: true,
      areas: ["Innovación", "Desarrollo", "Tecnología"]
    },
    {
      id: 3,
      name: "Ministerio de Salud de Colombia",
      type: "Gobiernos",
      country: "Colombia",
      logo: "https://via.placeholder.com/200x100/d32f2f/ffffff?text=MinSalud+CO",
      description: "Implementación de piloto de IA para salud materna en comunidades rurales del Pacífico.",
      projects: 2,
      since: "2024",
      featured: false,
      areas: ["Salud Materna", "IA Predictiva", "Ruralidad"]
    },
    {
      id: 4,
      name: "Universidad de São Paulo (USP)",
      type: "Universidades",
      country: "Brasil",
      logo: "https://via.placeholder.com/200x100/4caf50/ffffff?text=USP",
      description: "Investigación colaborativa en comunicación climática y movilización juvenil en América Latina.",
      projects: 2,
      since: "2023",
      featured: false,
      areas: ["Investigación", "Clima", "Juventud"]
    },
    {
      id: 5,
      name: "Fundación para el Desarrollo Sostenible (FUNDES)",
      type: "ONGs",
      country: "Regional",
      logo: "https://via.placeholder.com/200x100/ff9800/ffffff?text=FUNDES",
      description: "Programas conjuntos de capacitación en intermediación de conocimiento para organizaciones sociales.",
      projects: 4,
      since: "2022",
      featured: true,
      areas: ["Capacitación", "Knowledge Brokering", "ONGs"]
    },
    {
      id: 6,
      name: "Microsoft AI for Good",
      type: "Sector Privado",
      country: "Global",
      logo: "https://via.placeholder.com/200x100/00a4ef/ffffff?text=Microsoft",
      description: "Apoyo tecnológico y capacitación en herramientas de IA para proyectos de impacto social.",
      projects: 3,
      since: "2023",
      featured: false,
      areas: ["IA", "Tecnología", "Capacitación"]
    },
    {
      id: 7,
      name: "Gobierno de Panamá - Ministerio de Innovación",
      type: "Gobiernos",
      country: "Panamá",
      logo: "https://via.placeholder.com/200x100/009bde/ffffff?text=MIDES+PA",
      description: "Asesoría en políticas públicas de transformación digital y adopción de IA ética.",
      projects: 2,
      since: "2024",
      featured: false,
      areas: ["Políticas Públicas", "IA Ética", "Gobierno Digital"]
    },
    {
      id: 8,
      name: "Red de Influencers por el Clima (RIC)",
      type: "ONGs",
      country: "Regional",
      logo: "https://via.placeholder.com/200x100/8bc34a/ffffff?text=RIC",
      description: "Co-creación de campañas digitales con influencers jóvenes para acción climática en LAC.",
      projects: 5,
      since: "2022",
      featured: false,
      areas: ["Comunicación", "Clima", "Influencers"]
    }
  ];

  const filteredPartners = partners.filter(partner =>
    selectedType === "Todos" || partner.type === selectedType
  );

  const stats = [
    { label: "Aliados Estratégicos", value: "50+", icon: Handshake },
    { label: "Países de la Red", value: "25+", icon: Globe },
    { label: "Proyectos Colaborativos", value: "38+", icon: Target },
    { label: "Años de Alianzas", value: "5+", icon: Award }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Amplificación de Impacto",
      description: "Escalamos soluciones a través de redes regionales y recursos compartidos"
    },
    {
      icon: Users,
      title: "Co-creación",
      description: "Diseñamos proyectos conjuntos con enfoque multi-actor y multidisciplinario"
    },
    {
      icon: Award,
      title: "Transferencia de Conocimiento",
      description: "Compartimos metodologías, herramientas y aprendizajes validados"
    },
    {
      icon: Globe,
      title: "Alcance Regional",
      description: "Conectamos actores locales con oportunidades y recursos globales"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-orange-900 to-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Handshake className="h-16 w-16 mx-auto mb-6 text-orange-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestras Alianzas Estratégicas
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
              Colaboramos con organizaciones internacionales, gobiernos, universidades y ONGs para multiplicar el impacto de la innovación responsable en América Latina.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-orange-200" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-orange-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué trabajar con Hemispher-IA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestras alianzas se basan en confianza, transparencia y compromiso con el impacto medible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-500 flex-shrink-0" />
            {partnerTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className={`whitespace-nowrap ${
                  selectedType === type
                    ? "bg-orange-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="py-12 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Aliados Destacados
            </h2>
            <Star className="h-6 w-6 text-orange-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.filter(p => p.featured).map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow border-t-4 border-t-orange-600">
                  <CardHeader className="text-center">
                    <div className="mb-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-20 mx-auto object-contain"
                      />
                    </div>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-2">
                      <MapPin className="h-4 w-4" />
                      {partner.country}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm">{partner.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {partner.areas.map((area, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded"
                        >
                          {area}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        {partner.projects} proyectos
                      </div>
                      <div className="text-xs text-gray-500">
                        Desde {partner.since}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Partners */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedType === "Todos" ? "Todos los Aliados" : selectedType}
            <span className="text-gray-500 text-lg ml-3">
              ({filteredPartners.length})
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {partner.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {partner.type}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {partner.country}
                              </span>
                            </div>
                          </div>
                          {partner.featured && (
                            <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-3">{partner.description}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {partner.areas.map((area, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {area}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                              {partner.projects} proyectos
                            </span>
                            <span>Aliados desde {partner.since}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-orange-700">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-900 to-red-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Handshake className="h-16 w-16 mx-auto mb-6 text-orange-200" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Interesado en colaborar con nosotros?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Estamos abiertos a nuevas alianzas estratégicas con organizaciones comprometidas con la innovación responsable y el impacto social en América Latina.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Building2 className="h-8 w-8 mx-auto mb-3 text-orange-200" />
                <h3 className="font-bold mb-2">Organizaciones</h3>
                <p className="text-sm text-orange-100">ONGs, fundaciones y organismos internacionales</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="h-8 w-8 mx-auto mb-3 text-orange-200" />
                <h3 className="font-bold mb-2">Gobiernos</h3>
                <p className="text-sm text-orange-100">Entidades públicas y ministerios</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Globe className="h-8 w-8 mx-auto mb-3 text-orange-200" />
                <h3 className="font-bold mb-2">Universidades</h3>
                <p className="text-sm text-orange-100">Instituciones académicas y centros de investigación</p>
              </div>
            </div>

            <Button size="lg" className="bg-white text-orange-900 hover:bg-orange-50">
              <Mail className="h-5 w-5 mr-2" />
              Contactar para Alianzas
            </Button>
          </motion.div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default AlianzasPage;
