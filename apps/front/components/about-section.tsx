"use client"

import { useLanguage } from "@/components/language-provider"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function AboutSection() {
  const { t, language } = useLanguage()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const timelineItemsEs = [
    {
      "year": "2024 - Presente",
      "title": "Backend Developer",
      "company": "Mercado Libre",
      "description": "Desarrollo y mantenimiento de funcionalidades para el módulo de pagos con tarjeta de crédito; análisis, detección y corrección de errores en distintos componentes del sistema para garantizar estabilidad y eficiencia."
    },
    {
      year: "2023 - 2024",
      title: "Full Stack Developer",
      company: "Q10",
      description: "Desarrollé funcionalidades frontend y backend aplicando buenas prácticas; resolví bugs y consultas de clientes mejorando la experiencia de usuario; optimicé y documenté las APIs REST para una integración más eficiente."
    },
    {
      year: "2022 - 2023 ",
      title: "Backend Lead",
      company: "Soluntech",
      description: "Definí y apliqué estándares de codificación y buenas prácticas; implementé pruebas automatizadas y gestioné infraestructura cloud para garantizar disponibilidad.",
    },
    {
      year: "2021 - 2022",
      title: "Backend Developer",
      company: "Tres Astronautas, Medellín",
      description: "Diseñé base de datos y API para una app logística; desplegué en AWS con contenedores Docker y pipelines de CI/CD.",
    },
    {
      year: "2020 - 2021",
      title: "Backend Developer",
      company: "PolygonUs, Medellín",
      description: "Diseñé arquitecturas para plataformas educativas y videojuegos con orientación vocacional; gestioné la infraestructura completa en AWS.",
    },
  ];

  const timelineItemsEn = [
    {
      "year": "2024 - Present",
      "title": "Backend Developer",
      "company": "Mercado Libre",
      "description": "Developing and maintaining features for the credit card payment module; analyzing, identifying, and fixing bugs across different components to ensure system stability and efficiency."
    },
    {
      "year": "2023 - 2024",
      "title": "Full Stack Developer",
      "company": "Q10",
      "description": "Developed frontend and backend features following best practices; resolved bugs and client issues to improve user experience; optimized and documented REST APIs for smoother integration."
    },
    {
      year: "2022 - 2023",
      title: "Backend Lead",
      company: "Soluntech",
      description: "Defined and applied coding standards and best practices; implemented automated tests and managed cloud infrastructure to ensure availability.",
    },
    {
      year: "2021 - 2022",
      title: "Backend Developer",
      company: "Tres Astronautas, Medellín",
      description: "Designed database and API for a logistics app; deployed on AWS using Docker containers and CI/CD pipelines.",
    },
    {
      year: "2019 - 2021",
      title: "Backend Developer",
      company: "PolygonUs, Medellín",
      description: "Designed architectures for educational platforms and career-guidance games; fully managed AWS infrastructure and services.",
    },
  ];


  const timelineItems = language === "es" ? timelineItemsEs : timelineItemsEn

  return (
    <section id="about" ref={ref} className="container py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">{t("about.title")}</h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div
            className={cn(
              "space-y-4 transition-all duration-700",
              inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0",
            )}
          >
            <p className="text-lg">{t("about.description")}</p>
            <p className="text-muted-foreground">
              {t("about.description2")}
            </p>
          </div>

          <div
            className={cn(
              "transition-all duration-700 delay-300",
              inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
            )}
          >
            <h3 className="mb-4 text-xl font-semibold">Experience</h3>
            <div className="mt-6">
              {timelineItems.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="font-medium text-primary">{item.year}</div>
                  <div className="font-bold">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.company}</div>
                  <div className="mt-2 text-sm">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

