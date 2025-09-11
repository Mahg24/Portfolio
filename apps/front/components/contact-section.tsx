"use client";

import type React from "react";

import { useLanguage } from "@/components/language-provider";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";

export default function ContactSection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    formData,
    isSubmitting,
    submitSuccess,
    submitError,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <section id="contact" ref={ref} className="container py-16 md:py-24">
      <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
        {t("contact.title")}
      </h2>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div
          className={cn(
            "space-y-6 transition-all duration-700",
            inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          )}
        >
          <h3 className="text-2xl font-bold">{t("contact.intro")}</h3>
          <p className="text-muted-foreground">{t("contact.text")}</p>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                work@mahg.dev
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">{t("contact.phone")}</p>
                <p className="text-sm text-muted-foreground">
                  +57 3013556613
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "transition-all duration-700",
            inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          )}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("contact.name")}
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("contact.email")}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("contact.message")}
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    {t("contact.send")}
                  </span>
                )}
              </Button>
            </div>

            {submitSuccess && (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/50 dark:text-green-300">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  ¡Mensaje enviado exitosamente! Te contactaré pronto.
                </div>
              </div>
            )}

            {submitError && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/50 dark:text-red-300">
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  {submitError}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
