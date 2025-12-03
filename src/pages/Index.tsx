"use client";

import React from "react";
import InteractiveMouseFollower from "@/components/InteractiveMouseFollower";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import InteractiveHero from "@/components/InteractiveHero";
import AnimatedAboutSection from "@/components/AnimatedAboutSection";
import AnimatedServicesSection from "@/components/AnimatedServicesSection";
import AnimatedProjectsSection from "@/components/AnimatedProjectsSection";
import AnimatedContactSection from "@/components/AnimatedContactSection";
import AnimatedFooter from "@/components/AnimatedFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <InteractiveMouseFollower />
      <AnimatedNavbar />
      <InteractiveHero />
      <AnimatedAboutSection />
      <AnimatedServicesSection />
      <AnimatedProjectsSection />
      <AnimatedContactSection />
      <AnimatedFooter />
    </div>
  );
};

export default Index;