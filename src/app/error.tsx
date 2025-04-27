"use client";

import { ServerCrash } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function Error({
  params,
  error,
  reset,
}: {
  params: { locale: string };
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState<string | null>(null);
  const t = useTranslations("error");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const localeValue = resolvedParams.locale;
      setLocale(localeValue);
      setRequestLocale(localeValue);
    };
    resolveParams();
  }, [params]);
  
  // Wait for locale to be resolved before rendering with translations
  if (!locale) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-red-100">
        <ServerCrash className="w-10 h-10 text-red-600" />
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-8 text-lg text-gray-600">{t("sorry")}</p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={() => reset()} variant="default">
          {t("tryAgain")}
        </Button>
        <Link href="/">
          <Button variant="outline">{t("returnHome")}</Button>
        </Link>
      </div>
    </div>
  );
}
