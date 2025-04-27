"use client";
import { useTranslations } from "next-intl";
import { Globe } from "lucide-react";

export default function HomeIndex() {
  const t = useTranslations("Index");
  
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-20">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Globe className="h-8 w-8 m-2 text-primary" />
                  <span className="font-bold text-2xl">{t("boilerplateName")}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t("title")}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {t("description")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-between">
        {/* footer content */}
      </footer>
    </div>
  );
}
