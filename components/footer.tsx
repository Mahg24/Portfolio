"use client"

import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background py-8">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">
              Backend Developer & DevOps Engineer specializing in building scalable systems and optimizing deployment
              workflows.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="#home" className="hover:text-primary">
                Home
              </Link>
              <Link href="#about" className="hover:text-primary">
                About
              </Link>
              <Link href="#skills" className="hover:text-primary">
                Skills
              </Link>
              <Link href="#projects" className="hover:text-primary">
                Projects
              </Link>
              <Link href="#blog" className="hover:text-primary">
                Blog
              </Link>
              <Link href="#contact" className="hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Connect</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Twitter
              </a>
              <a href="mailto:john.doe@example.com" className="hover:text-primary">
                Email
              </a>
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary">
                Cookie Policy
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} John Doe. {t("footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  )
}

