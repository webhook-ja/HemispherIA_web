// src/lib/config.ts
const config = {
  appName: import.meta.env.VITE_APP_NAME || "Hemispher-IA",
  apiURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  
  // Analytics
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
  plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN,
  
  // Cloudinary
  cloudinary: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  },
  
  // Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  
  // Features
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
    enableComments: import.meta.env.VITE_ENABLE_COMMENTS === "true",
    enableContactForm: import.meta.env.VITE_ENABLE_CONTACT_FORM !== "false",
  },
};

export default config;