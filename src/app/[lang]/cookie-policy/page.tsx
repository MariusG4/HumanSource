import { Metadata } from "next";
import { getTranslation } from "@/app/i18n";
import ClientCookiePolicyPage from "./ClientCookiePolicyPage";

type Props = {
	params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { t } = await getTranslation(params.lang, "cookies-policy");

	return {
		title: t("metaTitle"),
		description: t("metaDescription"),
	};
}

export default async function Page({ params }: Props) {
	return <ClientCookiePolicyPage params={params} />;
}