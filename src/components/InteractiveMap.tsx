import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Datos de proyectos reales de Hemispher-IA
const proyectos = [
  {
    nombre: "IA para monitoreo de salud materna",
    pais: "Colombia",
    ciudad: "Zonas rurales",
    lat: 4.5709,
    lng: -74.2973,
    descripcion: "Proyecto piloto en comunidades rurales de Colombia para mejorar el acceso a servicios de salud materna mediante IA predictiva.",
    impacto: "35% mejora en indicadores de salud",
    estado: "Activo",
    tags: ["Salud", "IA", "Rural"]
  },
  {
    nombre: "Redes de influencers por la acción climática juvenil",
    pais: "Brasil",
    ciudad: "São Paulo",
    lat: -23.5505,
    lng: -46.6333,
    descripcion: "Colaboración con jóvenes activistas digitales en Brasil para promover acciones climáticas sostenibles.",
    impacto: "2M de personas alcanzadas",
    estado: "En progreso",
    tags: ["Clima", "Juventud", "Influencers"]
  },
  {
    nombre: "Redes de influencers por la acción climática juvenil",
    pais: "Argentina",
    ciudad: "Buenos Aires",
    lat: -34.6037,
    lng: -58.3816,
    descripcion: "Colaboración con jóvenes activistas digitales en Argentina para promover acciones climáticas sostenibles.",
    impacto: "2M de personas alcanzadas",
    estado: "En progreso",
    tags: ["Clima", "Juventud", "Influencers"]
  },
  {
    nombre: "Mapeo de conocimiento en políticas migratorias del Darién",
    pais: "Panamá",
    ciudad: "Región del Darién",
    lat: 8.4384,
    lng: -77.5362,
    descripcion: "Análisis de información y actores clave en la región del Darién para mejorar políticas migratorias.",
    impacto: "15 informes de política generados",
    estado: "Completado",
    tags: ["Migración", "Política", "Darién"]
  },
  {
    nombre: "Mapeo de conocimiento en políticas migratorias del Darién",
    pais: "Colombia",
    ciudad: "Frontera con Panamá",
    lat: 7.8939,
    lng: -77.3642,
    descripcion: "Análisis de información y actores clave para mejorar políticas migratorias en la frontera.",
    impacto: "15 informes de política generados",
    estado: "Completado",
    tags: ["Migración", "Política", "Darién"]
  },
  {
    nombre: "Plataforma de educación financiera para comunidades indígenas",
    pais: "Perú",
    ciudad: "Lima",
    lat: -12.0464,
    lng: -77.0428,
    descripcion: "Desarrollo de una plataforma accesible para educación financiera adaptada a contextos indígenas.",
    impacto: "5,000 usuarios activos",
    estado: "Activo",
    tags: ["Finanzas", "Indígenas", "Educación"]
  },
  {
    nombre: "Plataforma de educación financiera para comunidades indígenas",
    pais: "Ecuador",
    ciudad: "Quito",
    lat: -0.1807,
    lng: -78.4678,
    descripcion: "Desarrollo de una plataforma accesible para educación financiera adaptada a contextos indígenas.",
    impacto: "5,000 usuarios activos",
    estado: "Activo",
    tags: ["Finanzas", "Indígenas", "Educación"]
  },
  {
    nombre: "Plataforma de Monitoreo de Salud Pública",
    pais: "México",
    ciudad: "Ciudad de México",
    lat: 19.4326,
    lng: -99.1332,
    descripcion: "Sistema de IA para predecir brotes epidemiológicos en zonas urbanas.",
    impacto: "Reducción 40% en tiempo de respuesta",
    estado: "En progreso",
    tags: ["Salud", "IA", "Epidemiología"]
  },
  {
    nombre: "IA para Gestión de Recursos Hídricos",
    pais: "Colombia",
    ciudad: "Bogotá",
    lat: 4.7110,
    lng: -74.0721,
    descripcion: "Modelo predictivo para sequías en la región andina.",
    impacto: "85% precisión en predicciones",
    estado: "Activo",
    tags: ["Agua", "IA", "Sostenibilidad"]
  },
  {
    nombre: "Asistente Virtual para Educación Rural",
    pais: "Perú",
    ciudad: "Región Amazónica",
    lat: -9.1900,
    lng: -75.0152,
    descripcion: "Chatbot educativo en quechua y español para escuelas remotas.",
    impacto: "3,200 estudiantes beneficiados",
    estado: "Activo",
    tags: ["Educación", "IA", "Multilingüe"]
  },
  {
    nombre: "Análisis de Riesgo Climático en Zonas Costeras",
    pais: "República Dominicana",
    ciudad: "Santo Domingo",
    lat: 18.4861,
    lng: -69.9312,
    descripcion: "Modelo de IA para prevenir inundaciones en comunidades costeras.",
    impacto: "12 comunidades protegidas",
    estado: "Completado",
    tags: ["Clima", "IA", "Prevención"]
  },
  {
    nombre: "Optimización de Redes Eléctricas con IA",
    pais: "Chile",
    ciudad: "Santiago",
    lat: -33.4489,
    lng: -70.6693,
    descripcion: "Sistema de gestión inteligente para energías renovables.",
    impacto: "30% mejora en eficiencia",
    estado: "Activo",
    tags: ["Energía", "IA", "Renovables"]
  }
];

const InteractiveMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Inicializar el mapa centrado en América Latina
    const map = L.map(mapRef.current, {
      center: [-8, -60],
      zoom: 4,
      minZoom: 3,
      maxZoom: 18,
      zoomControl: true,
      scrollWheelZoom: true,
      maxBounds: [[-60, -120], [35, -30]], // Limita el área visible a América Latina
      maxBoundsViscosity: 0.8
    });

    mapInstanceRef.current = map;

    // Capa base con estilo personalizado
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Colores por estado del proyecto
    const estadoColores: Record<string, string> = {
      'Activo': '#10b981',
      'En progreso': '#f59e0b',
      'Completado': '#3b82f6'
    };

    // Agregar marcadores con animación
    proyectos.forEach((proyecto, index) => {
      setTimeout(() => {
        // Crear icono personalizado con HTML
        const iconHtml = `
          <div class="custom-marker" style="
            background: ${estadoColores[proyecto.estado]};
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            animation: bounce 2s ease-in-out infinite;
          ">
            <span style="
              transform: rotate(45deg);
              color: white;
              font-weight: bold;
              font-size: 14px;
            ">H</span>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: iconHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        // Contenido del popup
        const popupContent = `
          <div style="min-width: 280px; font-family: 'Segoe UI', sans-serif;">
            <div style="
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
              color: white;
              padding: 12px;
              margin: -15px -20px 12px -20px;
              border-radius: 8px 8px 0 0;
            ">
              <h3 style="margin: 0; font-size: 16px; font-weight: bold;">${proyecto.nombre}</h3>
            </div>
            <div style="padding: 0 4px;">
              <div style="display: flex; align-items: center; margin-bottom: 8px; color: #6b7280;">
                <svg style="width: 16px; height: 16px; margin-right: 6px;" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
                <small style="font-size: 14px;">${proyecto.ciudad}, ${proyecto.pais}</small>
              </div>
              <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin: 8px 0;">${proyecto.descripcion}</p>
              <div style="
                background: ${estadoColores[proyecto.estado]}15;
                color: ${estadoColores[proyecto.estado]};
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 13px;
                font-weight: 600;
                margin-top: 12px;
                display: inline-block;
              ">
                ${proyecto.impacto}
              </div>
              <div style="
                margin-top: 8px;
                padding: 6px 10px;
                background: #f3f4f6;
                border-radius: 6px;
                font-size: 12px;
                color: #6b7280;
                display: inline-block;
              ">
                Estado: <strong style="color: ${estadoColores[proyecto.estado]}">${proyecto.estado}</strong>
              </div>
            </div>
          </div>
        `;

        const marker = L.marker([proyecto.lat, proyecto.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent, {
            maxWidth: 320,
            className: 'custom-popup',
            closeButton: true,
            autoClose: true
          });
      }, index * 150); // Animación escalonada
    });

    // Agregar estilos personalizados para animaciones
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bounce {
        0%, 100% { transform: rotate(-45deg) translateY(0); }
        50% { transform: rotate(-45deg) translateY(-10px); }
      }
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        padding: 0;
      }
      .custom-popup .leaflet-popup-tip {
        background: white;
      }
      .leaflet-popup-content {
        margin: 15px 20px;
      }
      .custom-marker:hover {
        transform: rotate(-45deg) scale(1.2);
        transition: transform 0.3s ease;
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div
        ref={mapRef}
        className="w-full rounded-2xl shadow-2xl overflow-hidden border-4 border-white"
        style={{ height: '600px' }}
      />

      {/* Leyenda */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-6 left-6 bg-white rounded-xl shadow-xl p-4 z-[1000]"
      >
        <h4 className="font-bold text-gray-900 mb-3 text-sm">Estado de Proyectos</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-gray-700">Activo</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-xs text-gray-700">En progreso</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-xs text-gray-700">Completado</span>
          </div>
        </div>
      </motion.div>

      {/* Contador de proyectos */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-6 right-6 bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-xl shadow-xl p-4 z-[1000]"
      >
        <div className="text-center">
          <div className="text-3xl font-bold">{proyectos.length}</div>
          <div className="text-xs text-blue-200">Ubicaciones</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InteractiveMap;
