"use client"

import { useLanguage } from "@/components/language-provider"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export default function ProjectsSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: "Cloud Infrastructure Automation",
      description:
        "A comprehensive IaC solution using Terraform and Ansible to provision and manage cloud resources across multiple providers.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Terraform", "AWS", "Ansible", "Python"],
      demoUrl: "https://example.com",
      codeUrl: "https://github.com",
    },
    {
      title: "Microservices Monitoring Dashboard",
      description:
        "Real-time monitoring solution for distributed systems using Prometheus, Grafana, and custom alerting mechanisms.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Prometheus", "Grafana", "Node.js", "Docker"],
      demoUrl: "https://example.com",
      codeUrl: "https://github.com",
    },
    {
      title: "Scalable API Gateway",
      description: "High-performance API gateway with rate limiting, authentication, and request routing capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Go", "Kubernetes", "Redis", "gRPC"],
      demoUrl: "https://example.com",
      codeUrl: "https://github.com",
    },
    {
      title: "Automated CI/CD Pipeline",
      description:
        "End-to-end CI/CD solution with automated testing, security scanning, and deployment to multiple environments.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["Jenkins", "Docker", "Kubernetes", "Bash"],
      demoUrl: "https://example.com",
      codeUrl: "https://github.com",
    },
  ]

  return (
    <section id="projects" ref={ref} className="container py-16 md:py-24">
      <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">{t("projects.title")}</h2>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              "group overflow-hidden rounded-lg border bg-background shadow-sm transition-all duration-700",
              inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
              `delay-[${index * 200}ms]`,
            )}
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
              <p className="mb-4 text-muted-foreground">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("projects.viewDemo")}
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    {t("projects.viewCode")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

