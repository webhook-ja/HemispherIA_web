"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Users,
  GraduationCap,
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";

interface ImpactData {
  monetary: {
    amount: number;
    beneficiaries: number;
    weeks: number;
    description: string;
  };
  training: {
    hours: number;
    students: number;
    schools: number;
    description: string;
  };
  physical: {
    items: number;
    type: string;
    beneficiaries: number;
    description: string;
  };
}

const ImpactCalculator = () => {
  const [donationAmount, setDonationAmount] = useState(20);
  const [trainingHours, setTrainingHours] = useState(10);
  const [physicalItems, setPhysicalItems] = useState(50);
  const [activeTab, setActiveTab] = useState("monetary");

  // Cálculos de impacto monetario
  const calculateMonetaryImpact = (amount: number): ImpactData["monetary"] => {
    const costPerChild = 1.5; // $1.5 por niño por semana
    const beneficiaries = Math.floor(amount / costPerChild);
    const weeks = 5;

    return {
      amount,
      beneficiaries,
      weeks,
      description: `alimentará a ${beneficiaries} niños durante ${weeks} semanas con meriendas escolares nutritivas`,
    };
  };

  // Cálculos de impacto técnico
  const calculateTrainingImpact = (hours: number): ImpactData["training"] => {
    const studentsPerHour = 30;
    const students = hours * studentsPerHour;
    const schools = Math.ceil(hours / 3);

    return {
      hours,
      students,
      schools,
      description: `capacitará a ${students} estudiantes en ${schools} escuelas con entrenamiento digital`,
    };
  };

  // Cálculos de impacto físico
  const calculatePhysicalImpact = (items: number): ImpactData["physical"] => {
    const beneficiaries = Math.floor(items / 4); // 4 items por beneficiario

    return {
      items,
      type: "insumos escolares",
      beneficiaries,
      description: `proporcionará ${items} insumos escolares para ${beneficiaries} niños en comunidades vulnerables`,
    };
  };

  const monetaryImpact = calculateMonetaryImpact(donationAmount);
  const trainingImpact = calculateTrainingImpact(trainingHours);
  const physicalImpact = calculatePhysicalImpact(physicalItems);

  const handleDonation = async () => {
    try {
      const donationData = {
        type: activeTab,
        amount: activeTab === "monetary" ? donationAmount : null,
        hours: activeTab === "training" ? trainingHours : null,
        items: activeTab === "physical" ? physicalItems : null,
        impact: activeTab === "monetary"
          ? monetaryImpact
          : activeTab === "training"
            ? trainingImpact
            : physicalImpact,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        alert("¡Gracias por tu contribución! Recibirás un correo con los detalles.");
      }
    } catch (error) {
      console.error("Error al procesar donación:", error);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Impacto
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo tu contribución puede transformar vidas. Calcula el impacto real
            de tu donación, capacitación o recursos en nuestros proyectos.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-sm">
            <TabsTrigger value="monetary" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <DollarSign className="mr-2 h-4 w-4" />
              Donación Monetaria
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
              <GraduationCap className="mr-2 h-4 w-4" />
              Capacitación Técnica
            </TabsTrigger>
            <TabsTrigger value="physical" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Package className="mr-2 h-4 w-4" />
              Donación Física
            </TabsTrigger>
          </TabsList>

          {/* DONACIÓN MONETARIA */}
          <TabsContent value="monetary">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <CardTitle className="flex items-center">
                      <DollarSign className="mr-2 h-6 w-6" />
                      ¿Cuánto quieres aportar?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-blue-600 mb-2">
                          ${donationAmount}
                        </div>
                        <p className="text-gray-500">Tu contribución</p>
                      </div>

                      <Slider
                        value={[donationAmount]}
                        onValueChange={(value) => setDonationAmount(value[0])}
                        min={5}
                        max={500}
                        step={5}
                        className="mb-4"
                      />

                      <div className="flex justify-between text-sm text-gray-500">
                        <span>$5</span>
                        <span>$500</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-2">
                        {[10, 20, 50, 100].map((amount) => (
                          <Button
                            key={amount}
                            variant={donationAmount === amount ? "default" : "outline"}
                            onClick={() => setDonationAmount(amount)}
                            className="w-full"
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <TrendingUp className="mr-2 h-6 w-6 text-blue-600" />
                      Tu Impacto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <motion.div
                        className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-blue-600">
                            {monetaryImpact.beneficiaries}
                          </div>
                          <div className="text-sm text-gray-600">niños beneficiados</div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="bg-indigo-100 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-indigo-600">
                            {monetaryImpact.weeks}
                          </div>
                          <div className="text-sm text-gray-600">semanas de alimentación</div>
                        </div>
                      </motion.div>

                      <div className="p-6 bg-white rounded-lg border-2 border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Heart className="mr-2 h-5 w-5 text-red-500" />
                          Tu donación de ${monetaryImpact.amount}:
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {monetaryImpact.description}
                        </p>
                      </div>

                      <Button
                        onClick={handleDonation}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg font-semibold"
                      >
                        <Heart className="mr-2 h-5 w-5" />
                        Donar ${donationAmount}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* CAPACITACIÓN TÉCNICA */}
          <TabsContent value="training">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <CardTitle className="flex items-center">
                      <GraduationCap className="mr-2 h-6 w-6" />
                      Horas de Capacitación
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-indigo-600 mb-2">
                          {trainingHours} hrs
                        </div>
                        <p className="text-gray-500">Entrenamiento digital</p>
                      </div>

                      <Slider
                        value={[trainingHours]}
                        onValueChange={(value) => setTrainingHours(value[0])}
                        min={5}
                        max={100}
                        step={5}
                        className="mb-4"
                      />

                      <div className="flex justify-between text-sm text-gray-500">
                        <span>5 hrs</span>
                        <span>100 hrs</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-2">
                        {[10, 20, 40, 80].map((hours) => (
                          <Button
                            key={hours}
                            variant={trainingHours === hours ? "default" : "outline"}
                            onClick={() => setTrainingHours(hours)}
                            className="w-full"
                          >
                            {hours}h
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <TrendingUp className="mr-2 h-6 w-6 text-indigo-600" />
                      Impacto Educativo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <motion.div
                        className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="bg-indigo-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-indigo-600">
                            {trainingImpact.students}
                          </div>
                          <div className="text-sm text-gray-600">estudiantes capacitados</div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="bg-purple-100 p-3 rounded-full">
                          <MapPin className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-purple-600">
                            {trainingImpact.schools}
                          </div>
                          <div className="text-sm text-gray-600">escuelas alcanzadas</div>
                        </div>
                      </motion.div>

                      <div className="p-6 bg-white rounded-lg border-2 border-indigo-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <GraduationCap className="mr-2 h-5 w-5 text-indigo-600" />
                          Tu contribución de {trainingImpact.hours} horas:
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {trainingImpact.description}
                        </p>
                      </div>

                      <Button
                        onClick={handleDonation}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-6 text-lg font-semibold"
                      >
                        <GraduationCap className="mr-2 h-5 w-5" />
                        Contribuir {trainingHours}h
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* DONACIÓN FÍSICA */}
          <TabsContent value="physical">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <CardTitle className="flex items-center">
                      <Package className="mr-2 h-6 w-6" />
                      Cantidad de Insumos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-purple-600 mb-2">
                          {physicalItems}
                        </div>
                        <p className="text-gray-500">Insumos escolares</p>
                      </div>

                      <Slider
                        value={[physicalItems]}
                        onValueChange={(value) => setPhysicalItems(value[0])}
                        min={10}
                        max={500}
                        step={10}
                        className="mb-4"
                      />

                      <div className="flex justify-between text-sm text-gray-500">
                        <span>10</span>
                        <span>500</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-2">
                        {[50, 100, 200, 400].map((items) => (
                          <Button
                            key={items}
                            variant={physicalItems === items ? "default" : "outline"}
                            onClick={() => setPhysicalItems(items)}
                            className="w-full"
                          >
                            {items}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-full shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <TrendingUp className="mr-2 h-6 w-6 text-purple-600" />
                      Impacto Material
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <motion.div
                        className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="bg-purple-100 p-3 rounded-full">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-purple-600">
                            {physicalImpact.beneficiaries}
                          </div>
                          <div className="text-sm text-gray-600">niños beneficiados</div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="bg-pink-100 p-3 rounded-full">
                          <Package className="h-6 w-6 text-pink-600" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-pink-600">
                            {physicalImpact.items}
                          </div>
                          <div className="text-sm text-gray-600">insumos donados</div>
                        </div>
                      </motion.div>

                      <div className="p-6 bg-white rounded-lg border-2 border-purple-200">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Package className="mr-2 h-5 w-5 text-purple-600" />
                          Tu donación de {physicalImpact.items} items:
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {physicalImpact.description}
                        </p>
                      </div>

                      <Button
                        onClick={handleDonation}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-semibold"
                      >
                        <Package className="mr-2 h-5 w-5" />
                        Donar {physicalItems} insumos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ImpactCalculator;
