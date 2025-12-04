"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  Tag,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  ArrowLeft,
  BookOpen,
  TrendingUp,
  Quote
} from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import AnimatedFooter from "@/components/AnimatedFooter";
import { useNavigate } from "react-router-dom";

const BlogPostPage = () => {
  const navigate = useNavigate();

  const article = {
    id: 1,
    title: "El futuro de la IA en políticas públicas latinoamericanas",
    excerpt: "Exploramos cómo los gobiernos de la región están adoptando inteligencia artificial para mejorar servicios públicos, desde salud hasta educación.",
    category: "Inteligencia Artificial",
    author: {
      name: "Wolfgang Friedl",
      role: "Director y Fundador",
      avatar: "/team/wolfgang-friedl.jpg"
    },
    date: "2024-12-01",
    readTime: "8 min",
    image: "/images/hemispher-ia-desarrollo-web-01.jpeg",
    tags: ["IA", "Políticas Públicas", "LAC"],
    views: 2340,
    likes: 156,
    comments: 23
  };

  const content = {
    introduction: "La inteligencia artificial (IA) está transformando radicalmente la manera en que los gobiernos latinoamericanos diseñan, implementan y evalúan políticas públicas. Desde la optimización de servicios de salud hasta la mejora en la distribución de recursos educativos, la IA se está convirtiendo en un aliado estratégico para enfrentar los desafíos más apremiantes de la región.",

    sections: [
      {
        heading: "El panorama actual: casos de éxito en América Latina",
        content: "En los últimos tres años, hemos visto una adopción acelerada de tecnologías de IA en gobiernos de toda la región. Brasil lidera con iniciativas en predic ción de demanda hospitalaria, Colombia experimenta con IA para monitoreo de salud materna en zonas rurales, y Chile implementa chatbots gubernamentales para trámites ciudadanos.",
        highlight: "La adopción de IA en gobiernos latinoamericanos creció un 127% entre 2021 y 2024."
      },
      {
        heading: "Salud pública: el sector con mayor impacto",
        content: "El sector salud ha sido el principal beneficiario de soluciones de IA en la región. Algoritmos de machine learning están ayudando a predecir brotes de dengue en Argentina, optimizar turnos hospitalarios en México, y detectar tempranamente casos de tuberculosis en Perú mediante análisis de imágenes médicas.",
        bullets: [
          "Predicción de demanda hospitalaria con 85% de precisión",
          "Reducción del 40% en tiempos de espera para diagnósticos",
          "Detección temprana de enfermedades con precisión superior al 90%",
          "Optimización de rutas de ambulancias reduciendo tiempos de respuesta en 25%"
        ]
      },
      {
        heading: "Educación: personalización a escala",
        content: "Los ministerios de educación están explorando sistemas de IA para personalizar el aprendizaje, identificar estudiantes en riesgo de deserción, y optimizar la asignación de recursos. Uruguay lidera con su plataforma adaptativa de matemáticas que ajusta el contenido según el nivel de cada estudiante.",
        quote: {
          text: "La IA nos permite por primera vez ofrecer educación verdaderamente personalizada a millones de estudiantes simultáneamente.",
          author: "Ministerio de Educación, Uruguay"
        }
      },
      {
        heading: "Desafíos éticos y de gobernanza",
        content: "Sin embargo, la implementación de IA en políticas públicas no está exenta de desafíos. La privacidad de datos, los sesgos algorítmicos, y la falta de marcos regulatorios claros son preocupaciones constantes. Países como Argentina y México han comenzado a desarrollar sus propios marcos de IA ética, inspirándose en regulaciones europeas pero adaptándolas al contexto latinoamericano.",
        callout: {
          type: "warning",
          text: "Es fundamental que la adopción de IA en gobiernos priorice la transparencia, la rendición de cuentas y la participación ciudadana."
        }
      },
      {
        heading: "El papel de los knowledge brokers",
        content: "En Hemispher-IA, hemos observado que el éxito de proyectos de IA gubernamental depende críticamente de la intermediación efectiva entre desarrolladores tecnológicos, funcionarios públicos y comunidades afectadas. Los knowledge brokers juegan un rol esencial en traducir capacidades técnicas a necesidades de política pública real.",
        bullets: [
          "Facilitar diálogo entre técnicos y tomadores de decisiones",
          "Adaptar soluciones globales a contextos locales",
          "Garantizar que la tecnología responda a necesidades reales de ciudadanos",
          "Monitorear y evaluar impacto de implementaciones"
        ]
      },
      {
        heading: "Mirando hacia el futuro",
        content: "Los próximos cinco años serán decisivos. Esperamos ver consolidación de marcos regulatorios, mayor inversión en infraestructura de datos, y colaboración regional más robusta. La creación de datasets públicos interoperables y el desarrollo de capacidades técnicas en el sector público serán claves para un futuro donde la IA realmente empodere a los gobiernos latinoamericanos.",
        predictions: [
          {
            year: "2025",
            trend: "Consolidación de marcos de IA ética nacionales"
          },
          {
            year: "2026",
            trend: "Primeras redes regionales de datos públicos"
          },
          {
            year: "2027",
            trend: "IA integrada en 70% de servicios públicos digitales"
          }
        ]
      }
    ],

    conclusion: "La IA tiene el potencial de revolucionar las políticas públicas en América Latina, pero su éxito dependerá de nuestra capacidad para implementarla de manera ética, inclusiva y contextualmente relevante. Como región, tenemos la oportunidad de liderar globalmente en IA social y responsable."
  };

  const relatedArticles = [
    {
      id: 2,
      title: "Knowledge Brokering: El arte de conectar conocimiento disperso",
      category: "Innovación Social",
      image: "/images/hemispher-ia-desarrollo-web-02.jpeg"
    },
    {
      id: 4,
      title: "Caso de estudio: IA para salud materna en Colombia",
      category: "Casos de Éxito",
      image: "/images/ertd.jpeg"
    },
    {
      id: 5,
      title: "La ética de la IA: Más allá del discurso corporativo",
      category: "Opinión",
      image: "/images/hemispher-ia-desarrollo-web-01.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AnimatedNavbar />

      {/* Back Button */}
      <section className="pt-24 pb-6 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/blog')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al blog
          </Button>
        </div>
      </section>

      {/* Article Header */}
      <article className="pb-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="bg-green-100 text-green-800 text-sm px-4 py-1.5 rounded-full font-medium">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{article.author.name}</div>
                  <div className="text-sm text-gray-600">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 ml-auto">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {article.views}
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {article.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {article.comments}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </article>

      {/* Featured Image */}
      <section className="pb-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-lg text-gray-700 leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-green-700 first-letter:mr-2 first-letter:float-left">
              {content.introduction}
            </p>
          </motion.div>

          {/* Content Sections */}
          {content.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                {section.heading}
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {section.content}
              </p>

              {section.highlight && (
                <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-l-green-500 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-800 font-medium">{section.highlight}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {section.bullets && (
                <ul className="space-y-3 mb-6">
                  {section.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.quote && (
                <Card className="bg-gray-900 text-white mb-6">
                  <CardContent className="p-8">
                    <Quote className="h-10 w-10 text-green-400 mb-4" />
                    <p className="text-xl italic mb-4">{section.quote.text}</p>
                    <p className="text-gray-300 text-sm">— {section.quote.author}</p>
                  </CardContent>
                </Card>
              )}

              {section.callout && (
                <Card className="bg-amber-50 border-l-4 border-l-amber-500 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        ⚠️
                      </div>
                      <p className="text-gray-800">{section.callout.text}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {section.predictions && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {section.predictions.map((pred, idx) => (
                    <Card key={idx} className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold mb-2">{pred.year}</div>
                        <div className="text-sm">{pred.trend}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* Conclusion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-r from-green-900 to-teal-900 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Conclusión</h3>
                <p className="text-lg leading-relaxed text-green-50">
                  {content.conclusion}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Share Buttons */}
          <div className="flex items-center justify-between py-8 border-y border-gray-200">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Me gusta ({article.likes})
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Comentar ({article.comments})
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Artículos relacionados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related, index) => (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => navigate('/blog')}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-gray-900 text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-gray-900 line-clamp-2 hover:text-green-700 transition-colors">
                      {related.title}
                    </h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
              No te pierdas nuestros próximos artículos
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Suscríbete al newsletter y recibe análisis profundos sobre IA e innovación social
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

export default BlogPostPage;
