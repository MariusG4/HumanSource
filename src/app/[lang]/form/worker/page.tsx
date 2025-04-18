"use client";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { useState } from "react";

import { Typography } from "@material-tailwind/react";

import Link from "next/link";

import IcoTransport from "../../../../../public/imagini/formular/selectDomeniu/negru/transport.svg";
import IcoTransportAlb from "../../../../../public/imagini/formular/selectDomeniu/alb/transport.svg";
import IcoMedical from "../../../../../public/imagini/formular/selectDomeniu/negru/medical.svg";
import IcoMedicalAlb from "../../../../../public/imagini/formular/selectDomeniu/alb/medical.svg";

import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import CheckIfDefaulthLang from "@/utils/isDefaultLang";

const Formular = ({ params }: { params: { lang: string; country: string } }) => {
	const [disabled, setDisabled] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("");
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const eventul = e.currentTarget.childNodes[1].textContent?.toString();
		setDisabled(false);
		eventul && setSelectedCategory(eventul);
	};
	const router = useRouter();
	const clasaCard =
		"flex max-w-[272px] flex-col items-center gap-2 justify-center rounded-2xl bg-alb-site px-2 py-8 w-1/2  md:p-16 shadow-2xl";
	const clasaIconite = "h-9 w-8 md:h-36 md:w-28";
	const { t } = useTranslation(params.lang, "formularMuncitor");
	return (
		<div className="container mx-auto flex flex-col px-5 pb-9 lg:px-0">
			<Breadcrumbs>
				<Link className="text-gri-brand hover:text-rosu-brand" href={CheckIfDefaulthLang(params, "/")}>
					{/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
              	// @ts-ignore */}
					{t("breadHome")}
				</Link>
				<Link className="text-rosu-brand" href={CheckIfDefaulthLang(params, "/form/worker")}>
					{t("breadFormular")}
				</Link>
			</Breadcrumbs>
			<div
				className="flex flex-col   gap-9 rounded-2xl bg-alb-site px-3 py-9 text-start md:px-16"
				id="container-alege-domeniu-titlu"
			>
				<Typography className="text-start text-xl font-bold md:text-3xl" variant="h3">
					In ce domeniu vrei sa lucrezi?
				</Typography>
				<div className="flex w-full items-center justify-center gap-3 md:gap-8" id="container-carduri-alege-domeniu">
					<button
						onClick={handleClick}
						className={` ${selectedCategory === "Transport" && "bg-gri-brand"} ${clasaCard}  `}
					>
						{selectedCategory === "Transport" ? (
							<IcoTransportAlb className={clasaIconite} />
						) : (
							<IcoTransport className={clasaIconite} />
						)}

						<span className={` ${selectedCategory === "Transport" && "text-alb-site"} text-sm md:text-2xl `}>
							Transport
						</span>
					</button>
					<button onClick={handleClick} className={` ${selectedCategory === "Medical" && "bg-gri-brand"} ${clasaCard}`}>
						{selectedCategory === "Medical" ? (
							<IcoMedicalAlb className={clasaIconite} />
						) : (
							<IcoMedical className={clasaIconite} />
						)}
						<span className={` ${selectedCategory === "Medical" && "text-alb-site"} text-sm md:text-2xl `}>
							Medical
						</span>
					</button>
				</div>
				<div className="flex w-full items-center justify-center">
					<button
						onClick={() => router.push(CheckIfDefaulthLang(params, `/form/worker/${selectedCategory.toLowerCase()}`))}
						disabled={disabled}
						className={`md:px-5"  flex w-fit items-center justify-center gap-1 rounded-2xl border border-gri-brand px-2 py-2 text-center text-gri-brand md:py-4  ${
							disabled
								? "cursor-not-allowed   text-gri-brand opacity-10"
								: "bg-alb-site hover:bg-gri-brand hover:text-alb-site"
						} `}
					>
						<span className={`  ${disabled ? "text-[#1d2328]" : ""} `}>CONTINUA</span>{" "}
						<ArrowSmallRightIcon strokeWidth={2} className={`h-5 w-5  ${disabled ? " text-gri-bg " : ""} `} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Formular;
