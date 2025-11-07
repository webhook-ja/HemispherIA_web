"use client";

import React from "react";
import MouseFollower from "@/components/MouseFollower";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import InteractiveHero from "@/components/InteractiveHero";
import AnimatedAboutSection from "@/components/AnimatedAboutSection";
import AnimatedServicesSection from "@/components/AnimatedServicesSection";
import AnimatedProjectsSection from "@/components/AnimatedProjectsSection";
import AnimatedHubSection from "@/components/AnimatedHubSection";
import AnimatedNewsSection from "@/components/AnimatedNewsSection";
import AnimatedJoinSection from "@/components/AnimatedJoinSection";
import AnimatedContactSection from "@/components/AnimatedContactSection";
import AnimatedFooter from "@/components/AnimatedFooter";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <MouseFollower />
      <AnimatedNavbar />
      <InteractiveHero />
      <AnimatedAboutSection />
      <AnimatedServicesSection />
      <AnimatedProjectsSection />
      <AnimatedHubSection />
      <AnimatedNewsSection />
      <AnimatedJoinSection />
      <AnimatedContactSection />
      <AnimatedFooter />
      <MadeWithDyad />
    </div>
  );
};

export default Index;