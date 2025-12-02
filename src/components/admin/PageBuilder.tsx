"use client";

import React, { useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Eye, ArrowLeft, Plus, Settings, Trash2 } from "lucide-react";

interface Page {
  id?: number;
  slug: string;
  title: string;
  html?: string;
  css?: string;
  components?: object;
  styles?: object;
  is_published?: boolean;
}

interface Block {
  id: number;
  name: string;
  category: string;
  label: string;
  content: string;
  media?: string;
}

const PageBuilder: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Editor | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [customBlocks, setCustomBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPageDialog, setShowNewPageDialog] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState("");
  const [newPageSlug, setNewPageSlug] = useState("");
  const { toast } = useToast();

  // Fetch pages and blocks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pagesRes, blocksRes] = await Promise.all([
          fetch("/api/pages"),
          fetch("/api/blocks"),
        ]);

        if (pagesRes.ok) {
          const pagesData = await pagesRes.json();
          setPages(pagesData);
        }

        if (blocksRes.ok) {
          const blocksData = await blocksRes.json();
          setCustomBlocks(blocksData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Initialize GrapeJS editor
  useEffect(() => {
    if (!editorRef.current || editor) return;

    const gjsEditor = grapesjs.init({
      container: editorRef.current,
      height: "calc(100vh - 120px)",
      width: "auto",
      fromElement: false,
      storageManager: false,

      // Canvas configuration
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css",
        ],
      },

      // Style manager configuration
      styleManager: {
        sectors: [
          {
            name: "General",
            open: true,
            buildProps: ["float", "display", "position", "top", "right", "left", "bottom"],
          },
          {
            name: "Dimensiones",
            open: false,
            buildProps: ["width", "height", "max-width", "min-height", "margin", "padding"],
          },
          {
            name: "Tipografia",
            open: false,
            buildProps: ["font-family", "font-size", "font-weight", "letter-spacing", "color", "line-height", "text-align", "text-decoration", "text-shadow"],
          },
          {
            name: "Decoraciones",
            open: false,
            buildProps: ["background-color", "border-radius", "border", "box-shadow", "background"],
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["opacity", "transition", "transform"],
          },
        ],
      },

      // Device manager
      deviceManager: {
        devices: [
          { name: "Desktop", width: "" },
          { name: "Tablet", width: "768px", widthMedia: "992px" },
          { name: "Mobile", width: "320px", widthMedia: "480px" },
        ],
      },

      // Panels configuration
      panels: {
        defaults: [
          {
            id: "panel-devices",
            el: ".panel__devices",
            buttons: [
              { id: "device-desktop", label: '<svg viewBox="0 0 24 24" width="20" height="20"><rect x="2" y="3" width="20" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2"/><line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2"/></svg>', command: "set-device-desktop", active: true, togglable: false },
              { id: "device-tablet", label: '<svg viewBox="0 0 24 24" width="20" height="20"><rect x="4" y="2" width="16" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="18" x2="12" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>', command: "set-device-tablet", togglable: false },
              { id: "device-mobile", label: '<svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="2" width="12" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="18" x2="12" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>', command: "set-device-mobile", togglable: false },
            ],
          },
        ],
      },

      // Block manager
      blockManager: {
        appendTo: "#blocks-container",
        blocks: [
          {
            id: "section",
            label: "Section",
            category: "Layout",
            content: '<section class="py-16 px-4"><div class="container mx-auto">Contenido de la seccion</div></section>',
            media: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" fill="#e5e7eb" rx="2"/></svg>',
          },
          {
            id: "container",
            label: "Container",
            category: "Layout",
            content: '<div class="container mx-auto px-4">Contenido</div>',
            media: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="none" stroke="#374151" stroke-width="2" stroke-dasharray="4"/></svg>',
          },
          {
            id: "columns-2",
            label: "2 Columnas",
            category: "Layout",
            content: '<div class="grid grid-cols-2 gap-4"><div class="p-4 bg-gray-100 rounded">Columna 1</div><div class="p-4 bg-gray-100 rounded">Columna 2</div></div>',
            media: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="9" height="16" fill="#e5e7eb"/><rect x="13" y="4" width="9" height="16" fill="#e5e7eb"/></svg>',
          },
          {
            id: "columns-3",
            label: "3 Columnas",
            category: "Layout",
            content: '<div class="grid grid-cols-3 gap-4"><div class="p-4 bg-gray-100 rounded">Col 1</div><div class="p-4 bg-gray-100 rounded">Col 2</div><div class="p-4 bg-gray-100 rounded">Col 3</div></div>',
            media: '<svg viewBox="0 0 24 24"><rect x="1" y="4" width="6" height="16" fill="#e5e7eb"/><rect x="9" y="4" width="6" height="16" fill="#e5e7eb"/><rect x="17" y="4" width="6" height="16" fill="#e5e7eb"/></svg>',
          },
          {
            id: "heading",
            label: "Titulo",
            category: "Basic",
            content: '<h2 class="text-3xl font-bold text-gray-900">Tu titulo aqui</h2>',
            media: '<svg viewBox="0 0 24 24"><text x="4" y="16" font-size="14" font-weight="bold">H</text></svg>',
          },
          {
            id: "paragraph",
            label: "Parrafo",
            category: "Basic",
            content: '<p class="text-gray-600 leading-relaxed">Tu texto aqui. Puedes escribir todo lo que necesites en este parrafo.</p>',
            media: '<svg viewBox="0 0 24 24"><text x="4" y="16" font-size="14">P</text></svg>',
          },
          {
            id: "image",
            label: "Imagen",
            category: "Basic",
            content: '<img src="https://via.placeholder.com/800x400" alt="Imagen" class="w-full rounded-lg shadow-md"/>',
            media: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" fill="#e5e7eb" rx="2"/><circle cx="8" cy="10" r="2" fill="#9ca3af"/><path d="M22 18L16 12L10 18" fill="#9ca3af"/></svg>',
          },
          {
            id: "button",
            label: "Boton",
            category: "Basic",
            content: '<button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition">Boton</button>',
            media: '<svg viewBox="0 0 24 24"><rect x="2" y="8" width="20" height="8" fill="#3b82f6" rx="4"/></svg>',
          },
          {
            id: "link",
            label: "Enlace",
            category: "Basic",
            content: '<a href="#" class="text-blue-600 hover:text-blue-800 underline">Enlace</a>',
            media: '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="#3b82f6" stroke-width="2"/></svg>',
          },
          {
            id: "hero",
            label: "Hero Section",
            category: "Sections",
            content: `
              <section class="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                <div class="container mx-auto px-4">
                  <h1 class="text-5xl font-bold mb-6">Titulo Principal</h1>
                  <p class="text-xl text-blue-100 mb-8 max-w-2xl">Descripcion del hero. Escribe aqui un texto atractivo para tus visitantes.</p>
                  <div class="flex gap-4">
                    <button class="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Comenzar</button>
                    <button class="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">Saber mas</button>
                  </div>
                </div>
              </section>
            `,
            media: '<svg viewBox="0 0 24 24"><rect fill="#1e40af" width="24" height="24" rx="2"/><text x="4" y="14" font-size="8" fill="white">HERO</text></svg>',
          },
          {
            id: "features",
            label: "Features",
            category: "Sections",
            content: `
              <section class="py-16 bg-white">
                <div class="container mx-auto px-4">
                  <h2 class="text-3xl font-bold text-center mb-12">Nuestras Caracteristicas</h2>
                  <div class="grid grid-cols-3 gap-8">
                    <div class="text-center p-6">
                      <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                      </div>
                      <h3 class="text-xl font-semibold mb-2">Rapido</h3>
                      <p class="text-gray-600">Descripcion de la caracteristica</p>
                    </div>
                    <div class="text-center p-6">
                      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </div>
                      <h3 class="text-xl font-semibold mb-2">Confiable</h3>
                      <p class="text-gray-600">Descripcion de la caracteristica</p>
                    </div>
                    <div class="text-center p-6">
                      <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                      </div>
                      <h3 class="text-xl font-semibold mb-2">Seguro</h3>
                      <p class="text-gray-600">Descripcion de la caracteristica</p>
                    </div>
                  </div>
                </div>
              </section>
            `,
            media: '<svg viewBox="0 0 24 24"><rect x="1" y="4" width="6" height="16" fill="#dbeafe" rx="1"/><rect x="9" y="4" width="6" height="16" fill="#dcfce7" rx="1"/><rect x="17" y="4" width="6" height="16" fill="#f3e8ff" rx="1"/></svg>',
          },
          {
            id: "cta",
            label: "Call to Action",
            category: "Sections",
            content: `
              <section class="py-16 bg-blue-600 text-white text-center">
                <div class="container mx-auto px-4">
                  <h2 class="text-3xl font-bold mb-4">Listo para empezar?</h2>
                  <p class="text-xl text-blue-100 mb-8">Unete a nosotros hoy y transforma tu negocio</p>
                  <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Contactar ahora</button>
                </div>
              </section>
            `,
            media: '<svg viewBox="0 0 24 24"><rect fill="#2563eb" width="24" height="24" rx="2"/><text x="4" y="14" font-size="6" fill="white">CTA</text></svg>',
          },
          {
            id: "testimonials",
            label: "Testimonios",
            category: "Sections",
            content: `
              <section class="py-16 bg-gray-50">
                <div class="container mx-auto px-4">
                  <h2 class="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
                  <div class="grid grid-cols-2 gap-8">
                    <div class="bg-white p-8 rounded-xl shadow-sm">
                      <p class="text-gray-600 mb-6">"Excelente servicio, superaron nuestras expectativas en todo momento."</p>
                      <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                        <div>
                          <h4 class="font-semibold">Juan Perez</h4>
                          <p class="text-gray-500 text-sm">CEO, Empresa XYZ</p>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white p-8 rounded-xl shadow-sm">
                      <p class="text-gray-600 mb-6">"Transformaron nuestra manera de trabajar. Muy recomendados."</p>
                      <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                        <div>
                          <h4 class="font-semibold">Maria Garcia</h4>
                          <p class="text-gray-500 text-sm">Directora, Startup ABC</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            `,
            media: '<svg viewBox="0 0 24 24"><rect fill="#f9fafb" width="24" height="24" rx="2"/><text x="6" y="14" font-size="10">"</text></svg>',
          },
          {
            id: "contact-form",
            label: "Formulario",
            category: "Forms",
            content: `
              <section class="py-16 bg-white">
                <div class="container mx-auto px-4 max-w-xl">
                  <h2 class="text-3xl font-bold text-center mb-8">Contactanos</h2>
                  <form class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                      <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tu nombre">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="tu@email.com">
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                      <textarea rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Tu mensaje..."></textarea>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Enviar mensaje</button>
                  </form>
                </div>
              </section>
            `,
            media: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" fill="none" stroke="#374151" stroke-width="2" rx="2"/><line x1="8" y1="8" x2="16" y2="8" stroke="#374151" stroke-width="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="#374151" stroke-width="2"/></svg>',
          },
          {
            id: "footer",
            label: "Footer",
            category: "Sections",
            content: `
              <footer class="bg-gray-900 text-white py-12">
                <div class="container mx-auto px-4">
                  <div class="grid grid-cols-4 gap-8 mb-8">
                    <div>
                      <h3 class="text-xl font-bold mb-4">Hemispher-IA</h3>
                      <p class="text-gray-400">Conectando conocimiento, talento y tecnologia.</p>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-4">Enlaces</h4>
                      <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">Inicio</a></li>
                        <li><a href="#" class="hover:text-white">Servicios</a></li>
                        <li><a href="#" class="hover:text-white">Contacto</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-4">Legal</h4>
                      <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">Privacidad</a></li>
                        <li><a href="#" class="hover:text-white">Terminos</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-4">Contacto</h4>
                      <p class="text-gray-400">info@hemispher-ia.org</p>
                    </div>
                  </div>
                  <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>© 2024 Hemispher-IA. Todos los derechos reservados.</p>
                  </div>
                </div>
              </footer>
            `,
            media: '<svg viewBox="0 0 24 24"><rect y="16" width="24" height="8" fill="#1f2937"/></svg>',
          },
        ],
      },

      // Asset manager for images
      assetManager: {
        uploadFile: async (e: any) => {
          const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
          const formData = new FormData();

          for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
          }

          try {
            const response = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              const result = await response.json();
              return result.urls;
            }
          } catch (error) {
            console.error("Upload error:", error);
          }
          return [];
        },
        assets: [],
      },
    });

    // Add custom commands
    gjsEditor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });
    gjsEditor.Commands.add("set-device-tablet", {
      run: (editor) => editor.setDevice("Tablet"),
    });
    gjsEditor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });

    setEditor(gjsEditor);

    return () => {
      gjsEditor.destroy();
    };
  }, []);

  // Add custom blocks from database
  useEffect(() => {
    if (!editor || customBlocks.length === 0) return;

    const blockManager = editor.BlockManager;
    customBlocks.forEach((block) => {
      if (!blockManager.get(block.name)) {
        blockManager.add(block.name, {
          label: block.label || block.name,
          category: block.category || "Custom",
          content: block.content,
          media: block.media || '<svg viewBox="0 0 24 24"><rect fill="#e5e7eb" width="24" height="24" rx="2"/></svg>',
        });
      }
    });
  }, [editor, customBlocks]);

  // Load page content
  const loadPage = async (page: Page) => {
    if (!editor) return;

    setCurrentPage(page);

    if (page.components && page.styles) {
      editor.loadProjectData({
        pages: [{ component: page.components, styles: page.styles }],
      });
    } else if (page.html) {
      editor.setComponents(page.html);
      if (page.css) {
        editor.setStyle(page.css);
      }
    } else {
      editor.setComponents("");
      editor.setStyle("");
    }

    toast({
      title: "Pagina cargada",
      description: `Editando: ${page.title}`,
    });
  };

  // Save current page
  const savePage = async () => {
    if (!editor || !currentPage) {
      toast({
        title: "Error",
        description: "Selecciona una pagina primero",
        variant: "destructive",
      });
      return;
    }

    const html = editor.getHtml();
    const css = editor.getCss();
    const projectData = editor.getProjectData();

    try {
      const response = await fetch(`/api/pages/${currentPage.id || "new"}`, {
        method: currentPage.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentPage,
          html,
          css,
          components: projectData.pages?.[0]?.component || {},
          styles: projectData.pages?.[0]?.styles || [],
        }),
      });

      if (response.ok) {
        const savedPage = await response.json();
        setCurrentPage(savedPage);

        // Update pages list
        setPages((prev) => {
          const exists = prev.find((p) => p.id === savedPage.id);
          if (exists) {
            return prev.map((p) => (p.id === savedPage.id ? savedPage : p));
          }
          return [...prev, savedPage];
        });

        toast({
          title: "Guardado",
          description: "Pagina guardada correctamente",
        });
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la pagina",
        variant: "destructive",
      });
    }
  };

  // Create new page
  const createNewPage = async () => {
    if (!newPageTitle || !newPageSlug) {
      toast({
        title: "Error",
        description: "Titulo y slug son requeridos",
        variant: "destructive",
      });
      return;
    }

    const newPage: Page = {
      title: newPageTitle,
      slug: newPageSlug.toLowerCase().replace(/\s+/g, "-"),
      html: "",
      css: "",
      is_published: false,
    };

    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPage),
      });

      if (response.ok) {
        const savedPage = await response.json();
        setPages((prev) => [...prev, savedPage]);
        loadPage(savedPage);
        setShowNewPageDialog(false);
        setNewPageTitle("");
        setNewPageSlug("");

        toast({
          title: "Pagina creada",
          description: `${savedPage.title} ha sido creada`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear la pagina",
        variant: "destructive",
      });
    }
  };

  // Preview page
  const previewPage = () => {
    if (!editor) return;

    const html = editor.getHtml();
    const css = editor.getCss();
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>${css}</style>
        </head>
        <body>${html}</body>
      </html>
    `;

    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(fullHtml);
      previewWindow.document.close();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <Select
            value={currentPage?.id?.toString() || ""}
            onValueChange={(value) => {
              const page = pages.find((p) => p.id?.toString() === value);
              if (page) loadPage(page);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar pagina" />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.id} value={page.id?.toString() || ""}>
                  {page.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={showNewPageDialog} onOpenChange={setShowNewPageDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva pagina
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear nueva pagina</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="text-sm font-medium">Titulo</label>
                  <Input
                    value={newPageTitle}
                    onChange={(e) => {
                      setNewPageTitle(e.target.value);
                      setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                    }}
                    placeholder="Mi nueva pagina"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Slug (URL)</label>
                  <Input
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    placeholder="mi-nueva-pagina"
                  />
                </div>
                <Button onClick={createNewPage} className="w-full">
                  Crear pagina
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-2">
          <div className="panel__devices flex gap-1 mr-4"></div>

          <Button variant="outline" size="sm" onClick={previewPage}>
            <Eye className="h-4 w-4 mr-2" />
            Vista previa
          </Button>

          <Button size="sm" onClick={savePage}>
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex">
        {/* Blocks sidebar */}
        <div className="w-64 bg-white border-r overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Bloques</h3>
            <p className="text-sm text-gray-500">Arrastra para agregar</p>
          </div>
          <div id="blocks-container"></div>
        </div>

        {/* Canvas */}
        <div className="flex-1">
          <div ref={editorRef} className="h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PageBuilder;
