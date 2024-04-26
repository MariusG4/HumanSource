"use client";
import FormWrapper from "../../FormWrapper";
import experienta from "./data";
import { useEffect } from "react";
import { useCookies } from "next-client-cookies";
const Checkbox = ({
	varianta,
	value,
	register,
	setDisabled,
}: {
	varianta: string;
	value: string;
	register: any;
	setDisabled: any;
}) => {
	const cookies = useCookies();
	useEffect(() => {
		if (cookies.get("sofer-experienta") !== undefined) {
			setDisabled(false);
		}
	}, []);

	return (
		<div className="mb-4 flex items-center">
			<label className="flex items-center">
				<input
					id="vechime"
					type="radio"
					value={value}
					{...register("vechime", { required: true })}
					name="vechime"
					onChange={(e) => {
						cookies.set("sofer-experienta", e.target.value, { secure: true, sameSite: "None" });
						console.log(e.target.value);
						setDisabled(false);
					}}
					className=" mx-4  h-4 w-4 rounded-full checked:bg-rosu-brand  focus:bg-rosu-brand focus:ring-rosu-brand "
				/>

				<span className="text-sm font-medium text-gray-900 dark:text-gray-300"> {varianta} </span>
			</label>
		</div>
	);
};

const Pas2Trasport = ({ register, setDisabled }: any) => {
	useEffect(() => {
		const isBrowser = () => typeof window !== "undefined";

		function scrollToTop() {
			if (!isBrowser()) return;

			window.scrollTo({ top: 0, behavior: "smooth" });
		}
		scrollToTop();
	}, []);
	return (
		<FormWrapper intrebare="Ai mai lucrat ca sofer profesionist C+E?">
			<div className="flex w-full flex-col items-start gap-5">
				{experienta.map((varianta, index) => (
					<Checkbox setDisabled={setDisabled} key={index} register={register} value={varianta} varianta={varianta} />
				))}
			</div>
		</FormWrapper>
	);
};

export default Pas2Trasport;
