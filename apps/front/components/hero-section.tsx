"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download } from "lucide-react";
import Image from "next/image";
import md5 from "blueimp-md5";
const email = process.env.NEXT_PUBLIC_USER_EMAIL || "";

const emailHash = md5(email.trim().toLowerCase());
const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=320&d=identicon`;

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="container flex flex-col-reverse items-center justify-between gap-8 py-16 md:flex-row md:py-24"
    >
      <div className="flex flex-col space-y-6 text-center md:w-1/2 md:text-left">
        <div className="space-y-2">
          <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Miguel Holguin
          </h1>
          <p className="animate-fade-in animate-delay-100 text-xl font-medium text-muted-foreground sm:text-2xl">
            {t("hero.title")}
          </p>
          <p className="animate-fade-in animate-delay-200 text-muted-foreground">
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="animate-fade-in animate-delay-300 flex justify-center space-x-4 md:justify-start">
          <Button size="lg">
            <Download className="mr-2 h-4 w-4" />
            {t("hero.cta")}
          </Button>
          <Link href="#contact" key={t("nav.contact")}>
            <Button variant="outline" size="lg">
              {t("hero.ctm")}
            </Button>
          </Link>
        </div>

        <div className="animate-fade-in animate-delay-400 flex justify-center space-x-4 md:justify-start">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-secondary p-2 transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-secondary p-2 transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-secondary p-2 transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="animate-fade-in animate-delay-200 md:w-1/2">
        <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full border-4 border-primary md:h-80 md:w-80">
          <Image
            src={gravatarUrl}
            alt="Miguel Holguin"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
