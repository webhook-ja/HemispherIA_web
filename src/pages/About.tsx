"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Target,
  Globe,
  Award,
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const AboutPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const teamMembers = [
    {
      name: "Wolfgang Friedl",
      role: "Director y Fundador",
      location: "Ciudad de Panamá",
      photo: "/team/wolfgang-friedl.jpg",
      photoPosition: "center center",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      name: "Erika Martínez Xiques",
      role: "Secretaria Ejecutiva",
      location: "Ciudad de Panamá",
      photo: "/team/erika-martinez.jpg",
      photoPosition: "center center",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Alberto Chavarria",
      role: "Asistente de Logística y Servicios Generales",
      location: "Ciudad de Panamá",
      photo: "/team/alberto-chavarria.jpg",
      photoPosition: "center 65%",
      gradient: "from-green-600 to-teal-600"
    },
    {
      name: "Jorge Acuña R",
      role: "Asociado de Alianzas / Consulting & AI Developer",
      location: "Madrid",
      photo: "/team/jorge-acuna.jpg",
      photoPosition: "center center",
      gradient: "from-orange-600 to-red-600"
    }
  ];

  const stats = [
    { value: "15+", label: "Años de Experiencia" },
    { value: "50+", label: "Proyectos Completados" },
    { value: "25+", label: "Países Alcanzados" },
    { value: "200+", label: "Aliados Estratégicos" }
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
                Líderes en Innovación Responsable con Enfoque Latinoamericano
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Conectamos conocimiento, talento y tecnología para un futuro sostenible en América Latina y el Caribe.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-blue-900 border-white hover:bg-blue-800 hover:text-white"
              >
                Descargar Nuestra Visión
              </Button>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-video bg-blue-900 rounded-2xl overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onClick={toggleVideo}
                  poster="/images/hemispher-ia-desarrollo-web-01.jpeg"
                >
                  <source src="/videos/institucional.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>

                {/* Play/Pause Overlay - solo visible cuando el video está pausado */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer" onClick={toggleVideo}>
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Play className="h-10 w-10 text-blue-900 ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Control button in corner */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full"
                onClick={toggleVideo}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Filosofía</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En el corazón de Hemispher-IA está el Knowledge Brokering: el arte de conectar conocimiento disperso, comunidades diversas y oportunidades tecnológicas para generar impacto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full border-l-4 border-l-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-800">
                    <Target className="mr-2 h-5 w-5" />
                    Visión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Ser el principal nodo de conocimiento y colaboración en IA ética, comunicación y desarrollo sostenible de la región.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Innovación", "Ética", "Sostenibilidad", "Colaboración"].map((item, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full border-l-4 border-l-green-600">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <Globe className="mr-2 h-5 w-5" />
                    Misión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Facilitar la adopción inteligente de tecnologías emergentes y la movilización de talento para resolver desafíos sociales, ambientales y económicos.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Tecnología", "Impacto", "Conocimiento", "Talento"].map((item, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Equipo Directivo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Liderado por expertos en comunicación, IA, desarrollo y alianzas internacionales, nuestro equipo integra perspectivas locales y globales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(-1)}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-2xl">
                  {/* Foto de perfil */}
                  <div className="relative pt-12 pb-8 px-6">
                    <div className="relative mx-auto w-32 h-32">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-white"
                        style={{ objectPosition: member.photoPosition }}
                      />
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      {activeCard === index && (
                        <motion.div
                          className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-md"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Award className="h-5 w-5 text-yellow-900" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Información */}
                  <div className="px-6 pb-8 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-3 min-h-[2.5rem]">{member.role}</p>
                    <div className="flex items-center justify-center text-gray-500 text-sm">
                      <Globe className="h-4 w-4 mr-1" />
                      <span>{member.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Principios que guían nuestro trabajo y relaciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Innovación Responsable", description: "Impulsamos soluciones tecnológicas que respeten la ética y promuevan el bienestar social.", icon: "🔬" },
              { title: "Colaboración", description: "Creemos en el poder de las redes y alianzas estratégicas para generar impacto sostenible.", icon: "🤝" },
              { title: "Inclusión", description: "Trabajamos para que todas las comunidades tengan acceso a las oportunidades de la transformación digital.", icon: "🌍" }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-blue-100">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default AboutPage;