import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "./settings";

export async function getTranslation(lang: string, ns: string) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lang, ns));

  return {
    t: i18nInstance.getFixedT(lang, ns),
    i18n: i18nInstance
  };
}