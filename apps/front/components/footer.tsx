"use client";

import { useLanguage } from "@/components/language-provider";
import Link from "next/link";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-8">
      <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>
          &copy; {currentYear} Miguel Holguin. {t("footer.rights")}.
        </p>
      </div>
    </footer>
  );
}
