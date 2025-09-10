"use client";

import { Typography } from "@material-tailwind/react";
import { useTranslation } from "@/app/i18n/client";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Link from "next/link";
import CheckIfDefaulthLang from "@/utils/isDefaultLang";

type Props = {
	params: { lang: string };
};

const ClientCookiePolicyPage = ({ params }: Props) => {
	const { t } = useTranslation(params.lang, "cookies-policy");

	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<div className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
				<Breadcrumbs>
					<Link className="text-gri-brand hover:text-rosu-brand" href={CheckIfDefaulthLang(params, "/")}>
						{t("breadHome")}
					</Link>
					<Link className="text-rosu-brand" href="#">
						{t("breadCurrent")}
					</Link>
				</Breadcrumbs>

				<div className="my-8">
					<Typography variant="h1" className="mb-6 text-3xl font-bold md:text-4xl">
						{t("title")}
					</Typography>

					<Typography className="mb-6 text-base font-normal leading-relaxed text-gray-700">
						{t("introduction")}
					</Typography>

					<div className="mb-8">
						<Typography variant="h2" className="mb-4 text-2xl font-semibold">
							{t("section1.title")}
						</Typography>
						<Typography className="mb-4 text-base font-normal leading-relaxed text-gray-700">
							{t("section1.content")}
						</Typography>
					</div>

					<div className="mb-8">
						<Typography variant="h2" className="mb-4 text-2xl font-semibold">
							{t("section2.title")}
						</Typography>
						<Typography className="mb-4 text-base font-normal leading-relaxed text-gray-700">
							{t("section2.content")}
						</Typography>
					</div>

					<div className="mb-8">
						<Typography variant="h2" className="mb-4 text-2xl font-semibold">
							{t("section3.title")}
						</Typography>
						<Typography className="mb-4 text-base font-normal leading-relaxed text-gray-700">
							{t("section3.content")}
						</Typography>
					</div>

					<div className="mb-8">
						<Typography variant="h2" className="mb-4 text-2xl font-semibold">
							{t("section4.title")}
						</Typography>
						<Typography className="mb-4 text-base font-normal leading-relaxed text-gray-700">
							{t("section4.content")}
						</Typography>
					</div>

					<div className="mb-8">
						<Typography variant="h2" className="mb-4 text-2xl font-semibold">
							{t("section5.title")}
						</Typography>
						<Typography className="mb-4 text-base font-normal leading-relaxed text-gray-700">
							{t("section5.content")}
						</Typography>
					</div>
				</div>
			</div>
		</main>
	);
};

export default ClientCookiePolicyPage;