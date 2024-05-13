import { Input } from "@material-tailwind/react";
import FormWrapper from "../../FormWrapper";
import { MedicalSearchParamsType } from "@/app/[lang]/form/worker/medical/page";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import { FiPhone } from "react-icons/fi";
import { useTranslation } from "@/app/i18n/client";

const Pas10Transport = ({ register, setDisabled, params }: any) => {
	const cookies = useCookies();
	const { t } = useTranslation(params.lang, "job");
	let telefonLabel = t("form.telefon");
	useEffect(() => {
		if (cookies.get("transport-numar-telefon") !== undefined) {
			setDisabled(false);
		}
	}, []);
	return (
		<FormWrapper intrebare="Spunetine numartul de telefon">
			<div className="flex w-full items-center justify-center gap-1 justify-self-start md:w-[300px]">
				<Input
					variant="outlined"
					type="text"
					{...register("nrTelefon", { required: true })}
					id="nrTelefon"
					icon={<FiPhone />}
					label={telefonLabel}
					onChange={setDisabled(false)}
					className="w-full ring-0 focus:border-rosu-brand focus:!border-t-transparent "
					labelProps={{
						className:
							"text-xs peer-focus:text-xs peer-focus:after:!border-rosu-brand peer-focus:!text-rosu-brand  peer-focus:!text-rosu-brand  peer-focus:before:!border-rosu-brand",
					}}
				/>
			</div>
		</FormWrapper>
	);
};

export default Pas10Transport;
