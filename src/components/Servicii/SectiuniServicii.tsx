"use client";

import { useTranslation } from "@/app/i18n/client";
import ServiciiCover from "../../../public/imagini/servicii/hero-servicii.png";
import ImgSec1 from "../../../public/imagini/servicii/img-sec-1.png";
import ImgSec2 from "../../../public/imagini/servicii/img-sec-2.png";
import ImgSec3 from "../../../public/imagini/servicii/img-sec-3.png";
import { Typography } from "@material-tailwind/react";
import AttachEmailOutlinedIcon from "@mui/icons-material/AttachEmailOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = { children: JSX.Element | JSX.Element[]; text: string };

const CardHeroServicii = ({ children, text }: Props) => {
	return (
		<div className="flex items-center justify-center gap-4  rounded-2xl border bg-alb-site py-4 px-4 text-center text-gri-brand ">
			<div className="flex items-center justify-center">{children}</div>
			<span className="text-sm">{text}</span>
		</div>
	);
};
const ButonSolicitaOferta = ({ params }: { params: { lang: string } }) => {
	const router = useRouter();
	const { t } = useTranslation(params.lang, "services");
	return (
		<button
			onClick={() => router.push(`/${params.lang}/form/employer`)}
			className="flex items-center gap-4 rounded-2xl border border-gri-bg py-4 px-5  font-bold text-gri-brand hover:bg-gri-brand hover:text-alb-site "
		>
			<span className="text-sm">{t("buton")}</span>
		</button>
	);
};

const SectiuniServicii = ({ params }: { params: { lang: string } }) => {
	const { t } = useTranslation(params.lang, "services");
	return (
		<div className="flex flex-col gap-12 md:gap-32" id="sections-container">
			<section className="flex w-full flex-col-reverse items-center gap-8 md:flex-row" id="hero-servicii">
				<div className="flex h-full flex-col items-start gap-12 md:w-1/2" id="container-text-servicii">
					<Typography variant="h3">{t("hero.titlu")}</Typography>
					
					<Typography className="text-gri-brand" variant="h5">
						{t("hero.subtitlu")}
					</Typography>
					<div>
					<Typography variant="h6">{t("hero.descriere")}</Typography>
					<ul>
						<li>{t("hero.list.1")}</li>
						<li>{t("hero.list.2")}</li>
						<li>{t("hero.list.3")}</li>
						<li>{t("hero.list.4")}</li>
						<li>{t("hero.list.5")}</li>
						<li>{t("hero.list.6")}</li>
						<li>{t("hero.list.7")}</li>

					</ul>
					</div>
					<div className="flex w-full flex-col  justify-between gap-y-5 text-sm lg:flex-row">
						<CardHeroServicii text={t("hero.carduri.1")}>
							<Groups2OutlinedIcon className="text-[15px]" />
						</CardHeroServicii>
						<CardHeroServicii text={t("hero.carduri.2")}>
							<AttachEmailOutlinedIcon className="text-[15px]" />
						</CardHeroServicii>
						<CardHeroServicii text={t("hero.carduri.3")}>
							<GroupAddOutlinedIcon className="text-[15px]" />
						</CardHeroServicii>
					</div>
				</div>
				<div className="flex w-full items-center justify-center md:w-1/2" id="container-imagine">
					<Image alt="cover-servicii" placeholder="blur" src={ServiciiCover} />{" "}
				</div>
			</section>
			<div className="h-[1px] w-full " id="sectiune-servicii-1"></div>

			<section className="flex w-full flex-col items-center gap-8 md:flex-row">
				<div className="flex w-full items-center justify-center md:w-1/2" id="container-imagine">
					{" "}
					<Image alt="cover-servicii" placeholder="blur" src={ImgSec1} />{" "}
				</div>
				<div className="flex h-full flex-col items-start gap-12 md:w-1/2">
					<Typography variant="h3">{t("asiguram.titlu")}</Typography>
					
					<Typography variant="paragraph">{t("asiguram.descriere")}</Typography>
					<div>
					<Typography variant="paragraph">{t("asiguram.descriere2")}</Typography>
					<ul>
						<li>{t("asiguram.contract_1")}</li>
						<li>{t("asiguram.contract_2")}</li>
					</ul>
					</div>
					<ButonSolicitaOferta params={params} />
				</div>
			</section>
			<div className="h-[1px] w-full" id="sectiune-servicii-2"></div>
			<section className="flex w-full flex-col-reverse items-center gap-8 md:flex-row">
				<div className="flex h-full flex-col items-start gap-12 md:w-1/2">
					<Typography variant="h3">{t("documentatia.titlu")}</Typography>
					<div>
						<Typography variant="paragraph">{t("documentatia.descriere_1")}</Typography>
						<ul>
							<li>{t("documentatia.descriere_list_1.1")}</li>
							<li>{t("documentatia.descriere_list_1.2")}</li>
							<li>{t("documentatia.descriere_list_1.3")}</li>
							<li>{t("documentatia.descriere_list_1.4")}</li>
							<li>{t("documentatia.descriere_list_1.5")}</li>
							<li>{t("documentatia.descriere_list_1.6")}</li>
							<li>{t("documentatia.descriere_list_1.7")}</li>
							<li>{t("documentatia.descriere_list_1.8")}</li>
						</ul>
					</div>
					<div>
						<Typography variant="paragraph">{t("documentatia.descriere_2")}</Typography>
						<ul>
							<li>{t("documentatia.descriere_list_2.1")}</li>
							<li>{t("documentatia.descriere_list_2.2")}</li>
							<li>{t("documentatia.descriere_list_2.3")}</li>
							<li>{t("documentatia.descriere_list_2.4")}</li>
							<li>{t("documentatia.descriere_list_2.5")}</li>
						</ul>
					</div>
					
					<ButonSolicitaOferta params={params} />
				</div>
				<div className="flex items-center justify-center md:w-1/2" id="container-imagine">
					{" "}
					<Image alt="cover-servicii" placeholder="blur" src={ImgSec2} />{" "}
				</div>
			</section>
			<div className="h-[1px] w-full" id="sectiune-servicii-3"></div>
			<section className="flex w-full flex-col items-center gap-8 md:flex-row">
				<div className="flex w-full items-center justify-center md:w-1/2" id="container-imagine">
					{" "}
					<Image alt="cover-servicii" placeholder="blur" src={ImgSec3} />{" "}
				</div>
				<div className="flex h-full flex-col items-start gap-12 md:w-1/2">
					<Typography variant="h3">{t("echipa.titlu")}</Typography>
					<div>
					<Typography variant="paragraph">{t("echipa.descriere")}</Typography>
					<Typography variant="paragraph">{t("echipa.descriere2")}</Typography>
					<Typography variant="paragraph">{t("echipa.descriere3")}</Typography>
					<Typography variant="paragraph">{t("echipa.descriere4")}</Typography>
					</div>
					<ButonSolicitaOferta params={params} />
				</div>
			</section>
		</div>
	);
};
export default SectiuniServicii;
