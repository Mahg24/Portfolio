"use client"

import { useLanguage } from "@/components/language-provider"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Icon } from '@iconify/react';
import javaIcon from '@iconify/icons-logos/java';
import nodejsIcon from '@iconify/icons-logos/nodejs-icon';
import pythonIcon from '@iconify/icons-logos/python';
import phpIcon from '@iconify/icons-logos/php';
import dockerIcon from '@iconify/icons-logos/docker-icon';
import awsIcon from '@iconify/icons-logos/aws';
import terraformIcon from '@iconify/icons-logos/terraform-icon';
import jenkinsIcon from '@iconify/icons-logos/jenkins';
import postgresqlIcon from '@iconify/icons-logos/postgresql';
import mongodbIcon from '@iconify/icons-logos/mongodb';
import redisIcon from '@iconify/icons-logos/redis';
import mysqlIcon from '@iconify/icons-logos/mysql';
import gitIcon from '@iconify/icons-logos/git-icon';
import linuxIcon from '@iconify/icons-logos/linux-tux';
import grafanaIcon from '@iconify/icons-logos/grafana';

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
        { name: "PHP", icon: "php" },
      ],
    },
    {
      title: t("skills.devops"),
      skills: [
        { name: "Docker", icon: "docker" },
        { name: "AWS", icon: "aws" },
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
      ],
    },
    {
      title: t("skills.tools"),
      skills: [
        { name: "Git", icon: "git" },
        { name: "Linux", icon: "linux" },
        { name: "Grafana", icon: "grafana" },
        { name: "Bash", icon: "bash" },
      ],
    },
  ]

  const iconMap: Record<string, any> = {
    java: javaIcon,
    nodejs: nodejsIcon,
    python: pythonIcon,
    php: phpIcon,
    docker: dockerIcon,
    aws: awsIcon,
    terraform: terraformIcon,
    jenkins: jenkinsIcon,
    postgresql: postgresqlIcon,
    mongodb: mongodbIcon,
    redis: redisIcon,
    mysql: mysqlIcon,
    git: gitIcon,
    linux: linuxIcon,
    grafana: grafanaIcon,
  }

  const renderIcon = (iconName: string) => {
    return (
      <div className="skill-icon">
        <Icon icon={iconMap[iconName] ?? 'mdi:code-tags'} className="h-8 w-8" />
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

