"use client"

import { useLanguage } from "@/components/language-provider"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogSection() {
  const { t } = useLanguage()
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const blogPosts = [
    {
      title: "Implementing Zero-Downtime Deployments with Kubernetes",
      excerpt:
        "Learn how to implement rolling updates and blue-green deployments in Kubernetes to achieve zero-downtime releases.",
      image: "/placeholder.svg?height=300&width=600",
      date: "March 15, 2023",
      readTime: "8 min read",
      slug: "zero-downtime-deployments",
    },
    {
      title: "Optimizing CI/CD Pipelines for Faster Builds",
      excerpt:
        "Strategies and best practices to reduce build times and optimize your CI/CD pipelines for better developer experience.",
      image: "/placeholder.svg?height=300&width=600",
      date: "February 22, 2023",
      readTime: "6 min read",
      slug: "optimizing-cicd-pipelines",
    },
    {
      title: "Securing Microservices with Service Mesh",
      excerpt:
        "An in-depth guide to implementing security patterns in microservices architecture using service mesh technologies.",
      image: "/placeholder.svg?height=300&width=600",
      date: "January 10, 2023",
      readTime: "10 min read",
      slug: "securing-microservices",
    },
  ]

  return (
    <section id="blog" ref={ref} className="bg-muted py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold md:text-4xl">{t("blog.title")}</h2>
          <Button variant="outline" asChild>
            <Link href="/blog">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className={cn(
                "group overflow-hidden rounded-lg bg-background shadow-sm transition-all duration-700",
                inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                `delay-[${index * 200}ms]`,
              )}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold group-hover:text-primary">{post.title}</h3>
                <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                <Button variant="link" className="p-0" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    {t("blog.readMore")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

