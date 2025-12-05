"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Mail
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const AboutPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const teamMembers = [
    {
      name: "Wolfgang Friedl",
      role: "Director y Fundador",
      location: "Ciudad de Panamá",
      email: "wolfgang.friedl@hemispher-ia.org",
      photo: "/team/wolfgang-friedl.jpg",
      photoPosition: "center center",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      name: "Erika Martínez Xiques",
      role: "Secretaria Ejecutiva",
      location: "Ciudad de Panamá",
      email: "erika.martinez@hemispher-ia.org",
      photo: "/team/erika-martinez.jpg",
      photoPosition: "center center",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Alberto Chavarria",
      role: "Asistente de Logística y Servicios Generales",
      location: "Ciudad de Panamá",
      email: "alberto.chavarria@hemispher-ia.org",
      photo: "/images/hemispher-ia-desarrollo-web-20.jpeg",
      photoPosition: "center center",
      gradient: "from-green-600 to-teal-600"
    },
    {
      name: "Jorge Acuña R",
      role: "Asociado de Alianzas / Consulting & AI Developer",
      location: "Madrid",
      email: "jorge.acuna@hemispher-ia.org",
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
              <div
                className="relative aspect-video bg-blue-900 rounded-2xl overflow-hidden shadow-2xl group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={toggleVideo}
                >
                  <source src="/videos/institucional.mp4" type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>

                {/* Logo and Play Overlay - solo visible cuando el video está pausado */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90 flex flex-col items-center justify-center cursor-pointer" onClick={toggleVideo}>
                    <img
                      src="/logo.jpeg"
                      alt="Hemispher-IA Logo"
                      className="w-48 h-auto mb-8 rounded-lg shadow-2xl"
                    />
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                      <Play className="h-10 w-10 text-blue-900 ml-1" />
                    </div>
                  </div>
                )}

                {/* Custom Video Controls - aparecen al hacer hover */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`
                      }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {/* Play/Pause Button */}
                      <button
                        onClick={toggleVideo}
                        className="text-white hover:text-blue-400 transition-colors"
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </button>

                      {/* Volume Controls */}
                      <div className="flex items-center space-x-2 group/volume">
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-0 group-hover/volume:w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer transition-all duration-300"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`
                          }}
                        />
                      </div>

                      {/* Time Display */}
                      <span className="text-white text-sm font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Fullscreen Button */}
                    <button
                      onClick={toggleFullscreen}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      <Maximize className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              En el corazón de Hemispher-IA está el Knowledge Brokering: el arte de conectar conocimiento disperso, comunidades diversas y oportunidades tecnológicas para generar impacto.
            </p>
            {/* Imagen de Nuestra Filosofía */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/Nuestra Filosofía.jpeg"
                alt="Nuestra Filosofía"
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full border-l-4 border-l-blue-800 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/Visión y Misión.jpeg"
                    alt="Visión"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                </div>
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
              <Card className="h-full border-l-4 border-l-green-600 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/images/Visión y Misión.jpeg"
                    alt="Misión"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
                </div>
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Liderado por expertos en comunicación, IA, desarrollo y alianzas internacionales, nuestro equipo integra perspectivas locales y globales.
            </p>
            {/* Imagen de Nuestro Equipo */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="/images/Nuestro Equipo.jpeg"
                alt="Nuestro Equipo"
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
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
                    <div className="space-y-2">
                      <div className="flex items-center justify-center text-gray-500 text-sm">
                        <Globe className="h-4 w-4 mr-1" />
                        <span>{member.location}</span>
                      </div>
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center justify-center text-blue-600 text-sm hover:text-blue-800 transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{member.email}</span>
                      </a>
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

      {/* Strategic Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Socios Estratégicos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Colaboramos con universidades, startups, organismos internacionales y redes de innovación que comparten nuestra visión de una región más equitativa y tecnológicamente preparada.
            </p>
          </div>

          {/* Imagen principal de Socios Estratégicos */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/Socios Estratégicos.jpeg"
              alt="Socios Estratégicos"
              className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl"
            />
          </motion.div>

          {/* Descripción adicional */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-semibold text-blue-900">Alianzas sólidas</span> que amplían nuestro alcance y potencian el impacto de nuestras soluciones. Trabajamos codo a codo con instituciones que comparten nuestro compromiso con la <span className="font-semibold text-green-700">innovación responsable</span> y el <span className="font-semibold text-indigo-700">desarrollo sostenible</span> de América Latina y el Caribe.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default AboutPage;