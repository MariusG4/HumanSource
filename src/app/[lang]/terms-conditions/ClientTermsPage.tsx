"use client";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { useTranslation } from "@/app/i18n/client";
import CheckIfDefaulthLang from "@/utils/isDefaultLang";

const ClientTermsPage = ({ params }: { params: { lang: string } }) => {
  const { t } = useTranslation(params.lang, "terms");

  return (
    <div className="container mx-auto flex flex-col">
      <Breadcrumbs>
        <Link className="text-gri-brand hover:text-rosu-brand" href={CheckIfDefaulthLang(params, "/")}>
          {t("breadHome")}
        </Link>
        <Link className="text-rosu-brand" href={CheckIfDefaulthLang(params, "/terms-conditions")}>
          {t("breadCurrent")}
        </Link>
      </Breadcrumbs>
      
      <div className="py-8">
        <Typography variant="h3" className="mb-6 font-bold text-rosu-brand">
          {t("title")}
        </Typography>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <Typography variant="h4" className="mb-4 font-semibold">
              {t("section1.title")}
            </Typography>
            <p className="mb-4">{t("section1.content")}</p>
          </section>
          
          <section className="mb-8">
            <Typography variant="h4" className="mb-4 font-semibold">
              {t("section2.title")}
            </Typography>
            <p className="mb-4">{t("section2.content")}</p>
          </section>
          
          <section className="mb-8">
            <Typography variant="h4" className="mb-4 font-semibold">
              {t("section3.title")}
            </Typography>
            <p className="mb-4">{t("section3.content")}</p>
          </section>
          
          <section className="mb-8">
            <Typography variant="h4" className="mb-4 font-semibold">
              {t("section4.title")}
            </Typography>
            <p className="mb-4">{t("section4.content")}</p>
          </section>
          
          <section className="mb-8">
            <Typography variant="h4" className="mb-4 font-semibold">
              {t("section5.title")}
            </Typography>
            <p className="mb-4">{t("section5.content")}</p>
          </section>
          
          <section className="mb-8">
            <Typography variant="h4" className="mb-4 font-semibold">
              {t("section6.title")}
            </Typography>
            <p className="mb-4">{t("section6.content")}</p>
          </section>
          
          <section className="mb-8">
            <Typography variant="h4" className="mb-4 font-semibold">
              {t("section7.title")}
            </Typography>
            <p className="mb-4">{t("section7.content")}</p>
          </section>
          
          <section className="mb-8">
            <Typography variant="h4" className="mb-4 font-semibold">
              {t("lastUpdate.title")}
            </Typography>
            <p>{t("lastUpdate.content")}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClientTermsPage;