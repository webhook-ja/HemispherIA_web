"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Tag,
  Search,
  TrendingUp,
  MessageCircle,
  Heart,
  Share2,
  ArrowRight,
  Eye
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Todos",
    "Inteligencia Artificial",
    "Comunicación Digital",
    "Innovación Social",
    "Casos de Éxito",
    "Opinión"
  ];

  const blogPosts = [
    {
      id: 1,
      title: "El futuro de la IA en políticas públicas latinoamericanas",
      excerpt: "Exploramos cómo los gobiernos de la región están adoptando inteligencia artificial para mejorar servicios públicos, desde salud hasta educación.",
      category: "Inteligencia Artificial",
      author: "Wolfgang Friedl",
      date: "2024-12-01",
      readTime: "8 min",
      image: "/images/hemispher-ia-desarrollo-web-01.jpeg",
      tags: ["IA", "Políticas Públicas", "LAC"],
      views: 2340,
      likes: 156,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: "Knowledge Brokering: El arte de conectar conocimiento disperso",
      excerpt: "¿Cómo transformar datos aislados en conocimiento útil? Descubre metodologías prácticas de intermediación que están revolucionando la innovación social.",
      category: "Innovación Social",
      author: "Erika Martínez",
      date: "2024-11-28",
      readTime: "6 min",
      image: "/images/hemispher-ia-desarrollo-web-02.jpeg",
      tags: ["Knowledge Brokering", "Innovación", "Metodología"],
      views: 1890,
      likes: 124,
      comments: 18,
      featured: true
    },
    {
      id: 3,
      title: "5 claves para campañas de influencers con impacto social real",
      excerpt: "El marketing de influencia va más allá de likes y views. Te compartimos lecciones de campañas exitosas en salud, clima y derechos humanos.",
      category: "Comunicación Digital",
      author: "Jorge Acuña",
      date: "2024-11-20",
      readTime: "7 min",
      image: "/images/hemispher-ia-desarrollo-web-03.jpeg",
      tags: ["Influencers", "Impacto Social", "Marketing"],
      views: 3120,
      likes: 287,
      comments: 42,
      featured: false
    },
    {
      id: 4,
      title: "Caso de estudio: IA para salud materna en Colombia",
      excerpt: "Cómo un piloto de inteligencia artificial está mejorando el acceso a servicios de salud en comunidades rurales del Pacífico colombiano.",
      category: "Casos de Éxito",
      author: "Equipo Hemispher-IA",
      date: "2024-11-15",
      readTime: "10 min",
      image: "/images/ertd.jpeg",
      tags: ["Salud", "IA", "Colombia"],
      views: 1560,
      likes: 201,
      comments: 31,
      featured: false
    },
    {
      id: 5,
      title: "La ética de la IA: Más allá del discurso corporativo",
      excerpt: "Reflexión crítica sobre gobernanza de IA en América Latina. ¿Estamos realmente priorizando los derechos humanos o solo seguimos tendencias globales?",
      category: "Opinión",
      author: "Wolfgang Friedl",
      date: "2024-11-08",
      readTime: "9 min",
      tags: ["Ética", "IA", "Opinión"],
      views: 2780,
      likes: 342,
      comments: 67,
      featured: false
    },
    {
      id: 6,
      title: "Comunicación climática: Lecciones de activistas jóvenes de LAC",
      excerpt: "Jóvenes de Brasil, Argentina y Chile están liderando narrativas innovadoras sobre cambio climático. Esto es lo que podemos aprender de ellos.",
      category: "Comunicación Digital",
      author: "Jorge Acuña",
      date: "2024-10-25",
      readTime: "6 min",
      tags: ["Clima", "Juventud", "Comunicación"],
      views: 2150,
      likes: 198,
      comments: 29,
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(p => p.featured);
  const stats = [
    { label: "Artículos publicados", value: "48+", icon: BookOpen },
    { label: "Lectores mensuales", value: "12K+", icon: Eye },
    { label: "Autores colaboradores", value: "20+", icon: User },
    { label: "Países que nos leen", value: "30+", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-green-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog Hemispher-IA
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Reflexiones, análisis y aprendizajes sobre inteligencia artificial, comunicación estratégica e innovación social en América Latina.
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
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-green-200" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-green-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-8 bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículos, temas, autores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-green-900 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "Todos" && searchTerm === "" && (
        <section className="py-12 bg-gradient-to-r from-green-50 to-teal-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Artículos Destacados
              </h2>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-shadow group cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                        {post.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-4 bg-green-900 hover:bg-green-800">
                        Leer artículo
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === "Todos" ? "Todos los artículos" : selectedCategory}
            <span className="text-gray-500 text-lg ml-3">
              ({filteredPosts.length})
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  {post.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white text-green-900 text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {post.comments}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800">
                        Leer más
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron artículos
              </h3>
              <p className="text-gray-500">
                Intenta con otros términos de búsqueda o categorías
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-green-900 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-green-200" />
            <h2 className="text-3xl font-bold mb-4">
              Recibe nuestros últimos artículos
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Suscríbete al newsletter y mantente al día con análisis, reflexiones y casos de estudio sobre IA e innovación social
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <Button className="bg-white text-green-900 hover:bg-green-50 px-8">
                Suscribirse
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedFooter />
    </div>
  );
};

export default BlogPage;
