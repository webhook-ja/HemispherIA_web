import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PublicInfo from "./pages/PublicInfo";
import Publicaciones from "./pages/Publicaciones";
import Eventos from "./pages/Eventos";
import Blog from "./pages/Blog";
import Alianzas from "./pages/Alianzas";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Page tracking component
const PageTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer,
          }),
        });
      } catch (error) {
        // Silent fail for analytics
      }
    };

    trackVisit();
  }, []);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/public-info" element={<PublicInfo />} />
            <Route path="/publicaciones" element={<Publicaciones />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/alianzas" element={<Alianzas />} />
            <Route path="/privacidad" element={<PrivacyPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
