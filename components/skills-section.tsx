"use client"

import { useLanguage } from "@/components/language-provider"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function SkillsSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      title: t("skills.backend"),
      skills: [
        { name: "Java", icon: "java" },
        { name: "Node.js", icon: "nodejs" },
        { name: "Python", icon: "python" },
        { name: "Go", icon: "go" },
        { name: "Spring Boot", icon: "spring" },
        { name: "Express.js", icon: "express" },
      ],
    },
    {
      title: t("skills.devops"),
      skills: [
        { name: "Docker", icon: "docker" },
        { name: "Kubernetes", icon: "kubernetes" },
        { name: "AWS", icon: "aws" },
        { name: "Azure", icon: "azure" },
        { name: "Terraform", icon: "terraform" },
        { name: "Jenkins", icon: "jenkins" },
      ],
    },
    {
      title: t("skills.databases"),
      skills: [
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Redis", icon: "redis" },
        { name: "MySQL", icon: "mysql" },
        { name: "Elasticsearch", icon: "elasticsearch" },
        { name: "Cassandra", icon: "cassandra" },
      ],
    },
    {
      title: t("skills.tools"),
      skills: [
        { name: "Git", icon: "git" },
        { name: "Linux", icon: "linux" },
        { name: "Prometheus", icon: "prometheus" },
        { name: "Grafana", icon: "grafana" },
        { name: "Ansible", icon: "ansible" },
        { name: "Bash", icon: "bash" },
      ],
    },
  ]

  // This is a placeholder function to render icons
  // In a real implementation, you would import actual icons
  const renderIcon = (iconName: string) => {
    return (
      <div className="skill-icon">
        <span className="text-lg font-medium">{iconName.charAt(0).toUpperCase()}</span>
      </div>
    )
  }

  return (
    <section id="skills" ref={ref} className="bg-muted py-16 md:py-24">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">{t("skills.title")}</h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={cn(
                "rounded-lg bg-background p-6 shadow-sm transition-all duration-700",
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                `delay-[${categoryIndex * 200}ms]`,
              )}
            >
              <h3 className="mb-4 text-xl font-semibold">{category.title}</h3>
              <div className="grid grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex flex-col items-center space-y-2">
                    {renderIcon(skill.icon)}
                    <span className="text-center text-sm">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

