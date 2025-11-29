"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Upload,
  Image,
  FileText,
  Video,
  Music,
  Trash2,
  Eye,
  Copy,
  Download,
  Search,
  Grid,
  List,
  X
} from "lucide-react";

interface Asset {
  id: number;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  url: string;
  created_at: string;
}

const MediaManager = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [deleteAsset, setDeleteAsset] = useState<Asset | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { token } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchAssets();
  }, [token]);

  const fetchAssets = async () => {
    try {
      const response = await fetch('/api/assets', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAssets(data.assets || []);
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setAssets(prev => [...data.assets, ...prev]);
        toast({
          title: "Archivos subidos",
          description: `${files.length} archivo(s) subido(s) correctamente`,
        });
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron subir los archivos",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteAsset) return;

    try {
      const response = await fetch(`/api/assets/${deleteAsset.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setAssets(prev => prev.filter(a => a.id !== deleteAsset.id));
        toast({
          title: "Archivo eliminado",
          description: "El archivo ha sido eliminado correctamente",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el archivo",
        variant: "destructive",
      });
    } finally {
      setDeleteAsset(null);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    toast({
      title: "URL copiada",
      description: "La URL ha sido copiada al portapapeles",
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return Image;
    if (mimeType.startsWith('video/')) return Video;
    if (mimeType.startsWith('audio/')) return Music;
    return FileText;
  };

  const getFileType = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.original_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || getFileType(asset.mime_type) === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestor de Multimedia</h1>
        <p className="text-gray-600">Administra imagenes, videos y documentos</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Subiendo archivos...</p>
              </div>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, MP4, PDF, DOC (Max. 50MB)
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
              onChange={(e) => handleUpload(e.target.files)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar archivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="image">Imagenes</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="document">Docs</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Assets Grid/List */}
      {filteredAssets.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Image className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hay archivos{searchTerm && ' que coincidan con tu busqueda'}</p>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map((asset) => {
            const Icon = getFileIcon(asset.mime_type);
            const isImage = asset.mime_type.startsWith('image/');

            return (
              <Card key={asset.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  className="aspect-square relative bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedAsset(asset)}
                >
                  {isImage ? (
                    <img
                      src={asset.url}
                      alt={asset.original_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" size="sm">
                      <Eye className="h-4 w-4 mr-1" /> Ver
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate" title={asset.original_name}>
                    {asset.original_name}
                  </p>
                  <p className="text-xs text-gray-500">{formatBytes(asset.size)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-4 font-medium">Archivo</th>
                  <th className="text-left p-4 font-medium hidden sm:table-cell">Tipo</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Tamano</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">Fecha</th>
                  <th className="text-right p-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => {
                  const Icon = getFileIcon(asset.mime_type);
                  return (
                    <tr key={asset.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                            {asset.mime_type.startsWith('image/') ? (
                              <img src={asset.url} alt="" className="w-full h-full object-cover rounded" />
                            ) : (
                              <Icon className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                          <span className="truncate max-w-[200px]">{asset.original_name}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <Badge variant="secondary">{getFileType(asset.mime_type)}</Badge>
                      </td>
                      <td className="p-4 hidden md:table-cell text-gray-500">{formatBytes(asset.size)}</td>
                      <td className="p-4 hidden lg:table-cell text-gray-500">{formatDate(asset.created_at)}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setSelectedAsset(asset)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => copyUrl(asset.url)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600" onClick={() => setDeleteAsset(asset)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="truncate pr-8">{selectedAsset?.original_name}</DialogTitle>
            <DialogDescription>
              Vista previa del archivo y opciones disponibles.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedAsset?.mime_type.startsWith('image/') && (
              <img
                src={selectedAsset.url}
                alt={selectedAsset.original_name}
                className="w-full max-h-[60vh] object-contain rounded-lg bg-gray-100"
              />
            )}
            {selectedAsset?.mime_type.startsWith('video/') && (
              <video
                src={selectedAsset.url}
                controls
                className="w-full max-h-[60vh] rounded-lg bg-black"
              />
            )}
            {selectedAsset?.mime_type.startsWith('audio/') && (
              <audio src={selectedAsset.url} controls className="w-full" />
            )}
            {selectedAsset && !selectedAsset.mime_type.startsWith('image/') &&
              !selectedAsset.mime_type.startsWith('video/') &&
              !selectedAsset.mime_type.startsWith('audio/') && (
              <div className="text-center py-12 bg-gray-100 rounded-lg">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Vista previa no disponible para este tipo de archivo</p>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => copyUrl(selectedAsset?.url || '')}>
                <Copy className="h-4 w-4 mr-2" /> Copiar URL
              </Button>
              <Button variant="outline" asChild>
                <a href={selectedAsset?.url} download target="_blank">
                  <Download className="h-4 w-4 mr-2" /> Descargar
                </a>
              </Button>
              <Button variant="destructive" onClick={() => {
                setSelectedAsset(null);
                setDeleteAsset(selectedAsset);
              }}>
                <Trash2 className="h-4 w-4 mr-2" /> Eliminar
              </Button>
            </div>

            <div className="text-sm text-gray-500 space-y-1">
              <p><strong>Tipo:</strong> {selectedAsset?.mime_type}</p>
              <p><strong>Tamano:</strong> {formatBytes(selectedAsset?.size || 0)}</p>
              <p><strong>Fecha:</strong> {formatDate(selectedAsset?.created_at || '')}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteAsset} onOpenChange={() => setDeleteAsset(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar archivo</AlertDialogTitle>
            <AlertDialogDescription>
              Estas seguro que deseas eliminar "{deleteAsset?.original_name}"? Esta accion no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MediaManager;
