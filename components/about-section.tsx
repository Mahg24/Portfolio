"use client"

import { useLanguage } from "@/components/language-provider"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export default function AboutSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const timelineItems = [
    {
      year: "2022 - Present",
      title: "Senior DevOps Engineer",
      company: "Tech Innovations Inc.",
      description: "Leading infrastructure automation and CI/CD pipeline optimization for cloud-native applications.",
    },
    {
      year: "2019 - 2022",
      title: "Backend Developer",
      company: "Digital Solutions Ltd.",
      description: "Developed scalable microservices and RESTful APIs using Node.js and Java Spring Boot.",
    },
    {
      year: "2017 - 2019",
      title: "Cloud Infrastructure Engineer",
      company: "Cloud Systems Co.",
      description: "Managed AWS infrastructure and implemented containerization strategies with Docker and Kubernetes.",
    },
    {
      year: "2015 - 2017",
      title: "Software Engineer",
      company: "StartUp Ventures",
      description: "Full-stack development with focus on backend systems and database optimization.",
    },
  ]

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
              With over 8 years of experience in the industry, I've worked on various projects ranging from high-traffic
              e-commerce platforms to complex data processing systems. I'm passionate about creating efficient, scalable
              solutions and automating development workflows.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you can find me contributing to open-source projects, writing technical articles, or
              exploring the latest technologies in the cloud-native ecosystem.
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

