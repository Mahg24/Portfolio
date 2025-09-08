"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

type Language = "en" | "es";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    "hero.title": "Backend Developer & DevOps Engineer",
    "hero.subtitle": "Building robust systems and streamlining deployments",
    "hero.cta": "Download CV",
    "hero.ctm": "Contact me",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "about.title": "About Me",
    "about.description":
      "I'm a passionate Backend Developer and DevOps Engineer with extensive experience in building scalable applications and implementing efficient CI/CD pipelines. I specialize in cloud infrastructure, containerization, and automation.",
    "about.description2":"With over 8 years of experience in the industry, I've worked on various projects ranging from high-traffic e-commerce platforms to complex data processing systems. I'm passionate about creating efficient, scalable solutions and automating development workflows.",
    "skills.title": "My Skills",
    "skills.backend": "Backend Development",
    "skills.devops": "DevOps & Cloud",
    "skills.databases": "Databases",
    "skills.tools": "Tools & Others",
    "projects.title": "Featured Projects",
    "projects.viewDemo": "View Demo",
    "projects.viewCode": "View Code",
    "blog.title": "Latest Articles",
    "blog.readMore": "Read More",
    "contact.intro": "Let's Talk",
    "contact.text":
      "Feel free to reach out if you have any questions, project inquiries, or just want to connect. I'm always open to discussing new opportunities and challenges.",
    "contact.title": "Get In Touch",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.phone": "Phone",
    "footer.rights": "All rights reserved",
  },
  es: {
    "hero.title": "Desarrollador Backend e Ingeniero DevOps",
    "hero.subtitle": "Construyendo sistemas robustos y optimizando despliegues",
    "hero.cta": "Descargar CV",
    "hero.ctm": "Contactame",
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.skills": "Habilidades",
    "nav.projects": "Proyectos",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "about.title": "Sobre Mí",
    "about.description":
      "Soy un apasionado Desarrollador Backend e Ingeniero DevOps con amplia experiencia en la construcción de aplicaciones escalables y la implementación de pipelines CI/CD eficientes. Me especializo en infraestructura en la nube, contenedorización y automatización.",
    "about.description2": "Cuento con más de 8 años de experiencia en la industria, participando en proyectos que van desde plataformas de comercio electrónico de alto volumen hasta sistemas avanzados de procesamiento de datos. Me motiva diseñar soluciones escalables y eficientes, además de optimizar y automatizar los flujos de desarrollo.",
    "skills.title": "Mis Habilidades",
    "skills.backend": "Desarrollo Backend",
    "skills.devops": "DevOps y Cloud",
    "skills.databases": "Bases de Datos",
    "skills.tools": "Herramientas y Otros",
    "projects.title": "Proyectos Destacados",
    "projects.viewDemo": "Ver Demo",
    "projects.viewCode": "Ver Código",
    "blog.title": "Artículos Recientes",
    "blog.readMore": "Leer Más",
    "contact.title": "Contacto",
    "contact.intro": "Hablemos",
    "contact.text":
      "No dudes en contactarme si tienes alguna pregunta, consulta sobre proyectos o simplemente quieres conectar. Siempre estoy abierto a explorar nuevas oportunidades y desafíos.",
    "contact.name": "Nombre",
    "contact.email": "Correo",
    "contact.phone": "Teléfono",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "footer.rights": "Todos los derechos reservados",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
