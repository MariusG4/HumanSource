import { Metadata } from "next";
import { getTranslation } from "@/app/i18n";
import ClientTermsPage from "./ClientTermsPage";

export async function generateMetadata({ params }: { params: { lang: string } }) {
  const { t } = await getTranslation(params.lang, "terms");
  
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  } as Metadata;
}

export default async function Page({ params }: { params: { lang: string } }) {
  return <ClientTermsPage params={params} />;
}