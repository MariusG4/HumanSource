"use client";

import { useMultistepForm } from "@/components/Formular/useMultistepForm";
import { useState } from "react";
import Pas1Trasport from "@/components/Formular/sofer/pasi/1";
import Pas2Trasport from "@/components/Formular/sofer/pasi/2";
import Pas3Trasport from "@/components/Formular/sofer/pasi/3";
import Pas4Trasport from "@/components/Formular/sofer/pasi/4";
import Pas5Trasport from "@/components/Formular/sofer/pasi/5";
import Pas6Trasport from "@/components/Formular/sofer/pasi/6";
import Pas7Trasport from "@/components/Formular/sofer/pasi/7";
import Pas8Trasport from "@/components/Formular/sofer/pasi/8";
import Pas9Trasport from "@/components/Formular/sofer/pasi/9";

import { SubmitHandler, useForm } from "react-hook-form";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Link from "next/link";

import { useMutation } from "@apollo/client";
import NavigatieFormularSofer from "@/components/Formular/NavigatieFormularSofer";
import AddTransportForm from "@/lib/apollo/mutations/mutateTransportForm";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { useTranslation } from "@/app/i18n/client";

export type TransportSearchParamsType = {
	absolvire: string;
	amg: string;
	bac: string;
	cursItaliana: string;
	domeniu: string;
	experienta: string;
	experientaLimba: string;
	locatia: string;
	subDomeniu: string;
	ultimuSalar: string;
};
type Inputs = {
	tipRemorca: string;
	vechime: string;
	regim: string;
	tahograf: string;
	echipaj: string;
	turaNoapte: string;
	lbItaliana: string;
	ultimulSalariu: string;
	salariuDorit: string;
	category: string;
};

const FormularSofer = ({ params }: { params: { lang: string; country: string } }) => {
	const cookies = useCookies();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { isSubmitSuccessful },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			tipRemorca: cookies.get("sofer-tip-remorca") || "",
			vechime: cookies.get("sofer-experienta") || "",
			regim: cookies.get("sofer-regim") || "",
			tahograf: cookies.get("sofer-tahograf") || "",
			echipaj: cookies.get("sofer-echipaj") || "",
			turaNoapte: cookies.get("sofer-noapte") || "",
			lbItaliana: cookies.get("sofer-italiana") || "",
			ultimulSalariu: cookies.get("sofer-ultimul-salariu") || "",
			salariuDorit: cookies.get("sofer-salariu-dorit") || "",
			category: "transport",
		},
	});
	const [disabled, setDisabled] = useState(true);

	const { steps, currentStepIndex, isFirstStep, isLastStep, step, back, next } = useMultistepForm(
		[
			<Pas1Trasport setValue={setValue} setDisabled={setDisabled} />,
			<Pas2Trasport register={register} setDisabled={setDisabled} />,
			<Pas3Trasport setValue={setValue} setDisabled={setDisabled} />,
			<Pas4Trasport setValue={setValue} setDisabled={setDisabled} />,
			<Pas5Trasport setValue={setValue} setDisabled={setDisabled} />,
			<Pas6Trasport setValue={setValue} setDisabled={setDisabled} />,
			<Pas7Trasport setValue={setValue} setDisabled={setDisabled} />,
			<Pas8Trasport register={register} setDisabled={setDisabled} />,
			<Pas9Trasport register={register} setDisabled={setDisabled} />,
		],
		setDisabled,
	);
	const router = useRouter();
	const [addTransportForm] = useMutation(AddTransportForm);
	const onSubmit: SubmitHandler<Inputs> = ({
		tipRemorca,
		vechime,
		regim,
		tahograf,
		echipaj,
		turaNoapte,
		lbItaliana,
		salariuDorit,
		ultimulSalariu,
		category,
	}) => {
		try {
			addTransportForm({
				variables: {
					data: {
						domeniu: category,
						echipa: echipaj,
						experienta: vechime,
						experientaLimba: lbItaliana,
						locatia: regim,
						salariuDorit: salariuDorit,
						subDomeniu: tipRemorca,
						tahograf: tahograf,
						turaNoapte: turaNoapte,
						ultimuSalar: ultimulSalariu,
					},
				},
			});
			isSubmitSuccessful &&
				router.push(`/${params.lang}/jobs?domeniu=transport&subDomeniu=${tipRemorca}&locatia=${regim}`);
			cookies.remove("sofer-tip-remorca");
			cookies.remove("sofer-experienta");
			cookies.remove("sofer-regim");
			cookies.remove("sofer-tahograf");
			cookies.remove("sofer-echipaj");
			cookies.remove("sofer-noapte");
			cookies.remove("sofer-italiana");
			cookies.remove("sofer-ultimul-salariu");
			cookies.remove("sofer-salariu-dorit");
		} catch (error) {
			console.log(error);
		}
	};
	const { t } = useTranslation(params.lang, "formularMuncitor");
	return (
		<div className="flex flex-col px-5 pb-9 md:px-[70px] ">
			<Breadcrumbs>
				<Link className="text-gri-brand hover:text-rosu-brand" href={`/${params.lang}/`}>
					{/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment 
              	// @ts-ignore */}
					{t("breadHome")}
				</Link>
				<Link className="text-gri-brand hover:text-rosu-brand" href={`/${params.lang}/form/worker`}>
					{t("breadFormular")}
				</Link>
				<Link className="text-rosu-brand" href={`/${params.lang}/form/worker`}>
					{t("breadTransport")}
				</Link>
			</Breadcrumbs>
			<form className="relative  rounded-2xl bg-alb-site px-5 pt-8 " onSubmit={handleSubmit(onSubmit)}>
				{step}

				<NavigatieFormularSofer
					disabled={disabled}
					back={back}
					next={next}
					isFirstStep={isFirstStep}
					isLastStep={isLastStep}
					currentStepIndex={currentStepIndex}
					steps={steps}
				/>
			</form>
		</div>
	);
};

export default FormularSofer;
