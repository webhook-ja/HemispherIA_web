"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  
  // Datos de ejemplo
  const projects = [
    {
      id: 1,
      title: "IA para monitoreo de salud materna",
      description: "Proyecto piloto en comunidades rurales de Colombia",
      location: "Colombia",
      status: "Activo"
    },
    {
      id: 2,
      title: "Redes de influencers por la acción climática juvenil",
      description: "Colaboración con jóvenes activistas digitales",
      location: "Brasil, Argentina",
      status: "En progreso"
    }
  ];
  
  const handleEdit = (item: any) => {
    setCurrentItem(item);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    // Lógica para guardar cambios
    setIsEditing(false);
    setCurrentItem(null);
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestor de Contenido</h1>
        <p className="text-gray-600">Administra proyectos, noticias y otros contenidos</p>
      </div>
      
      <div className="flex space-x-4 mb-6">
        <Button 
          variant={activeTab === "projects" ? "default" : "outline"}
          onClick={() => setActiveTab("projects")}
        >
          Proyectos
        </Button>
        <Button 
          variant={activeTab === "news" ? "default" : "outline"}
          onClick={() => setActiveTab("news")}
        >
          Noticias
        </Button>
        <Button 
          variant={activeTab === "team" ? "default" : "outline"}
          onClick={() => setActiveTab("team")}
        >
          Equipo
        </Button>
      </div>
      
      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Editar {activeTab === "projects" ? "Proyecto" : activeTab === "news" ? "Noticia" : "Miembro del Equipo"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input 
                  value={currentItem?.title || ""} 
                  onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <Textarea 
                  value={currentItem?.description || ""} 
                  onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Ubicación</label>
                <Input 
                  value={currentItem?.location || ""} 
                  onChange={(e) => setCurrentItem({...currentItem, location: e.target.value})}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleSave}>Guardar Cambios</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {activeTab === "projects" ? "Proyectos" : activeTab === "news" ? "Noticias" : "Equipo"}
            </CardTitle>
            <Button onClick={() => {
              setCurrentItem({});
              setIsEditing(true);
            }}>
              + Nuevo
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === "Activo" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {project.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEdit(project)}
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentManager;