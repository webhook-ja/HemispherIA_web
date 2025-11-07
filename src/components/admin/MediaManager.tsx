"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MediaManager = () => {
  const [mediaItems] = useState([
    {
      id: 1,
      name: "team-photo.jpg",
      type: "image",
      size: "2.4 MB",
      uploaded: "2023-05-15"
    },
    {
      id: 2,
      name: "project-video.mp4",
      type: "video",
      size: "45.2 MB",
      uploaded: "2023-05-10"
    },
    {
      id: 3,
      name: "presentation.pdf",
      type: "document",
      size: "3.1 MB",
      uploaded: "2023-05-08"
    }
  ]);
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestor de Multimedia</h1>
        <p className="text-gray-600">Administra imágenes, videos y documentos</p>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg 
                    className="w-8 h-8 mb-4 text-gray-500" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 20 16"
                  >
                    <path 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF, MP4, PDF (MAX. 100MB)
                  </p>
                </div>
                <Input type="file" className="hidden" />
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Archivos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mr-3">
                    {item.type === "image" && (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    )}
                    {item.type === "video" && (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    )}
                    {item.type === "document" && (
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm truncate max-w-[120px]">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.size}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{item.uploaded}</span>
                  <div className="space-x-1">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm">Eliminar</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaManager;